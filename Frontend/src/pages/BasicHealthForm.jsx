import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Select from "react-select";
import image from "../assets/basicHealthInfo.svg";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { setDoc } from "../../firebase";
import { doc } from "../../firebase";
import { db } from "../../firebase";
// Sample options for gender and conditions (you can replace these with more comprehensive lists or fetch from an API)
const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const conditionOptions = [
  { value: "none", label: "None" },
  { value: "asthma", label: "Asthma" },
  { value: "diabetes", label: "Diabetes" },
  { value: "hypertension", label: "Hypertension" },
  { value: "heartDisease", label: "Heart Disease" },
  { value: "stroke", label: "Stroke" },
  { value: "cancer", label: "Cancer" },
  { value: "chronicKidneyDisease", label: "Chronic Kidney Disease" },
  { value: "arthritis", label: "Arthritis" },
  { value: "epilepsy", label: "Epilepsy" },
  { value: "migraine", label: "Migraine" },
  { value: "allergies", label: "Allergies" },
  { value: "obesity", label: "Obesity" },
  { value: "copd", label: "Chronic Obstructive Pulmonary Disease (COPD)" },
  { value: "gerd", label: "Gastroesophageal Reflux Disease (GERD)" },
  { value: "fibromyalgia", label: "Fibromyalgia" },
  { value: "multipleSclerosis", label: "Multiple Sclerosis" },
  { value: "parkinsons", label: "Parkinson's Disease" },
  { value: "tuberculosis", label: "Tuberculosis" },
  { value: "hepatitis", label: "Hepatitis" },
  { value: "hivAids", label: "HIV/AIDS" },
  { value: "celiacDisease", label: "Celiac Disease" },
  { value: "lupus", label: "Lupus" },
  { value: "sickleCellAnemia", label: "Sickle Cell Anemia" },
  { value: "thyroidDisorder", label: "Thyroid Disorder" },
  { value: "sleepApnea", label: "Sleep Apnea" },
  { value: "chronicFatigueSyndrome", label: "Chronic Fatigue Syndrome" },
  { value: "psoriasis", label: "Psoriasis" },
  { value: "eczema", label: "Eczema" },
  { value: "rheumatoidArthritis", label: "Rheumatoid Arthritis" },
  { value: "gout", label: "Gout" },
  { value: "endometriosis", label: "Endometriosis" },
  {
    value: "polycysticOvarySyndrome",
    label: "Polycystic Ovary Syndrome (PCOS)",
  },
  { value: "ulcerativeColitis", label: "Ulcerative Colitis" },
  { value: "crohnsDisease", label: "Crohn's Disease" },
  { value: "migraines", label: "Migraines" },
  { value: "menieresDisease", label: "Meniere's Disease" },
  { value: "vertigo", label: "Vertigo" },
  { value: "cysticFibrosis", label: "Cystic Fibrosis" },
  { value: "meningitis", label: "Meningitis" },
  { value: "encephalitis", label: "Encephalitis" },
  { value: "bipolarDisorder", label: "Bipolar Disorder" },
  { value: "schizophrenia", label: "Schizophrenia" },
  { value: "depression", label: "Depression" },
  { value: "anxietyDisorder", label: "Anxiety Disorder" },
  { value: "addiction", label: "Addiction" },
  {
    value: "postTraumaticStressDisorder",
    label: "Post-Traumatic Stress Disorder (PTSD)",
  },
  { value: "autismSpectrumDisorder", label: "Autism Spectrum Disorder (ASD)" },
  {
    value: "attentionDeficitHyperactivityDisorder",
    label: "Attention Deficit Hyperactivity Disorder (ADHD)",
  },
];

