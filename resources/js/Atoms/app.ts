import { Row } from "@tanstack/react-table";
import { atom } from "recoil";

// hold all selected row in data table
const selectedRowsStates = atom<{
    rows: Row<any>[];
    extraInfo?: any;
    cleanTable?: any;
} | null>({
    key: "selectedRowsStates",
    default: null,
});

const AppAtoms = {
    selectedRowsStates,
};

export default AppAtoms;
