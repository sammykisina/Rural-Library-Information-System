import { Date } from "./shared";

export interface User {
    id: number;
    name: string;
    ic_no: string;
    email: string;
    email_verified_at: string;
    role: "supervisor" | "volunteer" | "member";
    address: string;
    phone: string;
    created_at: Date;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
