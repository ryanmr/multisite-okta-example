# multisite okta example

Suppose you have a webapp that's either an SPA or a composed MPA, and for strange reasons you have multiple Okta (or any oauth2/oidc provider) Client IDs for various subpaths.

Hypothetically, like this:

* `/app1/` uses Client ID 🦋
* `/app2/` uses Client ID 🦌

A naive client side implementation of a token manager might assume that a domain might only ever have a single Client's worth of information.

[`okta-auth-js`](https://github.com/okta/okta-auth-js) provides the naive solution for out of the box functionality, but it has additional settings that are easy to set such that you can easily operate multiple Client IDs on the same site - the same domain!

In fact, [the `storageKey`](https://github.com/okta/okta-auth-js#storagekey) helps acheieve this, effectively namespacing the tokens into different places in local storage (or whatever internal storage driver).

```js
tokenManager: {
    storageKey: "app1",
},
```

In our example, we have two okta config files, `okta_app1.ts` and `okta_app2.ts` that represent our two Client IDs 🦋 and 🦌 and their related routes.

With this setup, and because Okta is a single sign on provider, when you try to hit `/app1/dashboard`, you will be prompted initially for credentials. Then you'll get your redirect back to the app. If you swap over to `/app2/dashboard`, you will be briefly taken to the Okta domain, but the single sign on session remembers you, so it happens in a flash. Then you'll get your redirect back to the app again. With this setup, its almost seamless hopping between apps.

## React Router V6

Ok, what about React Router V6?

For various reasons, the [okta react](https://github.com/okta/okta-react/issues?q=react+router+v6+) package has not upgraded their package [to handle React Router V6 directly](https://remix.run/blog/react-router-v6). On one hand, nobody blames them, it's tough keeping up in the React ecosystem sometimes. Yet six months later, there's no consistent first party option provided as part of the package.

However, the Okta team did [provide a V6 sample](https://github.com/okta/okta-react/tree/master/samples/routing/react-router-dom-v6)! The sample is standard fare but the [key component is `RequiredAuth` in the `SecureRoute.tsx` file](https://github.com/okta/okta-react/blob/master/samples/routing/react-router-dom-v6/src/components/SecureRoute.tsx). Very [simplified business logic compared](https://github.com/okta/okta-react/blob/master/src/SecureRoute.tsx) to the original packaged `SecureRoute`.

The given code had some initialization timing issues (Strict Mode double renders related, perhaps), so there needed to be some additional _strictness_ on when to leave the loading state, and when to show the V6 `<Outlet />`. I named the new component `<SecureZone />`. It's not an extension or composition of `<Route />` nor `<SecureRoute />`, and it uses the new `<Outlet />` system from V6, so the name made more sense. It really _waits_ until Okta has loaded and can confirm whether or not the user is logged in or not. 

**TL;DR**

Don't use `<SecureRoute />`. Use the new `<SecureZone />`.

## Tech

* vite
* okta auth js
* okta react
* react router v6

## Trying it

```
yarn

yarn dev
```

I used my Okta Client IDs. For your own testing, feel free to make two Client IDs with PKCE flow.