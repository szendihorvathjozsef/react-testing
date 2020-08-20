export interface FormState {
  first: FirstStage;
  second: SecondStage;
}

export type FirstStage = {
  lastName: string | null;
  firstName: string | null;
  gender: string;
  birthday: Date | string;
};

export type SecondStage = {
  city: string;
  region: string;
  zipCode: string;
  address: string;
};
