"use client"

import { useState } from "react"
import CardsYoutubeVideo from "./CardsYoutubeVideo"

const videoExample = [
  { title: "Top Open World Games", description: "Top 10 upcoming open world games you need to watch", url: "https://www.youtube.com/watch?v=aaa111" },
  { title: "Elden Ring Guide", description: "Elden Ring beginner guide — tips they don’t tell you", url: "https://www.youtube.com/watch?v=bbb222" },
  { title: "Minecraft Mega Builds", description: "Minecraft mega base tour — insane builds!", url: "https://www.youtube.com/watch?v=ccc333" },
  { title: "Call of Duty Loadouts", description: "Call of Duty: Best loadouts for Season 5", url: "https://www.youtube.com/watch?v=ddd444" },
  { title: "Fortnite Advanced Tips", description: "Fortnite tips to win more fights — advanced mechanics", url: "https://www.youtube.com/watch?v=eee555" },
  { title: "Super Mario Speedrun", description: "Super Mario speedrunner breaks world record", url: "https://www.youtube.com/watch?v=fff666" },
  { title: "GTA 5 Fun Moments", description: "GTA 5 crazy stunts and funniest moments compilation", url: "https://www.youtube.com/watch?v=ggg777" },
  { title: "Street Fighter 6 Analysis", description: "Street Fighter 6 — pro player breakdown", url: "https://www.youtube.com/watch?v=hhh888" }
]

export default function VideoList() {
  const [filterName, setFilterName] = useState<"title" | "description">("title")
  const [searchBar, setSearchBar] = useState("")

  return (
    <>
      <form className="container mt-5">
        <div className="mb-3">
          <label htmlFor="exampleInputSearch" className="form-label">Search For Video</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputSearch"
            value={searchBar}
            onChange={(e) => setSearchBar(e.target.value)}
            placeholder="Type to search..."
          />
        </div>
        {/* buttons */}
        <div className="btn-group mb-3" role="group" aria-label="Basic example">
          <button type="button" onClick={() => setFilterName("title")} className="btn btn-primary">Title</button>
          <button type="button" onClick={() => setFilterName("description")} className="btn btn-primary">Description</button>
        </div>
      </form>

      <div className="container d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "60vh" }}>
        <div className="row justify-content-center w-100">
          {videoExample
            .filter(video =>
              video[filterName].toLowerCase().includes(searchBar.toLowerCase())
            )
            .map((video, index) => (
              <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center mb-4">
                <CardsYoutubeVideo
                  title={video.title}
                  description={video.description}
                  url={video.url}
                />
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}
