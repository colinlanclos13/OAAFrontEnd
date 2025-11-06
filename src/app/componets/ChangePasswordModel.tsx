import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { ChangePassword, ReplacingPassword } from "../services/Queries";
import Row from "react-bootstrap/esm/Row";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/esm/Spinner";

type ChangePasswordData = {
  OldPassword: string;
  NewPassword: string;
  ConfirmPassword: string;
};

//change password with code from email
const schema = z
  .object({
    OldPasssword: z.string().min(1),
    NewPassword: z
      .string()
      .regex(
        new RegExp("^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!#$%&?]).*$")
      ),
    ConfirmPassword: z
      .string()
      .regex(
        new RegExp("^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!#$%&?]).*$")
      ),
  })
  .refine((data) => data.NewPassword === data.ConfirmPassword, {
    message: "Passwords Do not match",
    path: ["ConfirmPassword"],
  });

function ChangePasswordModel(props: any) {
  const { push } = useRouter();
  const jsonString = sessionStorage.getItem("id");
  let myObject : any;
  if (jsonString === null) {
    push("/login");
  } else{
     myObject = JSON.parse(jsonString);
  }
    const {
      register,
      handleSubmit,
      setError,
      formState: { errors, isSubmitting },
    } = useForm<FormFields>({ resolver: zodResolver(schema) });

    const mutation = useMutation({
      mutationFn: (data: ChangePasswordData) => {
        console.log("here");
        return ChangePassword(myObject.id, myObject.jwt, data);
      },
      onSuccess: () => {
        toast("Password Reset");
      },
      onError: (error) => {
        toast.error("Network Issue");
      },
    });

    const onSubmit: SubmitHandler<FormFields> = async (registerInput) => {
      const passwordResetData = {
        OldPassword: registerInput.OldPasssword,
        NewPassword: registerInput.NewPassword,
        ConfirmPassword: registerInput.ConfirmPassword,
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
          <form
            className="p-3 container mb-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Row className="mt-5 col-6 mx-auto">
              <label className="form-label" htmlFor="email">
                Old Password
              </label>
              <input
                className="form-control"
                {...register("OldPasssword")}
                id="OldPasssword"
                name="OldPasssword"
                type="password"
                placeholder="Old Password"
              />
              {errors.OldPasssword && (
                <div className="text-danger">
                  {errors.OldPasssword?.message}
                </div>
              )}
            </Row>
            <Row className="mt-5 col-6 mx-auto">
              <label className="form-label" htmlFor="email">
                New Password
              </label>
              <input
                className="form-control"
                {...register("NewPassword")}
                id="NewPassword"
                name="NewPassword"
                type="password"
                placeholder="New Password"
              />
              <div id="passwordHelpBlock" className="form-text">
                {" "}
                Your password must be at least 8 characters long and contain at
                least one letter, one digit, and one special character (!#$%&?)
              </div>
              {errors.NewPassword && (
                <div className="text-danger">{errors.NewPassword?.message}</div>
              )}
            </Row>
            <Row className="mt-5 col-6 mx-auto">
              <label className="form-label" htmlFor="ConfirmPassword">
                Confirm New Password
              </label>
              <input
                className="form-control"
                {...register("ConfirmPassword")}
                id="ConfirmPassword"
                name="ConfirmPassword"
                type="password"
                placeholder="Confirm New Password"
              />
              {errors.ConfirmPassword && (
                <div className="text-danger">
                  {errors.ConfirmPassword?.message}
                </div>
              )}
            </Row>
            <Row className="mt-3 col-6 mx-auto ">
              <button
                className="mt-3 btn btn-primary"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  "Submit"
                )}
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

export default ChangePasswordModel;
