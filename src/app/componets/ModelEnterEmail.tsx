import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import Form from "react-bootstrap/esm/Form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { SendEmailToApi } from "../services/Queries";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import ResetPasswordModal from "./ModelResetPassword";

//enter in email so send email to user
function MyVerticallyCenteredModal(props: any) {
  const [modalShow, setModalShow] = useState(true);
  const [show, setShow] = useState(false);
  const mutation = useMutation({
    mutationFn: (data: string) => {
      return SendEmailToApi(data);
    },
    onError: (data) => {
      alert(data);
      const element = document.getElementById("resetsubmitbutton");
      element?.classList.remove("disabled");
    },
    onSuccess: (data) => {
      setShow(true);
    },
  });
  if (mutation.isPending) {
    const element = document.getElementById("resetsubmitbutton");
    element?.classList.add("disabled");
    //return <span>Loading...</span>;
  }
  const schema = z.object({
    Email: z.string().email(),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  type FormFields = z.infer<typeof schema>;
  //handles data
  const onSubmit: SubmitHandler<FormFields> = async (loginData) => {
    setModalShow(false);
    mutation.mutate(loginData.Email);
  };

  return (
    <>
      <Modal
        {...props}
        show={props.show && modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Enter Email
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="p-3 container mb-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                Email Address
              </label>
              <input
                {...register("Email")}
                type="email"
                className="form-control"
                id="Email"
                aria-describedby="emailHelp"
              />
              {errors.Email && (
                <div className="text-danger">{errors.Email.message}</div>
              )}
            </div>
            <button
              id="resetsubmitbutton"
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
      <ResetPasswordModal
        show={show}
        onHide={() => {
          setShow(false);
          sessionStorage.clear();
        }}
      />
    </>
  );
}

export default MyVerticallyCenteredModal;
