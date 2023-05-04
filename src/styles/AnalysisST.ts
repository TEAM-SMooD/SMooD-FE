import styled from "styled-components";
import { colors } from "./designSystem";

export const STreportMenuEach = styled.div<{
    selectedIdx: number;
    idx: number;
}>`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 4px 0px 4px 0px;
    border-top: ${(props) =>
        props.idx != props.selectedIdx
            ? `1px solid ${colors.lightgrey}`
            : `1px solid ${colors.red}`};
    border-bottom: ${(props) =>
        props.idx != props.selectedIdx
            ? `1px solid ${colors.lightgrey}`
            : `1px solid ${colors.red}`};
    border-left: ${(props) =>
        props.idx == props.selectedIdx
            ? `1px solid ${colors.red}`
            : props.idx == props.selectedIdx + 1
            ? ""
            : `1px solid ${colors.lightgrey}`};
    border-right: ${(props) =>
        props.idx == props.selectedIdx
            ? `1px solid ${colors.red}`
            : props.idx == 4
            ? `1px solid ${colors.lightgrey}`
            : ""};
    color: ${(props) => (props.idx == props.selectedIdx ? colors.red : "")};
    cursor: pointer;
`;
