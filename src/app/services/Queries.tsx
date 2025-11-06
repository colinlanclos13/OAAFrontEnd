"use client";

import axios from "axios";

type loginData = {
  Email: string;
  PasswordAttempt: string;
};

type emailVideoInfo = {
  subject: string;
  discrition: string;
  video: FileList;
};

type updatePlayerDataData = {
  name: string;
  age: number;
  phone: number;
};

type purchaseValid = {
  id: number;
};

type registerData = {
  Name: string;
  age: number;
  Email: string;
  Phone: number;
  Password: string;
};

type ChangePasswordData = {
  OldPassword: string;
  NewPassword: string;
  ConfirmPassword: string;
};

type purchaseData = {
  id: any;
  orderId: string;
  jwt: any;
  programid: any;
  cost: any;
};

type PasswordReset = {
  email: string;
  passwordResetToken: string;
  newPassword: string;
  confirmPassword: string;
};

//register page
export const requestToRegister = async (data: registerData) => {
  const response = await axios.post(
    "http://localhost:5222/api/athlete/register",
    data,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response);
  console.log("boory cheeks");
  return response.data;
};
//login
export const requestToLogin = async (data: loginData) => {
  const response = await axios.post(
    "http://localhost:5222/api/athlete/login",
    data,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response.data);
  return response.data;
};
//purchase a product
export const purchaseProduct = async (param: purchaseData) => {
  const dataToPurchase = {
    athleteId: param.id,
    programId: param.programid,
    orderId: param.orderId,
    cost: param.cost,
  };
  console.log("made it here lol lol");
  console.log({ param });
  const response = await axios.post(
    "http://localhost:5222/api/programathlete/createProgramAthlete",
    dataToPurchase,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Content-Type": "application/json",
        Authorization: `Bearer ${param.jwt}`,
      },
    }
  );
  console.log(response);
  return response;
};

//useless
export const alreadyPurchased = async (id: string, tokenStr: string) => {
  const programId = 1;
  console.log(tokenStr);
  const response = await axios.get(
    "http://localhost:5222/api/programathlete/validatePurchase/" +
      programId +
      "/" +
      id,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenStr}`,
      },
    }
  );
  console.log(response.data);
  if (response.data) {
    return true;
  }
  return response;
};

//send email to
export const SendEmailToApi = async (email: string) => {
  sessionStorage.setItem("email", email);
  const response = await axios.get(
    "http://localhost:5222/api/athlete/passwordResetRequest/" + email,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Content-Type": "application/json",
        //Authorization: `Bearer ${tokenStr}`,
      },
    }
  );
  console.log(response.data);
  if (response.data) {
    return true;
  }
  return false;
};
//replace password with code from email
export const ReplacingPassword = async (passwordResetData: PasswordReset) => {
  const response = await axios.post(
    "http://localhost:5222/api/athlete/passwordReset",
    passwordResetData,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response.data);
  if (response.data) {
    return true;
  }
  return response;
};
//get list for purchase page and create rows
export const GetListOfPurchasesdAndNonPurchasedPrograms = async (
  id: string,
  tokenStr: string
) => {
  const response = await axios.get(
    "http://localhost:5222/api/programathlete/getProgramsPurchasedWithAthleteId/" +
      id,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenStr}`,
      },
    }
  );
  console.log(response.data);
  return response.data;
};

//get profile information
export const GetProfileInformation = async (id: string, tokenStr: string) => {
  const response = await axios.get(
    "http://localhost:5222/api/athlete/byId/" + id,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenStr}`,
      },
    }
  );
  console.log(response.data);
  return response.data;
};

//change password with old passowrd
export const ChangePassword = async (
  id: string,
  tokenStr: string,
  data: ChangePasswordData
) => {
  console.log("here");
  const response = await axios.post(
    "http://localhost:5222/api/athlete/updatePasswords/" + id,
    data,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenStr}`,
      },
    }
  );
  console.log(response.data);
  return response.data;
};

//change password with old passowrd
export const UpdateUserInformation = async (
  id: string,
  tokenStr: string,
  data: updatePlayerDataData
) => {
  const response = await axios.post(
    "http://localhost:5222/api/athlete/updatePlayerData/" + id,
    data,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenStr}`,
      },
    }
  );
  console.log(response.data);
  return response.data;
};

//getting video analyses
export const GetAnalyses = async (id: string, tokenStr: string) => {
  const response = await axios.get(
    "http://localhost:5222/api/analyse/id/" + id,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenStr}`,
      },
    }
  );
  console.log(response.data);
  return response.data;
};

//getting video analyses
export const SendVideoRequest = async (
  id: string,
  tokenStr: string,
  data: any
) => {
  console.log("second boom");

  var formData = new FormData();
  formData.append("file", data.video);

  const encodedSubject = encodeURIComponent(data.subject);
  const encodedDescription = encodeURIComponent(data.discription);
  console.log("bomba clat");
  const url =
    "http://localhost:5222/api/athlete/sendvideo/" +
    id +
    "/" +
    encodedSubject +
    "/" +
    encodedDescription;
  const response = await axios.post(url, formData, {
    headers: {
      accept: "*/*",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${tokenStr}`,
    },
  });
  console.log(response.data);
  return response.data;
};
