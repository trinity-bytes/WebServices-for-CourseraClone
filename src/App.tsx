import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";
import { VerifyPage } from "@/pages/VerifyPage";
import { ErrorPage } from "@/components/ErrorPage";

function App() {
  return (
    <Router basename="/WebServices-for-CourseraClone">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/verify/data" element={<VerifyPage />} />
        <Route path="/v" element={<VerifyPage />} />
        <Route
          path="*"
          element={<ErrorPage message="Página no encontrada" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
