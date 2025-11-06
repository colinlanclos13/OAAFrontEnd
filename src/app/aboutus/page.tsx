import Stack from "react-bootstrap/esm/Stack";
import Bottomtext from "../componets/Bottomtext";
import Navbar from "../componets/Navbar";
import "../styles.scss";
import AboutColin from "../componets/aboutcolin";
import AboutThane from "../componets/aboutthane";
import AboutRoonie from "../componets/aboutroonie";
import OurVision from "../componets/AboutUs";

export default function AboutUs() {
  return (
    <>
      <Navbar />

      <Stack>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ filter: "brightness(1)" }}
        >
          <img src="/imgs/EMlogoCopy.png" className="img-fluid" alt="..." />
        </div>
        <OurVision />
        <AboutColin />
        <AboutThane />
        <AboutRoonie />
      </Stack>
      <Bottomtext />
    </>
  );
}
