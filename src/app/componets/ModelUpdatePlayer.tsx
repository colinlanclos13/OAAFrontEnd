import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { ReplacingPassword, UpdateUserInformation } from "../services/Queries";
import Row from "react-bootstrap/esm/Row";
import { Schema } from "yup";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/esm/Spinner";

function ModalUpdatePlayer(props: any) {
  type updatePlayerDataData = {
    name: string;
    age: number;
    phone: number;
  };

  const schema = z.object({
    name: z.string().min(1),
    age: z.coerce.number().gt(0).lt(120),
    phoneNum: z.coerce
      .number()
      .gt(999999999, { message: "Invalid Number" })
      .lt(100000000000, { message: "Invalid Number" }),
  });

  let IDjson: any;

  if (typeof window !== "undefined") {
    IDjson = sessionStorage.getItem("id");
  }
  const myObject = JSON.parse(IDjson);

  const mutation = useMutation({
    mutationFn: (data: updatePlayerDataData) => {
      return UpdateUserInformation(myObject.id, myObject.jwt, data);
    },
    onSuccess: () => {
      props.onHide();
      toast.success("Updated Profile");
    },
    onError: (data) => {
      toast.error("Sever Error");
    },
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormFields> = async (registerInput) => {
    const passwordResetData = {
      name: registerInput.name,
      age: registerInput.age,
      phone: registerInput.phoneNum,
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
          Update Athlete&apos;s Information
      </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          className="p-3 container mb-5 bg-primary-subtle rounded"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Row className=" col-6 mx-auto">
            <label className="form-label" htmlFor="email">
              Name
            </label>
            <input
              className="form-control"
              {...register("name")}
              id="name"
              name="name"
              type="string"
              placeholder="Name"
              defaultValue={props.name}
            />
            {errors.name && (
              <div className="text-danger">{errors.name?.message}</div>
            )}
          </Row>
          <Row className="mt-3 col-6 mx-auto">
            <label className="form-label" htmlFor="email">
              Age
            </label>
            <input
              className="form-control"
              {...register("age")}
              id="age"
              name="age"
              type="number"
              placeholder="Age"
              defaultValue={props.age}
            />
            {errors.age && (
              <div className="text-danger">{errors.age?.message}</div>
            )}
          </Row>
          <Row className="mt-3 col-6 mx-auto">
            <label className="form-label" htmlFor="email">
              Phone
            </label>
            <input
              className="form-control"
              {...register("phoneNum")}
              id="phoneNum"
              name="phoneNum"
              type="number"
              placeholder="phoneNum"
              defaultValue={props.phone}
            />
            {errors.phoneNum && (
              <div className="text-danger">{errors.phoneNum?.message}</div>
            )}
          </Row>
          <Row className="mt-3 col-6 mx-auto ">
            <button
              className="mt-3 btn btn-primary"
              disabled={mutation.isPending}
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
        <Button onClick={props.onHide} disabled={mutation.isPending}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalUpdatePlayer;
