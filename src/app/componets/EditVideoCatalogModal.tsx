import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import Form from "react-bootstrap/esm/Form"
import { useState } from "react";
import { UpdateVideoCatalog } from "../services/Queries";
import { useMutation, QueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

type YoutubeCardInfo = {
    title: string
    description: string 
    url: string
    admin:Boolean
    id: Number
    show:boolean
    onHide: any
}

type UpdateVideoCatalogData= {
    videoCatalogId: any,
    url: string,
    title: string,
    discription: string,
    jwtString: string
  }
  
export default function EditVideoCatalogModal(props:YoutubeCardInfo) {


  const [title, setTitle] = useState(props.title);
  const [url, setUrl] = useState(props.url);
  const [discription, setDiscription] = useState(props.description);
  const [alertMessageForTitle, setAlertMessageForTitle] = useState("");
  const [alertMessageForDiscription, setAlertMessageForDiscription] = useState("");
  const [alertMessageForUrl, setAlertMessageForUrl] = useState("");

  const mutation = useMutation({
    mutationFn: (data: UpdateVideoCatalogData ) => {
      return UpdateVideoCatalog(data);
    },
    onSuccess: () => {
      toast("Updated");
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
        mutation.mutate({"videoCatalogId": props.id,"url": url,"title":title,"discription": discription, "jwtString":jwtString})
    }

    
  };

  return (
    <Modal
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Video
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
      {alertMessageForTitle?<div id="passwordHelpBlock" className="form-text text-danger">
        {alertMessageForTitle}
    </div>: <></>}

      {/* URL */}
      <div className="mb-3">
        <label className="form-label">Video URL</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      {alertMessageForDiscription?<div id="passwordHelpBlock" className="form-text text-danger">
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
         {alertMessageForUrl?<div id="passwordHelpBlock" className="form-text text-danger">
        {alertMessageForUrl}
        </div>: <></>}
      </div>
        <button type="submit" onClick={() => handleSubmit} className="btn btn-primary">
            Submit
        </button>
    </form>
        
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
