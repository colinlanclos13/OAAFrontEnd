"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Row from "react-bootstrap/esm/Row";
import { zodResolver } from "@hookform/resolvers/zod";
import { requestToRegister } from "../services/Queries";
import { useMutation, QueryClient, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { error } from "console";

type registerData = {
  Name: string;
  age: number;
  Email: string;
  Phone: number;
  Password: string;
};

const schema = z
  .object({
    Name: z.string().min(1),
    age: z.coerce
      .number()
      .gt(0, { message: "Invalid Age" })
      .lt(120, { message: "Invalid Age" }),
    email: z.string().email({ message: "Invalid email address" }),
    confirmEmail: z.string().email({ message: "Invalid email address" }),
    phoneNum: z.coerce
      .number()
      .gt(999999999, { message: "Invalid Number" })
      .lt(100000000000, { message: "Invalid Number" }),
    /*set a lable for the password so the user knows what they can and cannot put*/
    password: z
      .string()
      .regex(
        new RegExp("^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!#$%&?]).*$")
      ),
    confirmPassword: z
      .string()
      .regex(
        new RegExp("^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!#$%&?]).*$")
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords Do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Emails Do not match",
    path: ["confirmEmail"],
  });

type FormFields = z.infer<typeof schema>;

//register component
function FormExample() {
  const { push } = useRouter();

  const mutation = useMutation({
    mutationFn: (data: registerData) => {
      return requestToRegister(data);
    },
    onSuccess: () => {
      toast("Sing Up");
      push("/login");
    },
    onError: (data) => {
      toast.error("Email Already Taken");
    },
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormFields> = async (registerInput) => {
    const registerData = {
      Name: registerInput.Name,
      age: registerInput.age,
      Email: registerInput.email,
      Phone: registerInput.phoneNum,
      Password: registerInput.password,
    };
    console.log(registerData);
    mutation.mutate(registerData);
  };

  return (
    <form
      className="container col-10 p-3 mt-3 mb-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Row className="col-8 mx-auto">
        <h4>Register</h4>
        <label className="form-label" htmlFor="email">
          Email
        </label>
        <input
          className="form-control"
          {...register("email")}
          id="email"
          name="email"
          type="text"
          placeholder="Email"
        />
        {errors.email && (
          <div className="text-danger">{errors.email.message}</div>
        )}
      </Row>
      <Row className="mt-3 col-8 mx-auto">
        <label className="form-label" htmlFor="email">
          Confirm Email
        </label>
        <input
          className="form-control"
          {...register("confirmEmail")}
          id="confirmEmail"
          name="confirmEmail"
          type="confirmEmail"
          placeholder="Confirm Email"
        />
        {errors.confirmEmail && (
          <div className="text-danger">{errors.confirmEmail.message}</div>
        )}
      </Row>
      <Row className="mt-3 col-8 mx-auto">
        <label className="form-label" htmlFor="Name">
          First and Last Name
        </label>
        <input
          className="form-control"
          {...register("Name")}
          id="firstName"
          type="text"
          placeholder="First and Last Name"
        />
        {errors.Name && (
          <div className="text-danger">{errors.Name.message}</div>
        )}
      </Row>
      <Row className="mt-3 col-8 mx-auto">
        <label className="form-label" htmlFor="age">
          Age
        </label>
        <input
          className="form-control"
          {...register("age")}
          id="age"
          type="number"
          placeholder="Age"
        />
        {errors.age && <div className="text-danger">{errors.age.message}</div>}
      </Row>
      <Row className="mt-3 col-8 mx-auto">
        <label className="form-label" htmlFor="phoneNum">
          Phone Number
        </label>
        <input
          className="form-control"
          {...register("phoneNum")}
          id="phoneNum"
          type="number"
          placeholder="(XXX)XXX-XXXX"
        />
        {errors.phoneNum && (
          <div className="text-danger">{errors.phoneNum.message}</div>
        )}
      </Row>
      <Row className="mt-3 col-8 mx-auto">
        <label className="form-label" htmlFor="password">
          Password
        </label>
        <input
          className="form-control"
          {...register("password")}
          id="password"
          type="password"
          placeholder="Password"
        />
        <div id="passwordHelpBlock" className="form-text">
          {" "}
          Your password must be at least 8 characters long and contain at least
          one letter, one digit, and one special character (!#$%&?)
        </div>
        {errors.password && (
          <div className="text-danger">{errors.password.message}</div>
        )}
      </Row>
      <Row className="mt-3 col-8 mx-auto">
        <label className="form-label" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          className="form-control"
          {...register("confirmPassword")}
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && (
          <div className="text-danger">{errors.confirmPassword.message}</div>
        )}
      </Row>
      <Row className="mt-3 col-8 mx-auto ">
        <button
          className="mt-3 btn btn-primary"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "loading..." : "Submit"}
        </button>
      </Row>
      {errors.root && (
        <div className="text-danger mx-auto">{errors.root.message}</div>
      )}
    </form>
  );
}

export default FormExample;
