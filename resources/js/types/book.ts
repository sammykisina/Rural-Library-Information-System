import { Date } from "./shared";

export type Book = {
    id: number;
    isbn: string;
    title: string;
    status: string;
    author: string;
    publisher: string;
    publication_year: string;
    category: Category;
    created_at: Date;
};

export type Category = {
    id: number;
    name: string;
    created_at: Date;
};
