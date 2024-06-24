import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Product from "./pages/Product";
import Orderdetails from "./pages/Orderdetails";
import { useEffect } from "react";
import { getCookie } from "./components/Utils/getCookie";
import ContactForm from "./pages/Contact";

function App() {
    const userId = getCookie("userId")
  
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/:/*" element={<HomePage />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/contact-us" element={<ContactForm />} />
          <Route path="/orderdetails" element={<Orderdetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
