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
export const StDropdown = styled.div<{
    districtstore?: number;
    district1?: string;
    selectedDropdown?: number;
    store1?: string;
    top?: number;
}>`
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
    display: ${(props) =>
        props.districtstore == 1
            ? props.selectedDropdown == 1
                ? ""
                : "none"
            : props.districtstore == 2
            ? props.selectedDropdown == 1 &&
              props.district1 != "지역을 선택하세요"
                ? ""
                : "none"
            : props.districtstore == 3
            ? props.selectedDropdown == 2
                ? ""
                : "none"
            : props.districtstore == 4
            ? props.selectedDropdown == 2 && props.store1 != "업종을 선택하세요"
                ? ""
                : "none"
            : "none"};
    top: ${(props) => props.top}px;
`;
