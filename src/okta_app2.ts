import { OktaAuth } from "@okta/okta-auth-js";

/**
 * This is app2's client id.
 */
const oktaAuth = new OktaAuth({
  issuer: "https://dev-18521441.okta.com/oauth2/default",
  clientId: "0oa5e3oeqy7KieaVm5d7",
  redirectUri: "http://localhost:3401/app2/login/callback",
  pkce: true,
  tokenManager: {
    storageKey: "app2",
  },
});

// trying to supress a particular okta warning by removing the default value
oktaAuth.options.restoreOriginalUri = undefined;

export { oktaAuth };
