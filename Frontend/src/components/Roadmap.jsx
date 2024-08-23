import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaUserPlus, FaUpload, FaCalendarCheck } from "react-icons/fa";

export default function Roadmap() {
  return (
    <section className="py-16 bg-blue-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-5xl font-bold">How It Works</h2>
        <p className="text-lg lg:text-xl text-gray-600 mt-4">
          It's simple and quick to get started!
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-6">
        <VerticalTimeline>
          {/* Step 1 */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "white", color: "#000" }}
            contentArrowStyle={{ borderRight: "7px solid white" }}
            iconStyle={{ background: "#00bcd4", color: "#fff" }}
            icon={<FaUserPlus />}
          >
            <h3 className="vertical-timeline-element-title text-xl font-bold">
              Step 1: Sign Up
            </h3>
            <p className="text-gray-600">
              Create your account and get access to all features.
            </p>
          </VerticalTimelineElement>

          {/* Step 2 */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "white", color: "#000" }}
            contentArrowStyle={{ borderRight: "7px solid white" }}
            iconStyle={{ background: "#f7b52d", color: "#fff" }}
            icon={<FaUpload />}
          >
            <h3 className="vertical-timeline-element-title text-xl font-bold">
              Step 2: Upload Reports
            </h3>
            <p className="text-gray-600">
              Upload your medical reports and start consultations.
            </p>
          </VerticalTimelineElement>

          {/* Step 3 */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "white", color: "#000" }}
            contentArrowStyle={{ borderRight: "7px solid white" }}
            iconStyle={{ background: "#ff6f6f", color: "#fff" }}
            icon={<FaCalendarCheck />}
          >
            <h3 className="vertical-timeline-element-title text-xl font-bold">
              Step 3: Book Appointments
            </h3>
            <p className="text-gray-600">
              Find the right doctors and hospitals and easily book appointments.
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </section>
  );
}
