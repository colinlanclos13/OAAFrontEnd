"use client"

import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { GetVideoCatalog } from "../services/Queries"
import CardsYoutubeVideo from "./CardsYoutubeVideo"
import ModalInsertVideoCatalog from "./ModalInsertVideoCatalog"


type VideoCatalog = {
  videoCatalogId: number;
  url: string;
  title: string;
  discription: string;
};

export default function VideoList() {
  const [filterName, setFilterName] = useState<"title" | "discription">("title")
  const [searchBar, setSearchBar] = useState("")
  const [modalShowCreate, setModalShowCreate] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [videoList, setVideoList] = useState<VideoCatalog[]>([]);

  const { isError, isSuccess, isLoading, data, error } = useQuery({
    queryKey: ["getCatalog"],
    queryFn: () => GetVideoCatalog(),
  });
  useEffect(() => {
    let role = "";
        if (typeof window !== "undefined") {
        const stored = sessionStorage.getItem("id");
        if (stored) {
            const parsed = JSON.parse(stored);
            role = parsed.role;
            if(role === "admin"){
              setAdmin(true);
            }
        }
      }
    if (isSuccess && data) {
      setVideoList(data);
    }
  }, [isSuccess, data]);
  useEffect(() => {
    if (isError) {
      toast("Error On Load");
    }
  }, [isError]);

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
          <button type="button" onClick={() => setFilterName("discription")} className="btn btn-primary">Description</button>
        </div>
        <br/>
        {admin? <button type="button" onClick={() => setModalShowCreate(true)} className="btn btn-primary mb-3">Insert Video To Catalog</button>: <></>}
      </form>

      <div
  className="container d-flex flex-column align-items-center justify-content-center"
  style={{ minHeight: "60vh" }}
>
  {isLoading ? (
    /* 🔄 Bootstrap Spinner */
    <div className="d-flex justify-content-center align-items-center">
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  ) : (
    /* 📦 Data Loaded */
    <div className="row justify-content-center w-100">
      {videoList
        .filter(video =>
          video[filterName]
            .toLowerCase()
            .includes(searchBar.toLowerCase())
        )
        .map((video) => (
          <div
            key={video.videoCatalogId}
            className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center mb-4"
          >
            <CardsYoutubeVideo
              title={video.title}
              description={video.discription}
              url={video.url}
              id={video.videoCatalogId}
              admin={admin}
            />
          </div>
        ))}
    </div>
  )}
</div>

      <ModalInsertVideoCatalog 
             showCreate={modalShowCreate} 
             onHideCreate={() => setModalShowCreate(false)}            
            />
    </>
  )
}
