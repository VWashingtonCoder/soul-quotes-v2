export interface Favorite {
  ["id"]: number;
  uId: string;
  qId: string;
}

export interface Quote {
  ["quoteId"]: string;
  quote: string;
  author: string;
  category: string;
}

export interface User {
  ["id"]: number;
  username: string;
  email: string;
  password: string;
  favorites: string[];
}

export type ChildrenProps = {
  children: React.ReactNode;
};

export interface FormValues {
  [key: string]: string;
}

export interface FormErrors {
  [key: string]: string | undefined;
}

type FormInput = {
  name: string;
  label: string;
  type: string;
  placeholder: string;
};

export type FormInputs = {
  [key: string]: FormInput[] | [];
};
