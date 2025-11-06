import Bottomtext from "../componets/Bottomtext";
import LoginForm from "../componets/LoginForm";
import Navbar from "../componets/Navbar";
import "../styles.scss";
import "./loginFormStyle.css";

export default function login() {
  return (
    <>
      <Navbar />
      <LoginForm />
      <Bottomtext />
    </>
  );
}
