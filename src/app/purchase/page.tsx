"use client";
import Bottomtext from "../componets/Bottomtext";
import Navbar from "../componets/Navbar";
import BasicExample from "../componets/Register";
import FormExample from "../componets/Register";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import "../styles.scss";
import Checkout from "../componets/PayPal";
import Product from "../componets/Product";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ProgramRow from "../componets/ProgramRow";
import Stack from "react-bootstrap/esm/Stack";
import Container from "react-bootstrap/esm/Container";
import { GetListOfPurchasesdAndNonPurchasedPrograms } from "../services/Queries";
import { useQuery } from "@tanstack/react-query";
import Spinner from "react-bootstrap/esm/Spinner";

export default function Purchase() {
  type rowData1 = {
    programId: number;
    programName: string;
    description: string;
    linkToProgram: string;
    cost: number;
  };

  let myObject: any

  const { push } = useRouter();
  let jsonString: any;

  if (typeof window !== "undefined") {
    jsonString = sessionStorage.getItem("id");
  }

  if (jsonString === null) {
    toast("Please Login", {
      toastId: "oneTime1",
      position: "top-center",
      autoClose: 5000,
    });
    setTimeout(() => {
      console.log("Hello, World!");
    }, 2000);
    push("/login");
  }else{
    myObject = JSON.parse(jsonString);
  }
    

    const { isError, isSuccess, isLoading, data, error } = useQuery({
      queryKey: ["purchased"],
      enabled: !!jsonString,
      queryFn: () =>
        GetListOfPurchasesdAndNonPurchasedPrograms(myObject.id, myObject.jwt),
    });
    if (isError) {
      console.log(error);
      toast.error("Sever Error");
      push("/");
    }
    if (isSuccess) {
      console.log(data);
    }
    const rowData2 = [
      {
        programId: 1,
        programName: "Program A",
        description: "This is Program A description.",
        linkToProgram: "https://example.com/program-a",
      },
      {
        programId: 2,
        programName: "Program B",
        description: "This is Program B description.",
        linkToProgram: "https://pdflink.to/38a064c4/",
      },
      // Add more objects as needed
    ];
    //first thing is for loading idk if this is good. Just trying things
    return (
      <>
        <Navbar />
        <div className="col">
          <Container>
            <Stack gap={5} className="mt-5 mb-5">
              {isLoading || !isSuccess || isError ? (
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
                data?.map((item: rowData1) => (
                  <ProgramRow
                    key={item.programId}
                    programId={item.programId}
                    programName={item.programName}
                    description={item.description}
                    linkToProgram={item.linkToProgram}
                    cost={item.cost}
                  />
                ))
              )}
            </Stack>
          </Container>
        </div>
        <div className="mt-auto">
          <Bottomtext />
        </div>
      </>
    );
  }

