import { badgeVariants } from "@/Components/ui/badge";
import { cn } from "@/lib/utils";
import {
    Bar,
    BarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

type BookCategoryDistributionProps = {
    bookCategoryDistributions: { name: string; total: number }[];
};

const CustomTooltip = ({
    active,
    payload,
    label,
}: {
    active?: boolean;
    payload: any;
    label: string;
}) => {
    if (active && payload && payload.length) {
        return (
            <div
                className={cn(
                    "custom-tooltip",
                    badgeVariants({
                        variant: "secondary",
                    })
                )}
            >
                <p className="label bg-transparent">{`${label} : ${payload[0].value} Books`}</p>
            </div>
        );
    }

    return null;
};

const BookCategoryDistribution: React.FC<BookCategoryDistributionProps> = ({
    bookCategoryDistributions,
}) => {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart
                data={
                    bookCategoryDistributions?.length > 0
                        ? bookCategoryDistributions
                        : []
                }
            >
                <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                    content={({ active, payload, label }) => (
                        <CustomTooltip
                            active={active}
                            payload={payload}
                            label={label}
                        />
                    )}
                />

                <Bar dataKey="total" fill="#16AC3D" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BookCategoryDistribution;
