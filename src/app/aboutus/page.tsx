import Stack from "react-bootstrap/esm/Stack";
import Bottomtext from "../componets/Bottomtext";
import Navbar from "../componets/Navbar";
import "../styles.scss";
import AboutThane from "../componets/aboutthane";
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
          <img src="/imgs/OAA_Logos/cropped_OAALOGO.PNG" style={{ maxHeight: "300px"}} className="img-fluid" alt="..." />
        </div>
        <OurVision />
        <AboutThane />
      </Stack>
      <Bottomtext />
    </>
  );
}
