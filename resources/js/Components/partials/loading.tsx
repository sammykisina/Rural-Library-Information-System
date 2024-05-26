import { Icons } from "./icons";


const Loading = ({ title }: { title: string }) => {
    return (
        <div className="flex items-center gap-2">
            <Icons.loader2 className="h-4 w-4 animate-spin" /> {title}
        </div>
    );
};

export default Loading;
