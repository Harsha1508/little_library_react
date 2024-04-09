import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Browse from "./components/Browse/Browse";
import BookDetails from "./components/BookDetails/BookDetails";
import Login from "./components/Login/Login";
import Account from "./components/Account/Account";

function App() {
  const isLoggedIn = !!sessionStorage.getItem("token");

  return (
    <BrowserRouter>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Browse" element={<Browse />} />
        <Route path="/book-details/:bookId" element={<BookDetails />} />
        <Route path="/Account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
