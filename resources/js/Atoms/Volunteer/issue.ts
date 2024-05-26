import { Issue } from "@/types/issue";
import { atom } from "recoil";

// show create / edit  issue dialog
const showCreateIssueDialogState = atom({
    key: "showCreateIssueDialogState",
    default: false,
});

// hold current issue object
const globalIssueState = atom<null | Issue>({
    key: "globalIssueState",
    default: null,
});

const IssueAtoms = {
    showCreateIssueDialogState,
    globalIssueState,
};

export default IssueAtoms;
