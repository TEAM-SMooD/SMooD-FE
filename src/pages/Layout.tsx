import React, { ReactNode } from "react";
import Header from "../components/Header";

interface LayoutChildrenProps {
    children: ReactNode;
    idx: number;
}
const Layout = (props: LayoutChildrenProps) => {
    return (
        <>
            <Header idx={props.idx} />
            <div style={{ paddingTop: "70px" }}>{props.children}</div>
        </>
    );
};
export default Layout;
