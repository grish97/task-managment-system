
declare module "@router" {
    import { ElementType } from "react";

    interface IRoute {
        component: ElementType;
        path: string;
    }
}