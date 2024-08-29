import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db } from "../../firebase.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { provider } from "../../firebase.js";
function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isDoctor, setIsDoctor] = useState(false); // To handle doctor/patient role
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function signupUsingEmail() {
    setLoading(true);
    if (name && email && password && confirmPass) {
      if (password === confirmPass) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            toast.success("User created!");
            createDoc(user, isDoctor);
            resetForm();
            navigateToDashboard(isDoctor); // Navigate to respective dashboard
          })
          .catch((error) => {
            toast.error(error.message);
            setLoading(false);
          });
      } else {
        toast.error("Password and Confirm Password don't match!");
        resetPassword();
      }
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  }

  function loginUsingEmail() {
    console.log(email);
    console.log(password);
    setLoading(true);

    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          toast.success("User Logged in");

          // Get user role from Firestore
          const userDocRef = doc(db, "users", user.uid); // Replace 'users' with the name of your Firestore collection
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            const userRole = userData.role;

            setLoading(false);

            // Navigate based on role
            if (userRole === "doctor") {
              navigate("/doctorsdashboard");
            } else if (userRole === "patient") {
              navigate("/patientsdashboard");
            } else {
              toast.error("User role not recognized");
            }
          } else {
            setLoading(false);
            toast.error("User data not found");
          }
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  }

  async function createDoc(user, isDoctor) {
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try {
        await setDoc(userRef, {
          name,
          email: user.email,
          role: isDoctor ? "doctor" : "patient", // Save the role as doctor or patient
          createdAt: new Date(),
        });
        toast.success("User document created");
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("User document already exists");
    }
    setLoading(false);
  }

  async function getRole(user) {
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (userData.exists()) {
      return userData.data().role;
    } else {
      toast.error("User data not found");
      setLoading(false);
      return null;
    }
  }

  function navigateToDashboard(isDoctor) {
    if (isDoctor) {
      navigate("/doctorsdashboard");
    } else {
      navigate("/basic-health-info");
    }
    setLoading(false);
  }

  function resetForm() {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPass("");
    setLoading(false);
  }

  function resetPassword() {
    setPassword("");
    setConfirmPass("");
    setLoading(false);
  }

  const handleLoginClick = () => {
    setIsLogin(true);
  };

  const handleRegisterClick = () => {
    setIsLogin(false);
  };

  return (
    <div className="flex h-screen">
      {/* Left Side with Image */}
      <div
        className="w-1/2 h-[680px] mt-2 bg-cover bg-center"
        style={{
          backgroundImage: `url('src/assets/dr2.png')`,
        }}
      ></div>

      {/* Right Side with Form */}
      <div className="w-1/2 h-full flex flex-col justify-center items-center p-8 font-mainFont">
        <nav className="flex justify-center items-center mb-6">
          {/* Login Tab */}
          <div
            onClick={handleLoginClick}
            className={`mx-4 cursor-pointer text-lg ${
              isLogin ? "text-blue-500 font-bold" : "hover:text-blue-500"
            }`}
          >
            Login
          </div>
          {/* Register Tab */}
          <div
            onClick={handleRegisterClick}
            className={`mx-4 cursor-pointer text-lg ${
              !isLogin ? "text-blue-500 font-bold" : "hover:text-blue-500"
            }`}
          >
            Register
          </div>
        </nav>

        {/* Ensure consistent height for the form container */}
        <div className="w-full max-w-md">
          <div className="min-h-[350px]">
            {isLogin ? (
              <div>
                {/* Login Form */}
                <h2 className="text-center text-2xl font-bold mb-6">Login</h2>
                <form>
                  <div className="mb-4">
                    <label className="block">Email</label>
                    <input
                      type="email"
                      className="w-full p-3 border border-gray-300 rounded"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block">Password</label>
                    <input
                      type="password"
                      className="w-full p-3 border border-gray-300 rounded"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={loginUsingEmail}
                    className="w-full bg-blue-500 text-white py-3 rounded-lg"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </form>
              </div>
            ) : (
              <div>
                {/* Register Form */}
                <h2 className="text-center text-2xl font-bold mb-6">
                  Register
                </h2>
                <form>
                  <div className="mb-4">
                    <label className="block">Full Name</label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block">Email</label>
                    <div className="flex">
                      <input
                        type="email"
                        className="w-full p-3 border border-gray-300 rounded-r"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block">Create Password</label>
                    <input
                      type="password"
                      className="w-full p-3 border border-gray-300 rounded"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block">Confirm Password</label>
                    <input
                      type="password"
                      className="w-full p-3 border border-gray-300 rounded"
                      placeholder="Confirm your password"
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                    />
                  </div>
                  <div className="mb-4 flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-500 border-gray-300 rounded mr-2"
                      id="registerDoctor"
                      checked={isDoctor}
                      onChange={() => setIsDoctor(!isDoctor)}
                    />
                    <label htmlFor="registerDoctor" className="text-sm">
                      Register as a Doctor
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={signupUsingEmail}
                    className="w-full bg-sky-500 text-white py-3 rounded-lg"
                    disabled={loading}
                  >
                    {loading ? "Registering..." : "Register"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
