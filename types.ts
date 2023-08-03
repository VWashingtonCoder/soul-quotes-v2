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
  ["userId"]: string;
  username: string;
  email: string;
  password: string;
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
