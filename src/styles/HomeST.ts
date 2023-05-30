import styled from "styled-components";
import { colors } from "./designSystem";

export const StHome = styled.div`
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: #ff3d3702;
`;

export const StCreamImg = styled.img`
    width: 100%;
    z-index: -1;
    max-height: 100vh;
    alt=""
`;

export const StLogo = styled.img`
    // width: 13%;
    width: 200px;
    left: calc(50vw - 6.5%);
    top: calc(50vh - 6.5%);
`;

export const SThomeBtn = styled.div`
    width: 19rem;
    height: 17rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${colors.brightgrey};
    border-radius: 15px;
    box-shadow: 0 5px 7px #b0b0b0;
    cursor: pointer;
    &: hover {
        outline: 3px solid ${colors.red};
    }
`;

export const SThomeIc = styled.img`
    width: 86px;
    height: 86px;
`;
export const STVerticallMove = styled.div<{ number: number }>`
    position: relative;
    top: ${(props) => props.number - 300}px;
`;
export const STVerticallMove2 = styled.div<{ number: number }>`
    position: relative;
    top: ${(props) => -props.number}px;
`;

export const SThorizonalMove = styled.div<{ number: number }>`
    position: relative;
    display: flex;
    left: ${(props) => props.number - 300}px;
`;
