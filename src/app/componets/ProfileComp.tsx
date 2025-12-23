import React, { useEffect, useRef, useState } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { GetProfileInformation } from "../services/Queries";
import { useRouter } from "next/navigation";
import Spinner from "react-bootstrap/esm/Spinner";
import Button from "react-bootstrap/esm/Button";
import ChangePasswordModel from "./ChangePasswordModel";
import ModalUpdatePlayer from "./ModelUpdatePlayer";
import ChangeAvator from "./ChangeAvatar";
import { toast } from "react-toastify";
import hashEmail from "../services/CreateHash";
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";
import Tooltip from "react-bootstrap/esm/Tooltip";

//profile page
function ProfileComp() {
  const { push } = useRouter();
  const jsonString = sessionStorage.getItem("id");
  const renderTooltip = (thing: any) => (
    <Tooltip id="button-tooltip" {...thing}>
      Use Gravator for easy to Upload Profile Pictures
    </Tooltip>
  );
  let myObject: any;
  if (jsonString === null) {
    push("/login");
  } else {
     myObject = JSON.parse(jsonString);
  }
    const { isError, isSuccess, isLoading, data, error } = useQuery({
      queryKey: ["profile"],
      queryFn: () => GetProfileInformation(myObject.id, myObject.jwt),
      enabled: !!jsonString
    });
    if (isError) {
    }
    if (isSuccess) {
      const profileData = data;
    }
    const [modalShow1, setModalShow1] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);

    return (
      <>
        {isLoading ? (
          <div>
            {" "}
            <div className="card mb-3 mt-3">
              <div className="row g-0">
                <div className="col-lg-4">
                  <img
                    src="https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109"
                    className="img-fluid"
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <p className="card-text fw-bold">
                      <Spinner animation="border" variant="danger" />
                    </p>
                    <p className="card-text">
                      Age: <Spinner animation="border" variant="danger" />
                    </p>
                    <p className="card-text">
                      Phone: <Spinner animation="border" variant="danger" />
                    </p>
                    <p className="card-text">
                      <small className="text-muted">
                        Last updated 3 mins ago
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {" "}
            <div className="card mb-3 mt-3 container p-5 ">
              <div className="row g-0">
                <div className="col-lg-4">
                  <img src={hashEmail()} className="img-fluid" alt="..." />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <p className="card-text fw-bold">{data.name}</p>
                    <p className="card-text">Age: {data.age}</p>
                    <p className="card-text">Phone: {data.phone}</p>
                    <p className="card-text">Phone: {data.email}</p>
                    <p className="card-text"> Password: *******</p>
                    <Button
                      variant="primary"
                      className="me-1"
                      onClick={() => setModalShow1(true)}
                    >
                      Reset Password
                    </Button>
                    <ChangePasswordModel
                      show={modalShow1}
                      onHide={() => {
                        setModalShow1(false);
                      }}
                    />
                    <Button
                      variant="primary"
                      onClick={() => setModalShow2(true)}
                      className="me-1"
                    >
                      Update Athlete Information
                    </Button>
                    <ModalUpdatePlayer
                      show={modalShow2}
                      onHide={() => setModalShow2(false)}
                      name={data.name}
                      phone={data.phone}
                      age={data.age}
                      email={data.email}
                    />
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip}
                    >
                      <Button href="https://gravatar.com/" target="_blank">
                        Upload Or Update Profile Pick
                      </Button>
                    </OverlayTrigger>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
}

/*
<Button
                      variant="primary"
                      onClick={() => setModalShow3(true)}
                    >
                      Update Profile Picture
                    </Button>
                    <ChangeAvator
                      show={modalShow3}
                      onHide={() => {
                        setModalShow3(false), toast("boom");
                      }}

*/

export default ProfileComp;
