import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, StreamPage, StudioPage } from "./pages";
import ProtectedRoute from "./ProtectedRoute";
import GetPage from "./GetPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<ProtectedRoute />}>
          <Route exact path="/" element={<GetPage Page={HomePage} />} />
        </Route>
        <Route exact path="/stream" element={<ProtectedRoute />}>
          <Route exact path="/stream" element={<GetPage Page={StreamPage} />} />
        </Route>
        <Route exact path="/:streamCode" element={<ProtectedRoute />}>
          <Route
            exact
            path="/:streamCode"
            element={<GetPage Page={StudioPage} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
