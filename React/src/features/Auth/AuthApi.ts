import axios from "axios";
import { UserDataTypes } from "~/common/types";

export const registerUser = async (payload: UserDataTypes) => {
  try {
    const res = await axios.post(`/api/v1/sign_up`, payload);

    sessionStorage.setItem("user", JSON.stringify(res.data));

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (payload: UserDataTypes) => {
  try {
    const res = await axios.post(`/api/v1/sign_in`, payload);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
