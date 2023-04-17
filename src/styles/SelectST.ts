import styled from "styled-components";
import { colors } from "./designSystem";

export const STselectbox = styled.div<{ isOpen?: boolean }>`
    width: 30%;
    border-radius: ${(props) =>
        props.isOpen ? "12.8px 12.8px 0px 0px" : "204px"};
    background: #f2f1f5;
    display: flex;
    align-items: center;
    margin: 0;
    justify-content: space-between;
    position: relative;
`;
export const STselectWrap = styled.div`
    padding: 3% 5%;
    display: grid;
    width: 100%;
    grid-template-columns: 25px auto 25px;
    align-items: center;
`;
export const STicons = styled.img`
    width: 19px;
    height: 19px;
`;
export const STDropdown = styled.div`
    position: absolute;
    width: 100%;
    border-radius: 0px 0px 12.8px 12.8px;
    background: ${colors.brightgrey};
    display: grid;
    grid-gap: 0.3rem;
    -webkit-box-align: center;
    align-items: center;
    top: 42px;
    justify-items: center;
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid ${colors.lightgrey};
`;
export const STStoreDropdown = styled(STDropdown)`
    grid-template-columns: 1fr 1fr;
`;
export const STDistritDropdown = styled(STDropdown)`
    grid-template-columns: 1fr 1fr 1fr;
`;
export const STConceptDropdown = styled(STDropdown)`
    grid-template-columns: 1fr 1fr 1fr;
`;
