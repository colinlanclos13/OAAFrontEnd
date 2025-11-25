"use client"

import { YouTubeProps } from "react-youtube"


type YoutubeCardInfo = {
    title: string
    description: string 
    url: string
}

export default function CardsYoutubeVideo(props: YoutubeCardInfo){
    return(
        <>
            <div className="card" style= {{width: "18rem"}}>
              <iframe src="https://www.youtube.com/embed/EgcIiqmdZ2M?si=h92CTGTujtXR6UoR" title="YouTube video" ></iframe>
                    <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.description}</p>
                    <a href={props.url} className="btn btn-primary">To Youtube</a>
                </div>
            </div>
        </>
    )
}