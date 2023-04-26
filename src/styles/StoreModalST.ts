import styled from "styled-components";
import { colors } from "./designSystem";

export const ModalWrap = styled.div`
    width: 100vw;
    height: calc(100vh - 70px);
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    bottom: 0px;
    left: 0px;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const ModalBackGround = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
`;
export const ModalContainer = styled.div`
    display: grid;
    grid-template-rows: 7% 20% auto;
    border-radius: 10px;
    // gap: 2rem;
    // padding: 3.6rem 0;
    background-color: white;
    width: 60%;
    height: 85%;
    z-index: 21;
`;
