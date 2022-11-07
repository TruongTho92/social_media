import Cookies from "js-cookie";

export const variables = {
  token: JSON.parse(Cookies.get("access_token") || ""),
};
