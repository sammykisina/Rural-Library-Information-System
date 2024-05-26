import { User } from "@/types";
import { atom } from "recoil";

// indicate edit
const isEditingMemberState = atom({
    key: "isEditingMemberState",
    default: false,
});

// show create / edit  member dialog
const showCreateOrEditMemberDialogState = atom({
    key: "showCreateOrEditMemberDialogState",
    default: false,
});

// hold current member object
const globalMemberState = atom<null | User>({
    key: "globalMemberState",
    default: null,
});

const MemberAtoms = {
    showCreateOrEditMemberDialogState,
    isEditingMemberState,
    globalMemberState,
};

export default MemberAtoms;
