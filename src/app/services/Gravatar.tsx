import axios from "axios";

export const SendPictureToGravatar = async (email: string) => {
  const response = await axios.get(
    "http://localhost:5222/api/athlete/register" + hashEmail(email),
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response);
  return response.data;
};

import * as crypto from "crypto";

function hashEmail(email: string): string {
  // Encode the email as UTF-8
  const emailBuffer = Buffer.from(email, "utf-8");

  // Compute the SHA-256 hash
  const hashBuffer = crypto.createHash("sha256").update(emailBuffer).digest();

  // Convert the hash to a hexadecimal string
  const hashHex = hashBuffer.toString("hex");

  return hashHex;
}
