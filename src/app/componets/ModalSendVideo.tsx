import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify";
import * as yup from "yup";
import { useState } from "react";
import Stack from "react-bootstrap/esm/Stack";
import Row from "react-bootstrap/esm/Row";
import SendVideo from "../services/Email";
import { SendVideoRequest } from "../services/Queries";
import { useMutation } from "@tanstack/react-query";

type emailVideoInfo = {
  subject: string;
  discrition: string;
  video: File;
};
function ModalSendVideo(props: any) {
  interface IFormInput {
    name: string;
    discription: string;
    videoFile: File;
  }

  const [file, setFile] = useState<File | null>(null);
  const [topBigErr, setTopBigErr] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    discription: yup.string().required("Small Discrition is Required"),
    videoFile: yup.mixed<File>().required("You need to provide video"),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile || null);
    console.log(file);
  };

  const mutation = useMutation({
    mutationFn: (data: any) => {
      console.log("baang");
      console.log(data);
      return SendVideoRequest(data.id, data.jwt, data);
    },
    onSuccess: () => {
      toast("Sent In Video");
    },
    onError: (data) => {
      toast.error("Error On Our End");
    },
  });

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });

  const onSubmit = (data: any) => {
    const jsonString = sessionStorage.getItem("id");
    if (jsonString === null) {
      return;
    } else {
      setTopBigErr(false);
      const myObject = JSON.parse(jsonString);
      console.log(data);
      const dataInfo = {
        subject: data.name,
        discription: data.discription,
        video: file,
        id: myObject.id,
        jwt: myObject.jwt,
      };
      console.log(dataInfo);
      if (file == undefined) {
        toast.error("Include File");
      } else if (file.size >= 25000000) {
        setTopBigErr(true);
      } else {
        mutation.mutate(dataInfo);
      }
    }
  };

  return (
    <Modal
      {...props}
      backdrop="static"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Send In Video
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4 className="fw-bold">Please fill out</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <Row>
              <label htmlFor="name">Name</label>
              <input className="form-control" {...register("name")} />
              {errors.name && <p>{errors.name.message}</p>}
            </Row>
            <Row>
              <label htmlFor="discription">Small Discription</label>
              <textarea
                className="form-control"
                {...register("discription")}
              ></textarea>
              {errors.discription && <p>{errors.discription.message}</p>}
            </Row>
            <Row>
              <div className="custom-file mt-2">
                <input
                  className="custom-file-input"
                  id="customFile"
                  {...register("videoFile")}
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
              {errors.videoFile && <p>{errors.videoFile.message}</p>}
              {topBigErr && <p className="text-danger">File is to Large</p>}
            </Row>
            <Row className="mt-2">
              {mutation.isPending ? (
                <button className="btn btn-primary" type="button" disabled>
                  <span
                    className="spinner-grow spinner-grow-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </button>
              ) : (
                <button className="btn btn-primary">Submit</button>
              )}
            </Row>
          </Stack>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalSendVideo;
