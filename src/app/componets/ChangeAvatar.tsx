import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";

function ChangeAvator(props: any) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <img
            className="center"
            src="https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109?s=200"
          />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="custom-file mt-2">
          <input
            className="custom-file-input"
            id="customFile"
            accept="image/png , "
            type="file"
          />{" "}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ChangeAvator;
