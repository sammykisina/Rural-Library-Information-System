import { User } from "@/types";
import { atom } from "recoil";

// indicate edit
const isEditingVolunteerState = atom({
    key: "isEditingVolunteerState",
    default: false,
});

// show create / edit  volunteer dialog
const showCreateOrEditVolunteerDialogState = atom({
    key: "showCreateOrEditVolunteerDialogState",
    default: false,
});

// hold current volunteer object
const globalVolunteerState = atom<null | User>({
    key: "globalVolunteerState",
    default: null,
});

const VolunteerAtoms = {
    showCreateOrEditVolunteerDialogState,
    isEditingVolunteerState,
    globalVolunteerState,
};

export default VolunteerAtoms;
