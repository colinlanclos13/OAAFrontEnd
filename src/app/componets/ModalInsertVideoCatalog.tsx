import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import Form from "react-bootstrap/esm/Form"
import { useState } from "react";
import { CreateVideoCatalog} from "../services/Queries";
import { useMutation, QueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

type YoutubeCardInfo = {
    showCreate:boolean
    onHideCreate: any
}

type InsertVideoData= {
    url: string,
    title: string,
    discription: string
    jwt: string
  }
  
export default function ModalInsertVideoCatalog(props:YoutubeCardInfo) {


  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [discription, setDiscription] = useState("");
  const [alertMessageForTitle, setAlertMessageForTitle] = useState("");
  const [alertMessageForDiscription, setAlertMessageForDiscription] = useState("");
  const [alertMessageForUrl, setAlertMessageForUrl] = useState("");

  const mutation = useMutation({
    mutationFn: (data: InsertVideoData ) => {
      return CreateVideoCatalog(data);
    },
    onSuccess: () => {
      toast("Vidoe Inserted");
      window.location.reload();
    },
    onError: (data) => {
      toast.error("ERMM IDK Text Colin");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let jwtString = "";


    if (typeof window !== "undefined") {
    const stored = sessionStorage.getItem("id");

    if (stored) {
        const parsed = JSON.parse(stored);
        jwtString = parsed.jwt;
    }
    }
    

    if(title === ""){
        setAlertMessageForTitle("Do Not Leave Title Blank");
    }else{
        setAlertMessageForTitle("")
    }
    if(discription === ""){
        setAlertMessageForDiscription("Do Not Leave the Description Blank");
    }else{
        setAlertMessageForDiscription("")
    }
    if(url === ""){
        setAlertMessageForUrl("Do not Leave Url Blank");
    }else{
        setAlertMessageForUrl("")
    }
    if(title !== "" || url !== "" || discription !==""){
        toast("Boom");
        mutation.mutate({"url":url,"title": title,"discription": discription, "jwt": jwtString})
    }
  };

  return (
    <Modal
      show={props.showCreate}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Insert Video
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form onSubmit={handleSubmit} className="p-3 border rounded">
      {/* TITLE */}
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      {alertMessageForTitle?<div className="form-text text-danger">
        {alertMessageForTitle}
    </div>: <></>}

      {/* URL */}
      <div className="mb-3">
        <label className="form-label">Video Id</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      {alertMessageForDiscription?<div className="form-text text-danger">
        {alertMessageForDiscription}
        </div>: <></>}

      {/* DESCRIPTION */}
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          rows={3}
          placeholder="Enter description"
          value={discription}
          onChange={(e) => setDiscription(e.target.value)}
        ></textarea>
         {alertMessageForUrl?<div className="form-text text-danger">
        {alertMessageForUrl}
        </div>: <></>}
      </div>
        <button type="submit" onClick={() => handleSubmit} className="btn btn-primary">
            Submit
        </button>
    </form>
        
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHideCreate}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
