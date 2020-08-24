export type User = {
  id: { name: string; value: string };
  name: { last: string; first: string; title: string };
  cell: string;
  nat: string;
  phone: string;
  gender: string;
  email: string;
  picture: {
    thumbnail: string;
    large: string;
    medium: string;
  };
};

export type UserRespone = {
  info: {
    page: number;
    version: string;
  };
  results: User[];
};
