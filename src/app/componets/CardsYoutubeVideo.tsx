"use client"

import { useState } from "react"
import { YouTubeProps } from "react-youtube"
import EditVideoCatalogModal from "./EditVideoCatalogModal"
import ModalDeleteVideo from "./ModalDeleteVideo"
import ModalInsertVideoCatalog from "./ModalInsertVideoCatalog"


type YoutubeCardInfo = {
    title: string
    description: string 
    url: string
    admin:Boolean
    id: Number
}

export default function CardsYoutubeVideo(props: YoutubeCardInfo){
    const [modalShow, setModalShow] = useState(false);
    const [modalShowDelete, setModalShowDelete] = useState(false);
    return(
        <>
            <div className="card" style= {{width: "18rem"}}>
              <iframe src={`https://www.youtube.com/embed/${props.url}`} title="YouTube video" ></iframe>
                    <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.description}</p>
                    <div className="row">
                        <div className="col">
                            <a href={`https://www.youtube.com/watch?v=${props.url}`} target="_blank" className="btn btn-danger">Youtube</a>
                        </div>
                        <div className="col">
                            {props.admin ? <a className="btn btn-primary" onClick={() => setModalShow(true)}>Edit</a>: <></>}
                        </div>
                        <div className="col">
                            {props.admin ? <a className="btn btn-sm mt-1 btn-danger fs-7" onClick={() => setModalShowDelete(true)}>DELETE</a>: <></>}
                        </div>
                    </div>
                </div>
            </div>

            <EditVideoCatalogModal
                 title={props.title}
                  description={props.description}
                  url={props.url}
                  id={props.id}
                  admin={true}  
                  show={modalShow}
                  onHide={() => setModalShow(false)}/>

            <ModalDeleteVideo
                  id={props.id} 
                  show={modalShowDelete}
                  onHide={() => setModalShowDelete(false)}/>
        </>
    )
}