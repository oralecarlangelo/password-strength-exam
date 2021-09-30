import axios from "axios";

export const fetchPasswordStrength = (password: string) => {
  return axios.post(
    "https://o9etf82346.execute-api.us-east-1.amazonaws.com/staging/password/strength",
    { password }
  );
};
