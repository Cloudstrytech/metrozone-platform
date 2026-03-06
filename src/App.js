import React from "react";
import Main from "./components/main/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EPage from "./components/E_page/Page";
import Footer from "./components/main/Footer";
import ScrollToTop from "./components/Utils/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Events-details/:id" element={<EPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
