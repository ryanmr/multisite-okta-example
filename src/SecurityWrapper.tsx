import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { Security } from "@okta/okta-react";
import { useCallback, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

export function SecurityWrapper({ oktaAuth }: { oktaAuth: OktaAuth }) {
  const [counter, setCounter] = useState(0);
  const navigate = useNavigate();
  const restoreOriginalUri = useCallback(
    async (_oktaAuth: any, originalUri: string) => {
      navigate(toRelativeUrl(originalUri || "/", window.location.origin));
    },
    [counter]
    // []
  );

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <button onClick={() => setCounter((p) => p + 1)}>
        increment {counter}
      </button>
      <Outlet />
    </Security>
  );
}
