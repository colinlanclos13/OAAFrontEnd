"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { SubmitHandler, set, useForm } from "react-hook-form";
import { z } from "zod";
import Row from "react-bootstrap/esm/Row";
import { zodResolver } from "@hookform/resolvers/zod";
import { requestToLogin } from "../services/Queries";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import MyVerticallyCenteredModal from "./ModelEnterEmail";
import Button from "react-bootstrap/esm/Button";
import Stack from "react-bootstrap/esm/Stack";

type loginData = {
  Email: string;
  PasswordAttempt: string;
};
//login form
function LoginForm() {
  const [modalShow, setModalShow] = React.useState(false);
  const { push } = useRouter();
  //checks for errors with input
  const schema = z.object({
    Email: z.string().email(),
    /*set a lable for the password so the user knows what they can and cannot put*/
    PasswordAttempt: z
      .string()
      .regex(
        new RegExp("^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!#$%&?]).*$"),
        {
          message: "Invalid Password",
        }
      ),
  });

  //calling api with react query
  const mutation = useMutation({
    mutationFn: (data: loginData) => {
      return requestToLogin(data);
    },
    onError: (data) => {
      alert(data);
      const element = document.getElementById("submitbutton");
      element?.classList.remove("disabled");
    },
    onSuccess: (data) => {
      console.log(data);
      sessionStorage.setItem("id", JSON.stringify(data));
      push("/");
    },
  });
  if (mutation.isPending) {
    const element = document.getElementById("submitbutton");
    element?.classList.add("disabled");
    //return <span>Loading...</span>;
  }

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  type FormFields = z.infer<typeof schema>;

  //when you click sumbit this handles data
  const onSubmit: SubmitHandler<FormFields> = async (loginData) => {
    localStorage.setItem("email", loginData.Email);
    mutation.mutate(loginData);
  };

  return (
    <div className="col container w-100 d-flex justify-content-center g-3 mt-3">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="d-flex justify-content-center align-items-center">
          <img
            src="/imgs/OAA_Logos/cropped_OAALOGO.PNG"
            className="img-fluid"
            style={{ maxWidth: "300px", height: "auto" }}
            alt="Logo"
          />
        </div>
        <div className="row justify-content-center align-items-center">
          <form
            className="p-3 mb-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h5>Login</h5>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                Email address
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

            <div className="mb-3">
              <label htmlFor="Password" className="form-label">
                Password
              </label>
              <input
                {...register("PasswordAttempt")}
                type="password"
                className="form-control"
                id="Password"
              />
              {errors.PasswordAttempt && (
                <div className="text-danger">
                  {errors.PasswordAttempt.message}
                </div>
              )}
            </div>
            <Stack direction="horizontal" gap={3}>
              <div>
                <button
                  id="submitbutton"
                  type="submit"
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>
              <div>
                <Button variant="primary" onClick={() => setModalShow(true)}>
                  Reset Password
                </Button>
              </div>
            </Stack>
          </form>
        </div>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          console.log(modalShow);
        }}
      />
    </div>
  );
}

export default LoginForm;
