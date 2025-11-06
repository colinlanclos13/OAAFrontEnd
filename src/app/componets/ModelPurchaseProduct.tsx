import { useMutation } from "@tanstack/react-query";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import { purchaseProduct } from "../services/Queries";
import Checkout from "./PayPal";

//purchasing certain product
function ModalForPurchasingProduct(props: any) {
  const mutation = useMutation({
    mutationFn: (data: any) => {
      return purchaseProduct(data);
    },
    onSuccess: () => {
      alert("Lets fucking goooo");
      //push("/login");
    },
    onError: () => {
      alert("fuck");
    },
  });

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Thank You</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Purchase {props.programName}</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros. gay sex
          {props.programId}
          <Checkout programid={props.programId} />
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalForPurchasingProduct;
