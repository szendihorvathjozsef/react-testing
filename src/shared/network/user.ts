import axios from "axios";
import { UserRespone } from "shared/types";

const ENDPOINT_URL = "https://randomuser.me/api/";

export const getUsers = (page?: number, size?: number) => {
  if (!page && !size) {
    return axios.get<UserRespone>(ENDPOINT_URL);
  }
  return axios.get<UserRespone>(
    `${ENDPOINT_URL}/?page=${page}&results=${size}`
  );
};
