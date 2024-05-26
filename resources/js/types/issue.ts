import { User } from ".";
import { Book } from "./book";
import { Date } from "./shared";

export type Issue = {
    id: number;
    borrower: User;
    book: Book;
    status: string;
    borrowed_at: Date;
    return_date: Date;
    date_returned: Date;
};
