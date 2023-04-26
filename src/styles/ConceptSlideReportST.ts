import styled from "styled-components";
import { colors } from "./designSystem";

export const STconceptSlideReportWrap = styled.div<{ slideOpen: boolean }>`
    position: fixed;
    background: white;
    z-index: 99;
    top: 69px;
    right: ${(props) => (props.slideOpen ? "0px" : "calc(100vw * -0.5)")};
    width: calc(100vw * 0.5);
    height: calc(100vh - 71px);
`;

export const STconceptSlideReportDoor = styled.div`
    position: absolute;
    left: -40px;
    top: 50%;
    z-index: 10;
    width: 40px;
    height: 80px;
    margin-top: -40px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;
