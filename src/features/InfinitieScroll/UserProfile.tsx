import * as React from "react";
import { useQuery } from "react-query";
import { User } from "shared/types";
import { getUsers } from "shared/network/user";

type Response = {
  info: {
    page: number;
  };
  results: User[];
};

const UserProfile = () => {
  const {} = useQuery("person", async (key) => {
    const { data } = await getUsers();
    return data.results;
  });

  return <div></div>;
};

export default UserProfile;
