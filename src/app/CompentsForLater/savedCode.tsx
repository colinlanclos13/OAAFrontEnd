import { useState } from "react";
import { Button } from "react-bootstrap";
import ModalForPurchasingProduct from "../componets/ModelPurchaseProduct";


export const MyFutureComponentA = (props: any) => {
    const [modalShow, setModalShow] = useState(false);
        return <ModalForPurchasingProduct
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
  };


  export const MyFutureComponentB = (props: any) => {
    const [modalShow, setModalShow] = useState(false);
    return <Button
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
  };