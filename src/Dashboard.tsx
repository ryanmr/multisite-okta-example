import { Link } from "react-router-dom";
import { oktaAuth as oktaApp1 } from "./okta_app1";
import { oktaAuth as oktaApp2 } from "./okta_app2";
import { ErrorBoundary } from "./ErrorBoundary";

export function Dashboard({ app }: { app: string }) {
  const oktaAuth = app === "app1" ? oktaApp1 : oktaApp2;
  return (
    <>
      <h1>Dashboard {app}</h1>

      {app === "app1" && (
        <div>
          <Link to="/app2/dashboard">🔃 jump to app2 dashboard</Link> |{" "}
          <Link to="/">home</Link>
        </div>
      )}

      {app === "app2" && (
        <div>
          <Link to="/app1/dashboard">🔃 jump to app1 dashboard</Link> |{" "}
          <Link to="/">home</Link>
        </div>
      )}

      <ErrorBoundary>
        <h2>Your Access Token</h2>
        <code>
          <pre>
            {JSON.stringify(
              oktaApp1.token.decode(oktaAuth.getAccessToken() as string)
                .payload,
              null,
              2
            )}
          </pre>
        </code>

        <h2>Your ID Token</h2>
        <code>
          <pre>
            {JSON.stringify(
              oktaAuth.token.decode(oktaAuth.getIdToken() as string).payload,
              null,
              2
            )}
          </pre>
        </code>
      </ErrorBoundary>
    </>
  );
}
