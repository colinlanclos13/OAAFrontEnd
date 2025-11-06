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

type rowData = {
  programId: number;
  programName: string;
  description: string;
  linkToProgram: string;
  cost: number;
};

//row for certain progrma that are put in list
function ProgramRow(props: rowData) {
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
          {props.linkToProgram.includes("https://pdflink") ? (
            <Col className="fs-3">
              <a
                href={props.linkToProgram}
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                Link To Program
              </a>
            </Col>
          ) : (
            <Col>
              <Button
                variant="primary"
                onClick={() => {
                  setModalShow(true),
                    sessionStorage.setItem("cost", props.cost.toString()),
                    sessionStorage.setItem(
                      "productId",
                      props.programId.toString()
                    );
                }}
              >
                Purchase Program
              </Button>
              <ModalForPurchasingProduct
                show={modalShow}
                onHide={() => {
                  setModalShow(false),
                    sessionStorage.removeItem("productId"),
                    sessionStorage.removeItem("cost");
                }}
                programId={props.programId}
                programName={props.programName}
                cost={props.cost}
              />
            </Col>
          )}
          <Collapse in={open}>
            <div id="example-collapse-text">{props.description}</div>
          </Collapse>
        </Row>
      </div>
    </>
  );
}

export default ProgramRow;
