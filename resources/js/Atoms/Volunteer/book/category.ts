import { Category } from "@/types/book";
import { atom } from "recoil";

// indicate edit
const isEditingCategoryState = atom({
    key: "isEditingCategoryState",
    default: false,
});

// show create / edit  category dialog
const showCreateOrEditCategoryDialogState = atom({
    key: "showCreateOrEditCategoryDialogState",
    default: false,
});

// hold current category object
const globalCategoryState = atom<null | Category>({
    key: "globalCategoryState",
    default: null,
});

const CategoryAtoms = {
    showCreateOrEditCategoryDialogState,
    isEditingCategoryState,
    globalCategoryState,
};

export default CategoryAtoms;
