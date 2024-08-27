import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PatientsDashBoard from "./pages/PatientsDashBoard";
import DoctorsDashBoard from "./pages/DoctorsDashBoard";
import BasicHealthForm from "./pages/BasicHealthForm";
import UploadBloodReport from "./pages/UploadBloodReport";
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();

  return (
    <>
      <ToastContainer />
      <Header />
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<Auth />} />
          <Route path="/basic-health-info" element={<BasicHealthForm />} />
          <Route path="/upload-blood-report" element={<UploadBloodReport />} />
          <Route path="/patientsdashboard" element={<PatientsDashBoard />} />
          <Route path="/doctorsdashboard" element={<DoctorsDashBoard />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
