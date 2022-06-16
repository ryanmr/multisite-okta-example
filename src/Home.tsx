import { Link } from "react-router-dom";
import { oktaAuth as oktaApp1 } from "./okta_app1";
import { oktaAuth as oktaApp2 } from "./okta_app2";

export function Home() {
  return (
    <>
      <h1 className="text-2xl">App List</h1>
      <p>Select the app you would like to go.</p>

      <div className="mb-4"></div>

      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        <Link
          to={"/app1/dashboard"}
          className="bg-slate-300 hover:bg-blue-300 hover:border-blue-400 p-4 rounded text-center"
        >
          Dashboard for App 1
        </Link>

        <button
          onClick={() => oktaApp1.signOut()}
          className="border-slate-300 p-4 border rounded hover:border-red-700"
        >
          Sign out of App 1
        </button>

        <Link
          to={"/app2/dashboard"}
          className="bg-slate-300 hover:bg-orange-300 hover:border-orange-400 p-4 rounded text-center"
        >
          Dashboard for App 2
        </Link>

        <button
          onClick={() => oktaApp2.signOut()}
          className="border-slate-300 p-4 border rounded hover:border-red-700"
        >
          Sign out of App 2
        </button>
      </div>
    </>
  );
}
