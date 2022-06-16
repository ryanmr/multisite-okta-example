import { OktaAuth } from "@okta/okta-auth-js";

/**
 * This is app1's client id.
 */
const oktaAuth = new OktaAuth({
  issuer: "https://dev-18521441.okta.com/oauth2/default",
  clientId: "0oa5e3mf2aNp6JAZc5d7",
  redirectUri: "http://localhost:3401/app1/login/callback",
  pkce: true,
  tokenManager: {
    storageKey: "app1",
  },
});

// const options = { ...oktaAuth.options };

// const proxy = new Proxy(options, {
//   get(target, prop, receiver) {
//     console.log("prop", prop);
//     console.log(
//       "value",
//       // @ts-ignore
//       target[prop]
//     );
//     // @ts-ignore
//     return target[prop];
//   },
// });

// oktaAuth.options = proxy;

// trying to supress a particular okta warning by removing the default value
// oktaAuth.options.restoreOriginalUri = async () => {
//   console.log("customer");
// };

export { oktaAuth };
