import styled from "styled-components";
import { colors } from "./designSystem";

export const StHome = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const StCreamImg = styled.img`
    width: 100%;
    z-index: -1;
    max-height: 100vh;
    alt=""
`;

export const StLogo = styled.img`
    width: 13%;
    left: calc(50vw - 6.5%);
    top: calc(50vh - 6.5%);
`;

export const SThomeBtn = styled.div`
    width: 19rem;
    height: 17rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${colors.brightgrey};
    border-radius: 15px;
`;
