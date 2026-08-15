import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AddTrip } from "./pages/AddTrip";
import { EditTrip } from "./pages/EditTrip";
import { Login } from "./pages/Login";
import { TripListing } from "./pages/TripListing";

export function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<TripListing />} />
          <Route path="/add-trip" element={<AddTrip />} />
          <Route path="/edit-trip/:code" element={<EditTrip />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}
