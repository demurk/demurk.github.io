import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";

import Layout from "modules/layout";
import Desktop from "modules/desktop";

const defaultPath = "/";

function App() {
  function MissingRoute() {
    return <Navigate to={{ pathname: defaultPath }} />;
  }

  return (
    <Layout>
      <Router>
        <Routes>
          <Route path={defaultPath} element={<Desktop />} />
          <Route path="*" element={<MissingRoute />} />
        </Routes>
      </Router>
    </Layout>
  );
}

export default App;
