import Bottomtext from "../componets/Bottomtext";
import Navbar from "../componets/Navbar";
import RegisterForm from "../componets/Register";
import "../styles.scss";

export default function register() {
  return (
    <>
      <Navbar />
      <RegisterForm />
      <Bottomtext />
    </>
  );
}
