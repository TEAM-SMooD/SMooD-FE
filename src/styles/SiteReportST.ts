import styled from "styled-components";
import { colors } from "./designSystem";

export const STsiteReportWrap = styled.div<{ slideOpen: boolean }>`
    position: fixed;
    background: white;
    z-index: 99;
    top: 69px;
    right: ${(props) => (props.slideOpen ? "0px" : "-700px")};
    width: 689px;
    height: calc(100vh - 71px);
`;

export const STsiteReportDoor = styled.div`
    position: absolute;
    left: -40px;
    top: 50%;
    z-index: 10;
    width: 40px;
    height: 80px;
    margin-top: -40px;
    background: #fff;
`;
