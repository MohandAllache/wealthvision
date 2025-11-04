import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./components/LandingPage";
import InvestmentCalculator from "./components/InvestmentCalculator";
import MortgageCalculator from "./components/MortgageCalculator";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/compound" element={<InvestmentCalculator />} />
          <Route path="/mortgage" element={<MortgageCalculator />} />
        </Routes>
      </Layout>
    </Suspense>
  );
}

export default App;