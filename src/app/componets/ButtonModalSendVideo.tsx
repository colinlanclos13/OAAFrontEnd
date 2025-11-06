import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import ModalSendVideo from "./ModalSendVideo";
import React from "react";

function ButtonModalSendVideo() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div className="container mt-3 ">
      <Button size="lg" variant="primary" onClick={() => setModalShow(true)}>
        Send In Your Video
      </Button>

      <ModalSendVideo show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}

export default ButtonModalSendVideo;
