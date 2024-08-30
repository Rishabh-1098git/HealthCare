import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUpload, FiFile, FiX } from "react-icons/fi";
import { storage } from "../../firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const UploadBloodReport = () => {
  const [report, setReport] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setReport(e.target.files[0]);
  };

  const handleReset = () => {
    setReport(null);
    setUploadProgress(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!report) return;

    const storageRef = ref(storage, `reports/${report.name}`);
    const uploadTask = uploadBytesResumable(storageRef, report);

    // Track the upload progress
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(Math.round(progress));
      },
      (error) => {
        console.error("Upload error:", error);
      },
      async () => {
        // Get the download URL and save it to Firestore (if needed)
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        // You can now use downloadURL for further actions, e.g., saving to Firestore
        console.log("File available at", downloadURL);

        // Navigate to the dashboard after successful upload
        navigate("/patientsdashboard");
      }
    );
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4"
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "100vw" }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl border border-gray-200">
        {/* Left side: Icon with dotted border or file icon */}
        <div className="flex-1 flex items-center justify-center lg:mr-8 mb-6 lg:mb-0">
          <div
            className={`border-4 ${
              report
                ? "border-solid border-blue-500"
                : "border-dotted border-gray-400"
            } p-4 rounded-lg flex flex-col items-center justify-center space-y-2 bg-gray-100 shadow-md`}
          >
            {!report ? (
              <>
                <FiUpload className="text-blue-500 text-6xl" />
                <span className="text-gray-600">
                  Drag & Drop or Click to Upload
                </span>
              </>
            ) : (
              <div className="flex flex-col items-center">
                <FiFile className="text-blue-500 text-6xl mb-2" />
                <span className="text-gray-600 text-lg font-medium">
                  {report.name}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right side: Form */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Upload Your Blood Report
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            {!report ? (
              <label className="w-full flex flex-col items-center p-6 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-blue-600 transition ease-in-out duration-300">
                <FiUpload className="w-12 h-12 text-blue-600 mb-3" />
                <span className="text-gray-600 text-lg">
                  Drag & Drop or Click to Upload
                </span>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="w-full text-center">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center text-blue-600 hover:underline mb-4"
                >
                  <FiX className="w-6 h-6 mr-2" />
                  <span>Reset</span>
                </button>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="border border-gray-300 p-2 rounded-lg mb-4"
                />
              </div>
            )}
            {uploadProgress > 0 && (
              <div className="w-full mb-4">
                <div
                  className="bg-blue-500 text-white text-xs font-medium text-center p-0.5 leading-none rounded-lg"
                  style={{ width: `${uploadProgress}%` }}
                >
                  {uploadProgress}%
                </div>
              </div>
            )}
            <button
              type="submit"
              className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default UploadBloodReport;
