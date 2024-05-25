import { Icons } from "./Components/partials/icons";

export const supervisorRouters = [
    {
        icon: <Icons.layoutDashboard className="route_icon" />,
        name: "dashboard",
        href: "/supervisor/dashboard",
    },
    {
        icon: <Icons.group className="route_icon" />,
        name: "volunteers",
        href: "/supervisor/volunteers",
    },
    {
        name: "members",
        href: "/supervisor/members",
        icon: <Icons.users className="route_icon" />,
    },
    {
        name: "books",
        href: "/supervisor/books",
        icon: <Icons.books className="route_icon" />,
    },
];

export const volunteerRouters = [
    {
        name: "Dashboard",
        href: "/volunteer/dashboard",
        icon: <Icons.layoutDashboard className="route_icon" />,
    },
    {
        name: "members",
        href: "/volunteer/members",
        icon: <Icons.group className="route_icon" />,
    },
    {
        name: "books",
        href: "/volunteer/books",
        icon: <Icons.books className="route_icon" />,
    },
];
