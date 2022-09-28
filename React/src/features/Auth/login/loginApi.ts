import axios from "axios";
import { UserLoginTypes } from "~/common/types";

const API_URL = "http://localhost:4001";

export const loginUser = async (payload: UserLoginTypes) => {
  const res = await axios.post(`${API_URL}/api/v1/login`, {
    headers: { "Content-Type": "application/json" },
    body: payload,
  });
  return res.data;
};
