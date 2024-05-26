import { cn } from "@/lib/utils";

const StatusPill = ({ status }: { status: string }) => {
    return (
        <span
            className={cn(
                "inline-flex items-center whitespace-nowrap rounded-md px-2.5 py-1 text-xs  font-medium capitalize ring-1 ring-inset uppercase",
                status === "awaiting return" &&
                    "bg-amber-50 text-amber-700  ring-amber-600/20",
                status === "inactive" &&
                    "bg-rose-50 text-rose-700  ring-rose-600/20",

                status === "returned" &&
                    "bg-emerald-50 text-emerald-700  ring-emerald-600/20",

                status === "available" &&
                    "bg-green-50 text-green-700 ring-green-600/20",

                status === "borrowed" &&
                    "bg-rose-50 text-rose-700  ring-rose-600/20"
            )}
        >
            {status}
        </span>
    );
};

export default StatusPill;
