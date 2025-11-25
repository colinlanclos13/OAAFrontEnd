"use client";
import { useQueries, useQuery } from "@tanstack/react-query";
import Navbar from "../componets/Navbar";
import Bottomtext from "../componets/Bottomtext";
import Stack from "react-bootstrap/esm/Stack";
import AnalysisVideoCard from "../componets/AnalysisVideoCards";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import "../styles.scss";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { GetAnalyses } from "../services/Queries";
import {InputGroup} from "react-bootstrap";
import Spinner from "react-bootstrap/esm/Spinner";
import Form from "react-bootstrap/esm/Form";
import {ButtonGroup} from "react-bootstrap";
import {ToggleButton} from "react-bootstrap";
import ButtonModalSendVideo from "../componets/ButtonModalSendVideo";

type AnalysisVideosData = {
  id: string;
  videoUrl: string;
  title: string;
  breakdown: string;
  day: string;
  date: string;
};


export default function AnalysisVideos() {
  const [search, setSearch] = useState(" ");
  const [category, setCategory] = useState("title");
  const { push } = useRouter();
  let idJSON: any;

  if (typeof window !== "undefined") {
    idJSON = sessionStorage.getItem("id");
  }

  if (idJSON === null) {
    toast("Please Login", {
      toastId: "oneTime1",
      position: "top-center",
      autoClose: 5000,
    });
    setTimeout(() => {
      console.log("Hello, World!");
    }, 2000);
    push("/login");
  } 
    console.log(idJSON);
    const myObject = JSON.parse(idJSON);

    const { isError, isSuccess, isLoading, data, error } = useQuery({
      queryKey: ["video"],
      queryFn: () => GetAnalyses(myObject.id, myObject.jwt),
      enabled: !!idJSON
    });
    if (isError) {
      toast.error("Something went wrong" + error);
      push("/");
    
    if (isSuccess) {
      console.log(data);
    }
    return (
      <>
        <Navbar />
        <ButtonModalSendVideo />

        <Form className="container p-2 mt-3">
          <InputGroup size="lg" className="my-3">
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search For Video"
            />
          </InputGroup>
          <ButtonGroup className="mb-1">
            <ToggleButton
              onClick={() => setCategory("title")}
              size="lg"
              id={"1"}
              value={"title"}
            >
              Title
            </ToggleButton>
            <ToggleButton
              onClick={() => setCategory("date")}
              size="lg"
              id={"2"}
              value={"date"}
            >
              Date
            </ToggleButton>
            <ToggleButton
              onClick={() => setCategory("breakDown")}
              size="lg"
              id={"3"}
              value={"date"}
            >
              Key Words
            </ToggleButton>
          </ButtonGroup>
        </Form>
        <Stack gap={5} className="mt-3 mb-5 container">
          {isLoading ? (
            <>
              <>
                <Row className="bg-dark rounded pt-4 pb-4">
                  <Col>
                    <Spinner animation="border" />
                  </Col>
                </Row>
                <Row className="bg-dark rounded pt-4 pb-4">
                  <Col>
                    <Spinner animation="border" />
                  </Col>
                </Row>
                <Row className="bg-dark rounded pt-4 pb-4">
                  <Col>
                    <Spinner animation="border" />
                  </Col>
                </Row>
              </>
            </>
          ) : (
            data
              .filter((item: any) => {
                return search.toLocaleLowerCase() === ""
                  ? item
                  : item[category]
                      .toLocaleLowerCase()
                      .includes(search.toLocaleLowerCase());
              })
              .map((item: any) => (
                <AnalysisVideoCard
                  key={item.analyseId}
                  videoUrl={item.videoURL}
                  title={item.title}
                  breakdown={item.breakDown}
                  day={item.day}
                  date={item.date}
                  id={item.id}
                />
              ))
          )}
        </Stack>
        <Bottomtext />
      </>
    );
  }
}
