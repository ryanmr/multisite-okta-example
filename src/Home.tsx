import React from "react";
import { Link } from "react-router-dom";
import { oktaAuth as oktaApp1 } from "./okta_app1";
import { oktaAuth as oktaApp2 } from "./okta_app2";

export function Home() {
  return (
    <>
      <h1>apps</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Link to={"/app1/dashboard"} style={{ padding: "1rem" }}>
          Dashboard for App 1
        </Link>

        <Link to={"/app2/dashboard"} style={{ padding: "1rem" }}>
          Dashboard for App 2
        </Link>
      </div>

      <hr />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <button style={{ padding: "1rem" }} onClick={() => oktaApp1.signOut()}>
          Sign out of App 1
        </button>
        <button style={{ padding: "1rem" }} onClick={() => oktaApp2.signOut()}>
          Sign out of App 2
        </button>
      </div>
    </>
  );
}
