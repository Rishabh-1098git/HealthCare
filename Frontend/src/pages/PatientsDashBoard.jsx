import React from "react";
import {
  FaUser,
  FaHeartbeat,
  FaThermometerHalf,
  FaSyringe,
} from "react-icons/fa";
import {
  MdLocalHospital,
  MdCheckCircle,
  MdPending,
  MdDateRange,
} from "react-icons/md";

export default function PatientsDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 font-mainFont">
      <div className="max-w-6xl mx-auto">
        {/* Main Header */}
        <div className="bg-white shadow-lg rounded-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Profile */}
          <div className="col-span-1 flex items-center bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-4">
            <img
              src="https://via.placeholder.com/100"
              alt="Profile"
              className="rounded-full h-24 w-24 border-4 border-white shadow-lg"
            />
            <div className="ml-4 text-white">
              <h1 className="text-xl font-bold flex items-center">
                <FaUser className="mr-2" /> Jack Ryan
              </h1>
              <p className="text-sm">Gender: Male</p>
              <p className="text-sm">Blood Gr: AB-</p>
              <p className="text-sm">ID: 91056248AN</p>
            </div>
          </div>

          {/* Vital Stats */}
          <div className="col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg shadow-md">
              <p className="text-2xl font-bold">88mmHg</p>
              <p className="text-sm text-gray-500 flex items-center justify-center">
                <FaHeartbeat className="mr-1 text-red-500" /> Blood Pressure
              </p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-md">
              <p className="text-2xl font-bold">71bpm</p>
              <p className="text-sm text-gray-500 flex items-center justify-center">
                <FaHeartbeat className="mr-1 text-red-500" /> Pulse Rate
              </p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-md">
              <p className="text-2xl font-bold">121mg/dL</p>
              <p className="text-sm text-gray-500 flex items-center justify-center">
                <FaThermometerHalf className="mr-1 text-yellow-500" /> LDL
              </p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-md">
              <p className="text-2xl font-bold">55mg/dL</p>
              <p className="text-sm text-gray-500 flex items-center justify-center">
                <FaThermometerHalf className="mr-1 text-green-500" /> HDL
              </p>
            </div>
          </div>
        </div>

        {/* Information and Appointments Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Appointments (Full Width) */}
          <div className="col-span-1 bg-white p-4 rounded-lg shadow-lg border-t-4 border-green-400">
            <h2 className="text-lg font-semibold mb-2 flex items-center">
              <FaSyringe className="mr-2 text-green-400" /> Appointments
            </h2>
            <ul>
              <li>3 June - Dr Andrew P</li>
              <li>15 June - Dr Drew White</li>
              <li>9 August - Dr O' Brien</li>
            </ul>
          </div>

          {/* Information */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h2 className="text-lg font-semibold mb-2 flex items-center">
              <FaUser className="mr-2 text-blue-500" /> Information
            </h2>
            <p>Date of Birth: 22 June 1992</p>
            <p>Height: 1.8m</p>
            <p>Weight: 90kg</p>
            <p>Allergies: Peanuts, Dairy</p>
            <p>BP: 88mmHg</p>
            <p>Pulse Rate: 71bpm</p>
          </div>
        </div>

        {/* Doctor Information and Lab Reports Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Lab Reports (Full Width) */}
          <div className="col-span-1 bg-white p-4 rounded-lg shadow-md border-l-4 border-red-400">
            <h2 className="text-lg font-semibold mb-2 flex items-center">
              <MdCheckCircle className="mr-2 text-green-400" /> Lab Reports
            </h2>
            <ul>
              <li>
                Blood Test - 4 July 2019{" "}
                <span className="text-blue-500 cursor-pointer flex items-center">
                  <MdCheckCircle className="mr-1" /> View
                </span>
              </li>
              <li>
                MRI - 5 July 2019{" "}
                <span className="text-red-500 cursor-pointer flex items-center">
                  <MdPending className="mr-1" /> Pending
                </span>
              </li>
              <li>
                X-Ray - 9 August 2019{" "}
                <span className="text-blue-500 cursor-pointer flex items-center">
                  <MdCheckCircle className="mr-1" /> View
                </span>
              </li>
            </ul>
          </div>

          {/* Doctor Information */}
          <div className="bg-gradient-to-r from-green-400 to-blue-400 p-6 rounded-lg text-white shadow-md">
            <h2 className="text-lg font-semibold mb-2 flex items-center">
              <MdLocalHospital className="mr-2" /> Doctor Information
            </h2>
            <p>Name: Dr. Drew White</p>
            <p>Specialist: General Physician</p>
            <p>Location: Cleveland, Ohio</p>
            <p>Gender: Male</p>
            <p>Experience: 12 Years</p>
          </div>
        </div>
      </div>
    </div>
  );
}
