export type Favorite = {
    ["favId"]: number;
    uId: string;
    qId: string;
}

export type Quote = {
    ["quoteId"]: string;
    quote: string;
    author: string;
    category: string;
    creatorId: string;
}

export type User = {
    ["userId"]: string;
    username: string;
    email: string;
    password: string;
}