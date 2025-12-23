"useClient";

import Row from "react-bootstrap/esm/Row";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Collapse from "react-bootstrap/esm/Collapse";
import Col from "react-bootstrap/esm/Col";
import Stack from "react-bootstrap/esm/Stack";
import Container from "react-bootstrap/esm/Container";
import internal from "stream";
import ModalForPurchasingProduct from "./ModelPurchaseProduct";

type rowDataNotLogin = {
    programName: string;
    description: string;
  }

//row for certain progrma that are put in list
function ProgramRowNotLogin(props: rowDataNotLogin) {
  const [open, setOpen] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <div>
        <Row className="bg-dark rounded pt-4 pb-4">
          <Col className="fs-3 text-primary">{props.programName}</Col>
          <Col>
            <Button
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}
            >
              Click Me For Discription
            </Button>
          </Col>{" "}
          
          <Collapse in={open}>
            <div id="example-collapse-text">{props.description}</div>
          </Collapse>
        </Row>
      </div>
    </>
  );
}

export default ProgramRowNotLogin;