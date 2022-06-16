import { Link } from "react-router-dom";
import { oktaAuth as oktaApp1 } from "./okta_app1";
import { oktaAuth as oktaApp2 } from "./okta_app2";
import { ErrorBoundary } from "./ErrorBoundary";

export function Dashboard({ app }: { app: string }) {
  const oktaAuth = app === "app1" ? oktaApp1 : oktaApp2;
  return (
    <>
      <h1 className="text-2xl text-center">Dashboard {app}</h1>

      {app === "app1" && (
        <ul className="flex space-x-4 [&>*]:bg-gray-200 [&>*]:p-2 [&>*]:rounded">
          <li>
            <Link to="/app2/dashboard">🟠 jump to app2 dashboard</Link>
          </li>
          <li>
            <Link to="/">🏡 home</Link>
          </li>
        </ul>
      )}

      {app === "app2" && (
        <ul className="flex space-x-4 [&>*]:bg-gray-200 [&>*]:p-2 [&>*]:rounded">
          <li>
            <Link to="/app1/dashboard">🔵 jump to app1 dashboard</Link>
          </li>
          <li>
            <Link to="/">🏡 home</Link>
          </li>
        </ul>
      )}

      <ErrorBoundary>
        <h2 className="text-xl font-bold">Your Access Token</h2>
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

        <h2 className="text-xl font-bold">Your ID Token</h2>
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
