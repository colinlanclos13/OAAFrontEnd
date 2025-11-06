import * as crypto from "crypto";

function hashEmail(): string {
  const jsonString = sessionStorage.getItem("id");
  if (jsonString === null) {
    return "boom";
  }
  const myObject = JSON.parse(jsonString);
  // Encode the email as UTF-8
  const emailBuffer = Buffer.from(myObject.email, "utf-8");

  // Compute the SHA-256 hash
  const hashBuffer = crypto.createHash("sha256").update(emailBuffer).digest();

  // Convert the hash to a hexadecimal string
  const hashHex = hashBuffer.toString("hex");

  const encodedHash = encodeURIComponent(hashHex);

  const gravatarProfile =
    "https://gravatar.com/avatar/" + encodedHash + "?s=325";
  return gravatarProfile;
}

export default hashEmail;
