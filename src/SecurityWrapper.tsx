import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { Security } from "@okta/okta-react";
import { useCallback } from "react";
import { useNavigate, Outlet } from "react-router-dom";

export function SecurityWrapper({ oktaAuth }: { oktaAuth: OktaAuth }) {
  const navigate = useNavigate();
  const restoreOriginalUri = useCallback(
    async (_oktaAuth: any, originalUri: string) => {
      navigate(toRelativeUrl(originalUri || "/", window.location.origin));
    },
    [navigate]
  );

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Outlet />
    </Security>
  );
}
