import React, { useState, useEffect } from "react";
import {
  AiOutlineUser,
  AiOutlineCalendar,
  AiOutlineSetting,
} from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const PatientDashboard = () => {
  const [user] = useAuthState(auth);
  const [activeSection, setActiveSection] = useState("profile");
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);

  const userId = user?.uid;

  const [patientAppointments, setPatientAppointments] = useState([
    {
      id: 1,
      date: "2024-09-01",
      time: "10:00 AM",
      doctor: "Dr. John",
      status: "Confirmed",
    },
    {
      id: 2,
      date: "2024-09-05",
      time: "2:00 PM",
      doctor: "Dr. Smith",
      status: "Pending",
    },
  ]);

  const [availableDoctors, setAvailableDoctors] = useState([
    { id: 1, name: "Dr. John" },
    { id: 2, name: "Dr. Smith" },
  ]);

  const [selectedDoctor, setSelectedDoctor] = useState(
    availableDoctors[0].name
  );
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    const newAppointment = {
      id: patientAppointments.length + 1,
      date: appointmentDate,
      time: appointmentTime,
      doctor: selectedDoctor,
      status: "Pending",
    };
    setPatientAppointments([...patientAppointments, newAppointment]);
  };

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const userDoc = doc(db, "users", userId);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          setPatientData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [userId]);

  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  return (
    <div className="relative flex min-h-screen bg-gray-50 font-mainFont">
      <aside className="w-20 md:w-64 bg-gradient-to-b from-blue-700 to-blue-600 text-white shadow-lg flex flex-col items-center md:items-start py-6 px-4 space-y-8">
        <div className="hidden md:block">
          <h2 className="text-3xl font-bold tracking-wide">Dashboard</h2>
        </div>
        <nav className="flex flex-col items-center md:items-start space-y-6 w-full">
          <a
            href="#profile"
            onClick={() => setActiveSection("profile")}
            className={`group flex items-center space-x-2 md:space-x-4 w-full p-3 rounded-lg transition ${
              activeSection === "profile" ? "bg-blue-500" : ""
            } hover:bg-blue-500`}
          >
            <AiOutlineUser className="text-2xl md:text-3xl text-white transition" />
            <span className="hidden md:block text-lg font-semibold">
              Profile
            </span>
          </a>
          <a
            href="#appointments"
            onClick={() => setActiveSection("appointments")}
            className={`group flex items-center space-x-2 md:space-x-4 w-full p-3 rounded-lg transition ${
              activeSection === "appointments" ? "bg-blue-500" : ""
            } hover:bg-blue-500`}
          >
            <AiOutlineCalendar className="text-2xl md:text-3xl text-white transition" />
            <span className="hidden md:block text-lg font-semibold">
              Appointments
            </span>
          </a>
          <a
            href="#ai-assistance"
            onClick={() => setActiveSection("ai-assistance")}
            className={`group flex items-center space-x-2 md:space-x-4 w-full p-3 rounded-lg transition ${
              activeSection === "ai-assistance" ? "bg-blue-500" : ""
            } hover:bg-blue-500`}
          >
            <AiOutlineCalendar className="text-2xl md:text-3xl text-white transition" />
            <span className="hidden md:block text-lg font-semibold">
              AI Assistance
            </span>
          </a>
          <a
            href="#settings"
            onClick={() => setActiveSection("settings")}
            className={`group flex items-center space-x-2 md:space-x-4 w-full p-3 rounded-lg transition ${
              activeSection === "settings" ? "bg-blue-500" : ""
            } hover:bg-blue-500`}
          >
            <AiOutlineSetting className="text-2xl md:text-3xl text-white transition" />
            <span className="hidden md:block text-lg font-semibold">
              Settings
            </span>
          </a>
        </nav>
      </aside>

      <main className="flex-1 p-6 space-y-10">
        {activeSection === "profile" && (
          <section className="bg-white p-8 rounded-2xl shadow-xl">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              Patient Information
            </h3>
            {loading ? (
              <p>Loading...</p>
            ) : patientData ? (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                <div className="flex items-center bg-gray-100 p-6 rounded-xl shadow-md">
                  <img
                    src={
                      patientData.avatar || "https://via.placeholder.com/150"
                    }
                    alt="Avatar"
                    className="w-24 h-24 rounded-full object-cover mr-6"
                  />
                  <div>
                    <p className="text-gray-600 text-md font-medium">Name</p>
                    <p className="text-xl font-bold text-gray-800">
                      {patientData.name}
                    </p>
                  </div>
                </div>
                <div className="bg-gray-100 p-6 rounded-xl shadow-md">
                  <p className="text-gray-600 text-md font-medium">Age</p>
                  <p className="text-xl font-bold text-gray-800">
                    {patientData.age}
                  </p>
                </div>
                <div className="bg-gray-100 p-6 rounded-xl shadow-md">
                  <p className="text-gray-600 text-md font-medium">Gender</p>
                  <p className="text-xl font-bold text-gray-800">
                    {patientData.gender}
                  </p>
                </div>
                <div className="bg-gray-100 p-6 rounded-xl shadow-md">
                  <p className="text-gray-600 text-md font-medium">Weight</p>
                  <p className="text-xl font-bold text-gray-800">
                    {patientData.weight} kg
                  </p>
                </div>
                <div className="bg-gray-100 p-6 rounded-xl shadow-md">
                  <p className="text-gray-600 text-md font-medium">Height</p>
                  <p className="text-xl font-bold text-gray-800">
                    {patientData.height} cm
                  </p>
                </div>
                <div className="bg-gray-100 p-6 rounded-xl shadow-md">
                  <p className="text-gray-600 text-md font-medium">BMI</p>
                  <p className="text-xl font-bold text-gray-800">
                    {calculateBMI(patientData.weight, patientData.height)}
                  </p>
                </div>
                <div className="bg-gray-100 p-6 rounded-xl shadow-md md:col-span-3">
                  <p className="text-gray-600 text-lg font-medium">
                    Medical Conditions
                  </p>
                  <p className="text-xl text-red-700 font-semibold">
                    {patientData.conditions.join(", ")}
                  </p>
                </div>
                <div className="bg-gray-100 p-6 rounded-xl shadow-md md:col-span-3">
                  <p className="text-gray-600 text-lg font-medium">Allergies</p>
                  <p className="text-xl font-semibold text-red-700">
                    {patientData.allergies.join(", ")}
                  </p>
                </div>
                <div className="bg-gray-100 p-6 rounded-xl shadow-md md:col-span-3">
                  <p className="text-gray-600 text-lg font-medium">
                    Emergency Contact
                  </p>
                  {/* <p className="text-xl font-semibold text-blue-700">
                    {patientData.emergencyContact.name}:{" "}
                    {patientData.emergencyContact.phone}
                  </p> */}
                </div>
              </div>
            ) : (
              <p>No data found.</p>
            )}
          </section>
        )}

        {activeSection === "appointments" && (
          <section className="bg-white p-8 rounded-2xl shadow-xl">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              Your Appointments
            </h3>
            <ul className="space-y-6">
              {patientAppointments.map((appointment) => (
                <li
                  key={appointment.id}
                  className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md"
                >
                  <div>
                    <h4 className="text-lg font-bold text-blue-700">
                      {appointment.doctor}
                    </h4>
                    <p className="text-gray-700">
                      {appointment.date} at {appointment.time}
                    </p>
                    <p
                      className={`${
                        appointment.status === "Confirmed"
                          ? "text-green-600"
                          : "text-yellow-600"
                      } font-semibold`}
                    >
                      {appointment.status}
                    </p>
                  </div>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                    View Details
                  </button>
                </li>
              ))}
            </ul>

            <form
              className="mt-10 bg-gray-100 p-6 rounded-xl shadow-lg space-y-4"
              onSubmit={handleAppointmentSubmit}
            >
              <h4 className="text-2xl font-bold text-gray-800">
                Schedule an Appointment
              </h4>
              <div className="space-y-2">
                <label htmlFor="doctor" className="block text-lg font-medium">
                  Select Doctor:
                </label>
                <select
                  id="doctor"
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm"
                >
                  {availableDoctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.name}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="date" className="block text-lg font-medium">
                  Date:
                </label>
                <input
                  type="date"
                  id="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="time" className="block text-lg font-medium">
                  Time:
                </label>
                <input
                  type="time"
                  id="time"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600"
              >
                Book Appointment
              </button>
            </form>
          </section>
        )}

        <div className="fixed bottom-6 right-6">
          <button
            onClick={() => setChatOpen(!chatOpen)}
            className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
          >
            <BsChatDots className="text-2xl" />
          </button>
        </div>

        {chatOpen && (
          <div className="fixed bottom-20 right-6 w-80 bg-white rounded-xl shadow-xl overflow-hidden">
            <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
              <h4 className="text-lg font-bold">AI Assistance</h4>
              <button
                onClick={() => setChatOpen(false)}
                className="text-white font-bold"
              >
                X
              </button>
            </header>
            <div className="p-4">
              <p className="text-gray-600">
                Welcome! How can I assist you today?
              </p>
            </div>
            <footer className="p-4 flex">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full border border-gray-300 p-2 rounded-l-lg focus:outline-none"
              />
              <button className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600">
                Send
              </button>
            </footer>
          </div>
        )}
      </main>
    </div>
  );
};

export default PatientDashboard;
