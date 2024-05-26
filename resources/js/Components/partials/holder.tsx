import { Icons } from "./icons";

const Holder = () => {
    return (
        <div className="h-screen flex items-center justify-center">
            <Icons.loader2 className="h-4 w-4 animate-spin" />
        </div>
    );
};

export default Holder;
