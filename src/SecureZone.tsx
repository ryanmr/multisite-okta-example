/**
 * Based on the example from https://github.com/okta/okta-react/blob/master/samples/routing/react-router-dom-v6/src/components/SecureRoute.tsx#L19.
 *
 * NOTE:
 *
 * This is customized because it would refresh the tokens on every run, regardless of whether or not
 * authenticated state was available.
 *
 */

import { toRelativeUrl } from "@okta/okta-auth-js";
import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export const SecureZone: React.FC = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function handle() {
      if (ready) {
        return;
      }

      if (!authState) {
        return;
      }

      if (authState.isAuthenticated) {
        setReady(true);
        return;
      }

      console.log("🟠 not authenticated, signing in with redirect");
      const originalUri = toRelativeUrl(
        window.location.href,
        window.location.origin
      );
      oktaAuth.setOriginalUri(originalUri);
      oktaAuth.signInWithRedirect();
    }

    handle();
  }, [oktaAuth, authState, ready]);

  if (ready) {
    return <Outlet />;
  }

  return <p>Loading...</p>;
};
