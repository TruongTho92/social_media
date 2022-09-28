import axios from "axios";
import { UserRegisterTypes } from "~/common/types";

const API_URL = "http://localhost:3000";

export const registerUser = async (payload: UserRegisterTypes) => {
  const res = await axios.post(`${API_URL}/api/v1/sign_up`, payload);

  return res.data;
};
