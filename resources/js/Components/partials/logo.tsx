import { Link } from "@inertiajs/react";

const Logo = () => {
    return (
        <Link href="/" className="text-primary">
            <span className="xmd:hidden">RL</span>

            <span className="hidden xmd:block">Rural Library</span>
        </Link>
    );
};

export default Logo;
