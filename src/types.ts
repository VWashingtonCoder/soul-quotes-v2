export type Favorite = {
  ["id"]: number;
  uId: string;
  qId: string;
};

export type Quote = {
  ["quoteId"]: string;
  quote: string;
  author: string;
  category: string;
};

export type User = {
  ["id"]: number;
  username: string;
  email: string;
  password: string;
  favorites: string[];
};

export type ChildrenProps = {
  children: React.ReactNode;
};

export type FormValues = {
  ["quote"]: string;
  author: string;
  category: string;
};

export type FormValuesErrors = {
  [key: string]: string;
};
