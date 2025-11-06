import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { ReplacingPassword } from "../services/Queries";
import Row from "react-bootstrap/esm/Row";

type PasswordReset = {
  Email: string;
  PasswordResetToken: string;
  NewPassword: string;
  ConfirmPassword: string;
};

const schema = z
  .object({
    PasswordResetToken: z.string().min(1),
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
  });

//resetting password
function ResetPasswordModal(props: any) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const mutation = useMutation({
    mutationFn: (data: any) => {
      return ReplacingPassword(data);
    },
    onSuccess: () => {
      alert("Password Reset");
      //push("/login");
    },
    onError: () => {
      alert("Network Issue");
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (registerInput) => {
    const email = sessionStorage.getItem("email");
    const passwordResetData = {
      Email: email,
      PasswordResetToken: registerInput.PasswordResetToken,
      NewPassword: registerInput.password,
      ConfirmPassword: registerInput.confirmPassword,
    };
    console.log(passwordResetData);
    mutation.mutate(passwordResetData);
  };

  type FormFields = z.infer<typeof schema>;
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
          Reset Password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="p-3 container mb-5" onSubmit={handleSubmit(onSubmit)}>
          <Row className="mt-5 col-6 mx-auto">
            <label className="form-label" htmlFor="email">
              Password Reset Token (From Email)
            </label>
            <input
              className="form-control"
              {...register("PasswordResetToken")}
              id="PasswordResetToken"
              name="PasswordResetToken"
              type="text"
              placeholder="Token"
            />
            {errors.PasswordResetToken && (
              <div className="text-danger">
                {errors.PasswordResetToken?.message}
              </div>
            )}
          </Row>
          <Row className="mt-5 col-6 mx-auto">
            <label className="form-label" htmlFor="email">
              New Password
            </label>
            <input
              className="form-control"
              {...register("password")}
              id="password"
              name="password"
              type="text"
              placeholder="New Password"
            />
            <div id="passwordHelpBlock" className="form-text">
              {" "}
              Your password must be at least 8 characters long and contain at
              least one letter, one digit, and one special character (!#$%&?)
            </div>
            {errors.password && (
              <div className="text-danger">{errors.password?.message}</div>
            )}
          </Row>
          <Row className="mt-5 col-6 mx-auto">
            <label className="form-label" htmlFor="email">
              Confirm New Password
            </label>
            <input
              className="form-control"
              {...register("confirmPassword")}
              id="confirmPassword"
              name="confirmPassword"
              type="text"
              placeholder="Confirm New Password"
            />
            {errors.confirmPassword && (
              <div className="text-danger">
                {errors.confirmPassword?.message}
              </div>
            )}
          </Row>
          <Row className="mt-3 col-6 mx-auto ">
            <button
              className="mt-3 btn btn-primary"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "loading..." : "Submit"}
            </button>
          </Row>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ResetPasswordModal;
