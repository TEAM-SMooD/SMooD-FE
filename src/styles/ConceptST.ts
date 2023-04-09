import styled from "styled-components";
import { colors } from "./designSystem";

export const StWrap = styled.div`
    position: absolute;
    top: 120px;
    left: 36px;
    z-index: 10;
    width: 340px;
`;
export const StModalContent = styled.div`
    background: white;
    padding: 15px;
    border-radius: 10px;
    box-shadow: gainsboro 0px 0px 1px 1px;
`;
export const StModal = styled.div`
    position: absolute;
    top: 120px;
    left: 36px;
    z-index: 10;
    background: white;
    width: 340px;
    border-radius: 10px;
    box-shadow: 0px 0px 1px 1px gainsboro;
    padding: 15px;
`;
export const StSelectbox = styled.div<{ isOpen: boolean }>`
    width: 100%;
    border-radius: ${(props) =>
        props.isOpen ? "12.8px 12.8px 0px 0px" : "204px"};
    background: #f2f1f5;
    margin-bottom: 9px;
    display: flex;
    align-items: center;
`;
export const StDropdown = styled.div`
    position: absolute;
    border-radius: 0px 0px 12.8px 12.8px;
    background: ${colors.brightgrey};
    margin-bottom: 9px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    left: 14px;
    width: calc(100% - 28px);
    z-index: 1;
    border: 0.7px solid ${colors.red};
    height: 2rem;
    justify-content: space-around;
`;
