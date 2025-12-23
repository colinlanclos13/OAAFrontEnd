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
import { GetListOfProgramsNotLogin, GetListOfPurchasesdAndNonPurchasedPrograms } from "../services/Queries";
import { useQuery } from "@tanstack/react-query";
import Spinner from "react-bootstrap/esm/Spinner";
import ProgramRowNotLogin from "../componets/ProgramRowNotLogin";

export default function Purchase() {
  type rowData1 = {
    programId: number;
    programName: string;
    description: string;
    linkToProgram: string;
    cost: number;
  };

  type rowDataNotLogin = {
    programName: string;
    description: string;
  }

  let JWT_ID: any

  const { push } = useRouter();
  let IDjson: any;

  if (typeof window !== "undefined") {
    IDjson = sessionStorage.getItem("id");
  }

  if (IDjson === null) {
    toast("Please Login to View Purchased Programs", {
      toastId: "oneTime1",
      position: "top-center",
      autoClose: 5000,
    });
  }else{
    JWT_ID = JSON.parse(IDjson);
  }
    

    const { isError, isSuccess, isLoading, data, error } = useQuery({
      queryKey: ["purchased", IDjson],
      enabled: true,
      queryFn: () =>
        IDjson === null
          ? GetListOfProgramsNotLogin()
          : GetListOfPurchasesdAndNonPurchasedPrograms(JWT_ID.id, JWT_ID.jwt),
    });
    if (isError) {
      console.log(error);
      toast.error("Sever Error");
      push("/");
    }
    if (isSuccess) {
      console.log(data);
    }
    
    //first thing is for loading idk if this is good. Just trying things
    return (
      <>
        <Navbar />
        <div className="col">
          <Container>
            <Stack gap={5} className="mt-5 mb-5">
            {isLoading || !isSuccess || isError ? (
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
      ) : IDjson === null ? (
        data?.map((item: rowDataNotLogin) => (
          <ProgramRowNotLogin
            key={item.programName} // make sure each item has a unique key
            programName={item.programName}
            description={item.description}
          />
        ))
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

