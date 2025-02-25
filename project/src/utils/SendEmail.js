import axiosInstance from "../axios/axios";

async function sendEmail(email) {
  try {
    const response = await axiosInstance.post("users/send-email", { to: email });
    return response.status === 200 && response.data.success;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

export default sendEmail;
