import { motion, useReducedMotion } from "framer-motion";
import Roadmap from "../components/Roadmap";
import ReportImage from "../assets/Reports.jpg";
import ChatBotImage from "../assets/ChatBot.jpg";
import Appointment from "../assets/Appointment.jpg";
import React, { memo } from "react";

const FeatureCard = memo(function FeatureCard({
  imgSrc,
  title,
  description,
  animationDirection,
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="bg-white p-8 rounded-lg shadow-lg w-full will-change-transform"
      initial={{
        opacity: shouldReduceMotion ? 1 : 0,
        x: shouldReduceMotion ? 0 : animationDirection === "left" ? -50 : 50,
      }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.5 }}
    >
      <img
        src={imgSrc}
        alt={title}
        className="w-full h-40 object-cover rounded-t-lg mb-4"
        loading="lazy"
      />
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
});

export default function Home() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="bg-gray-100 text-gray-800 font-mainFont">
      <section className="relative text-white h-screen flex items-center justify-center bg-mainBackgroundImage">
        <motion.div
          className="text-center will-change-transform"
          initial={{
            opacity: shouldReduceMotion ? 1 : 0,
            scale: shouldReduceMotion ? 1 : 0.8,
          }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Welcome to CareSync
          </h1>
          <p className="text-lg lg:text-2xl mb-6">
            Your AI-powered doctor-patient consultation platform.
          </p>
          <button className="bg-white text-sky-500 font-bold py-3 px-6 rounded-full shadow-lg hover:bg-blue-50 transition-all button-hover">
            Get Started
          </button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="text-center mb-24">
          <h2 className="text-3xl lg:text-5xl font-bold">Our Features</h2>
          <p className="text-lg lg:text-xl text-gray-600 mt-8">
            Everything you need to manage your health, all in one place.
          </p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-6">
          <FeatureCard
            imgSrc={ReportImage}
            title="Upload Your Reports"
            description="Securely upload your medical reports and access them anytime, anywhere."
            animationDirection="left"
          />
          <FeatureCard
            imgSrc={ChatBotImage}
            title="AI Chatbot Consultation"
            description="Talk to our AI-powered chatbot for quick medical advice and support."
            animationDirection="up"
          />
          <FeatureCard
            imgSrc={Appointment}
            title="Book Appointments"
            description="Find doctors and hospitals near you and book appointments easily."
            animationDirection="right"
          />
        </div>
      </section>

      {/* Top Doctors Section */}
      <section className="py-16">
        <div className="text-center mb-20">
          <h2 className="text-3xl lg:text-5xl font-bold">
            Consult top doctors online for any health concern
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 mt-4">
            Private online consultations with verified doctors in all
            specialists
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap lg:flex-nowrap lg:overflow-x-auto lg:space-x-12">
            {[
              {
                title: "Period doubts or Pregnancy",
                img: "https://www.practostatic.com/consult/consult-home/symptoms_icon/irregular-painful+period.png",
              },
              {
                title: "Acne, pimple or skin issues",
                img: "https://www.practostatic.com/consult/consult-home/symptoms_icon/Acne.png",
              },
              {
                title: "Performance issues in bed",
                img: "https://www.practo.com/consult/static/images/top-speciality-sexology.svg",
              },
              {
                title: "Cold, cough or fever",
                img: "https://www.practostatic.com/consult/consult-home/symptoms_icon/coughing.png",
              },
              {
                title: "Child not feeling well",
                img: "https://www.practo.com/consult/static/images/top-speciality-pediatric.svg",
              },
              {
                title: "Depression or anxiety",
                img: "https://www.practostatic.com/acred/search-assets/2/12-mental-wellness.png",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center mb-8 lg:mb-0"
                initial={{
                  opacity: shouldReduceMotion ? 1 : 0,
                  y: shouldReduceMotion ? 0 : 50,
                }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 * index }}
              >
                <div className="w-32 h-32 rounded-full mb-4 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-lg font-semibold text-center mb-2">
                  {item.title}
                </h3>
                <a className="text-sky-500 font-bold py-2 px-4 rounded-full cursor-pointer">
                  CONSULT
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-blue-50">
        <Roadmap />
      </section>

      {/* Footer */}
      <footer className="bg-mainBackgroundImage text-white py-6">
        <div className="text-center">
          <p>© 2024 CareSync - All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}
