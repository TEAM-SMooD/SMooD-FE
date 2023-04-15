import React, { ReactNode } from "react";
import { STtitle, STcontentWrap } from "../styles/ReportLayoutST";

interface ReportLayoutChildrenProps {
    title: string;
    childrenSelectWrap?: ReactNode;
    children?: ReactNode;
}
const ReportLayout = (props: ReportLayoutChildrenProps) => {
    return (
        <>
            <STcontentWrap>
                <STtitle>{props.title}</STtitle>
                {props.childrenSelectWrap}
                <div>{props.children}</div>
            </STcontentWrap>
        </>
    );
};
export default ReportLayout;
