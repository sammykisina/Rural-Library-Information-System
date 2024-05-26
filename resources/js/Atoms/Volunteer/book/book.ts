import { Book } from "@/types/book";
import { atom } from "recoil";

// indicate edit
const isEditingBookState = atom({
    key: "isEditingBookState",
    default: false,
});

// show create / edit  book dialog
const showCreateOrEditBookDialogState = atom({
    key: "showCreateOrEditBookDialogState",
    default: false,
});

// hold current book object
const globalBookState = atom<null | Book>({
    key: "globalBookState",
    default: null,
});

const BookAtoms = {
    showCreateOrEditBookDialogState,
    isEditingBookState,
    globalBookState,
};

export default BookAtoms;
