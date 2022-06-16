import { LoginCallback } from "@okta/okta-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import { Home } from "./Home";
import { oktaAuth as oktaApp1 } from "./okta_app1";
import { oktaAuth as oktaApp2 } from "./okta_app2";
import { SecureZone } from "./SecureZone";
import { SecurityWrapper } from "./SecurityWrapper";

function App() {
  return (
    <div className="container mx-auto px-4">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route
              path="app1"
              element={<SecurityWrapper key="app1" oktaAuth={oktaApp1} />}
            >
              <Route path="login/callback" element={<LoginCallback />} />

              <Route element={<SecureZone />}>
                <Route path="dashboard" element={<Dashboard app="app1" />} />
              </Route>
            </Route>
            <Route
              path="app2"
              element={<SecurityWrapper key="app2" oktaAuth={oktaApp2} />}
            >
              <Route path="login/callback" element={<LoginCallback />} />
              <Route element={<SecureZone />}>
                <Route path="dashboard" element={<Dashboard app="app2" />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