const allergyOptions = [
  { value: "none", label: "None" },
  { value: "pollen", label: "Pollen" },
  { value: "dustMites", label: "Dust Mites" },
  { value: "petDander", label: "Pet Dander" },
  { value: "mold", label: "Mold" },
  { value: "beeStings", label: "Bee Stings" },
  { value: "peanuts", label: "Peanuts" },
  { value: "treeNuts", label: "Tree Nuts" },
  { value: "milk", label: "Milk" },
  { value: "eggs", label: "Eggs" },
  { value: "soy", label: "Soy" },
  { value: "wheat", label: "Wheat" },
  { value: "fish", label: "Fish" },
  { value: "shellfish", label: "Shellfish" },
  { value: "latex", label: "Latex" },
  { value: "certainMedications", label: "Certain Medications" },
  { value: "fragrances", label: "Fragrances" },
  { value: "certainFoods", label: "Certain Foods" },
  { value: "grass", label: "Grass" },
  { value: "insectBites", label: "Insect Bites" },
  { value: "sulfites", label: "Sulfites" },
  { value: "artificialColors", label: "Artificial Colors" },
  { value: "artificialFlavors", label: "Artificial Flavors" },
  { value: "preservatives", label: "Preservatives" },
  { value: "alcohol", label: "Alcohol" },
  { value: "caffeine", label: "Caffeine" },
  { value: "certainFruits", label: "Certain Fruits" },
  { value: "certainVegetables", label: "Certain Vegetables" },
  { value: "yeast", label: "Yeast" },
  { value: "gluten", label: "Gluten" },
  { value: "corn", label: "Corn" },
  { value: "coconut", label: "Coconut" },
  { value: "sesame", label: "Sesame" },
  { value: "garlic", label: "Garlic" },
  { value: "onion", label: "Onion" },
  { value: "tomato", label: "Tomato" },
  { value: "spinach", label: "Spinach" },
  { value: "carrot", label: "Carrot" },
  { value: "broccoli", label: "Broccoli" },
  { value: "sugar", label: "Sugar" },
  { value: "highHistamineFoods", label: "High Histamine Foods" },
  { value: "sunlight", label: "Sunlight" },
  { value: "cold", label: "Cold" },
  { value: "heat", label: "Heat" },
  { value: "fruits", label: "Fruits" },
  { value: "vegetables", label: "Vegetables" },
  { value: "certainMeats", label: "Certain Meats" },
  { value: "aspartame", label: "Aspartame" },
];

const BasicHealthForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: "",
    gender: null,
    height: "",
    weight: "",
    conditions: [],
    allergies: [],
    medications: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (selectedOption, { name }) => {
    setFormData({ ...formData, [name]: selectedOption });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Check if any field is empty
    const { age, gender, height, weight, conditions, allergies, medications } =
      formData;

    if (
      !age ||
      !gender ||
      !height ||
      !weight ||
      conditions.length === 0 ||
      allergies.length === 0 ||
      !medications
    ) {
      setErrorMessage("Please fill in all fields before proceeding.");
      return; // Prevent form submission if validation fails
    }

    // If all fields are filled, save data to Firestore
    setErrorMessage(""); // Clear any previous error messages

    try {
      if (user) {
        // Update Firestore with user's basic health information
        await setDoc(
          doc(db, "users", user.uid),
          {
            age,
            gender: gender.value,
            height,
            weight,
            conditions: conditions.map((option) => option.value),
            allergies: allergies.map((option) => option.value),
            medications,
          },
          { merge: true }
        );
        toast.success("Basic health information saved successfully!");
        // Navigate to the next page
        navigate("/upload-blood-report");
      } else {
        setErrorMessage("User not authenticated.");
        toast.error("User not authenticated.");
      }
    } catch (error) {
      console.error("Error updating Firestore:", error);
      setErrorMessage("Failed to save information. Please try again.");
      toast.error(error);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "-100vw" }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="bg-white shadow-lg p-8 rounded-lg max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-[550px] font-mainFont">
        {/* Left side: Form */}
        <div>
          <h1 className="text-2xl font-bold text-center mb-6">
            Basic Health Information
          </h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <Select
              name="gender"
              options={genderOptions}
              value={formData.gender}
              onChange={handleChange}
              placeholder="Gender"
              className="w-full"
            />
            <input
              type="number"
              name="height"
              placeholder="Height (cm)"
              value={formData.height}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              name="weight"
              placeholder="Weight (kg)"
              value={formData.weight}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <Select
              name="conditions"
              options={conditionOptions}
              value={formData.conditions}
              onChange={(selectedOptions) =>
                handleChange(selectedOptions, { name: "conditions" })
              }
              isMulti
              placeholder="Conditions"
              className="w-full"
            />
            <Select
              name="allergies"
              options={allergyOptions}
              value={formData.allergies}
              onChange={(selectedOptions) =>
                handleChange(selectedOptions, { name: "allergies" })
              }
              isMulti
              placeholder="Allergies"
              className="w-full"
            />
            <input
              type="text"
              name="medications"
              placeholder="Medications"
              value={formData.medications}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />

            <div className="col-span-2">
              {/* Error message */}
              {errorMessage && (
                <p className="text-red-500 text-center mb-4">{errorMessage}</p>
              )}

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Next
              </button>
            </div>
          </form>
        </div>

        {/* Right side: Image */}
        <div className="flex justify-center">
          <img
            src={image}
            alt="Health Info Illustration"
            className="w-full h-auto max-w-sm"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default BasicHealthForm;
