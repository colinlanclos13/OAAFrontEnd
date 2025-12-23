import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import Form from "react-bootstrap/esm/Form"
import { useState } from "react";
import { DeleteVideoCatalog} from "../services/Queries";
import { useMutation, QueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { info } from "console";


type deleteInfo = { 
  id:number,
  jwtString: string
}


export default function ModalDeleteVideo(props:any){
    const mutation = useMutation({
        mutationFn: (infoToPass: deleteInfo) => {
          return DeleteVideoCatalog(infoToPass.id, infoToPass.jwtString);
        },
        onSuccess: () => {
          toast("DELETED");
          props.onHide()
          window.location.reload();
        },
        onError: (data) => {
          toast.error("ERMM IDK Text Colin");
        },
      });
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let jwtString = "";
        if (typeof window !== "undefined") {
        const stored = sessionStorage.getItem("id");
        if (stored) {
            const parsed = JSON.parse(stored);
            jwtString = parsed.jwt;
        }
        }
        const id = props.id
        mutation.mutate({id, jwtString})
      };




    return(
    <Modal
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          ARE YOU SURE
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="d-flex justify-content-center">
        <button onClick={handleSubmit} className="btn btn-danger">Yes</button>
       </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    )
    
}