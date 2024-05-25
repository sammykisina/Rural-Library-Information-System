import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ToastProvider } from "./Components/ui/toast";
import { RecoilRoot } from "recoil";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ToastProvider>
                <RecoilRoot>
                    <App {...props} />
                </RecoilRoot>
            </ToastProvider>
        );
    },
    progress: {
        color: "#5C8BC9",
    },
});
