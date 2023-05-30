import React, { useRef, useState } from "react";
import { StWrap, StModalContent } from "../styles/ConceptST";
import { colors } from "../styles/designSystem";
import ic_arrow from "../assets/ic_arrow.png";
import ConceptStyle from "../styles/ConceptStyle.module.css";
import { useRecoilState } from "recoil";
import {
    ConceptOpenedSelect,
    ConceptSelectedRestaurant,
    ConceptSelectedStore,
    ConceptSelectedDistrict,
    ConceptSelectedDistrict2,
    selectedDistrictCrdnt,
} from "../state/atom";
import SelectStyle from "../styles/SelectBox.module.css";
import { DistrictSelectBox, StoreSelectBox } from "./SelectBox";
import { useNavigate } from "react-router-dom";
interface btnActiveProps {
    isBtnClicked: boolean;
    setIsBtnClicked: React.Dispatch<React.SetStateAction<boolean>>;
    reportDoorVisible: boolean;
    setReportDoorVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const ConceptModal = (props: btnActiveProps) => {
    const [modalOpen, setModalOpen] = useState(true);
    const [crdnt, setCrdnt] = useRecoilState(selectedDistrictCrdnt);
    const [selectedStore, setSelectedStore] =
        useRecoilState(ConceptSelectedStore);
    const [selectedRestaurant, setSelectedRestaurant] = useRecoilState(
        ConceptSelectedRestaurant
    );
    const [selectedDistrict, setSelectedDistrict] = useRecoilState(
        ConceptSelectedDistrict
    );
    const [selectedDistrict2, setSelectedDistrict2] = useRecoilState(
        ConceptSelectedDistrict2
    );
    const [openedSelect, setOpenedSelect] = useRecoilState(ConceptOpenedSelect);
    const navigate = useNavigate();
    return (
        <>
            <StWrap>
                <StModalContent>
                    <div style={{ fontWeight: "bold", color: colors.red }}>
                        컨셉 추천
                    </div>
                    <div
                        style={{
                            marginTop: "15px",
                            display: !modalOpen ? "none" : "grid",
                            gridGap: "10px",
                        }}
                    >
                        <DistrictSelectBox
                            state={selectedDistrict}
                            changeState={(e: any) => setSelectedDistrict(e)}
                            state2={selectedDistrict2}
                            changeState2={(e: any) => setSelectedDistrict2(e)}
                            openId={3}
                            handleOnclick={() => {
                                if (selectedDistrict != "지역을 선택하세요") {
                                    setSelectedDistrict("지역을 선택하세요");
                                    setSelectedDistrict2("");
                                }
                                if (openedSelect != 3) {
                                    setOpenedSelect(3);
                                } else {
                                    setOpenedSelect(0);
                                }
                            }}
                            openedSelect={openedSelect}
                            setOpenedSelect={setOpenedSelect}
                            concept={true}
                        />
                        <StoreSelectBox
                            state={selectedStore}
                            changeState={(e: any) => setSelectedStore(e)}
                            resState={selectedRestaurant}
                            resChangeState={setSelectedRestaurant}
                            openId={1}
                            handleOnclick={() => {
                                if (selectedStore != "업종을 선택하세요") {
                                    setSelectedStore("업종을 선택하세요");
                                    setSelectedRestaurant("");
                                }
                                if (openedSelect != 1) {
                                    setOpenedSelect(1);
                                } else {
                                    setOpenedSelect(0);
                                }
                            }}
                            openedSelect={openedSelect}
                            setOpenedSelect={setOpenedSelect}
                            concept={true}
                        />
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "5px",
                            }}
                        >
                            <button
                                className={
                                    selectedDistrict != "지역을 선택하세요" &&
                                    selectedStore != "업종을 선택하세요"
                                        ? `${SelectStyle.clickableReportBtn} ${SelectStyle.reportBtn}`
                                        : `${SelectStyle.reportBtn}`
                                }
                                onClick={() => {
                                    if (!sessionStorage.getItem("userId")) {
                                        alert(
                                            "보고서를 보려면 먼저 로그인해주세요."
                                        );
                                        navigate("/mylogin");
                                    } else {
                                        if (!props.isBtnClicked) {
                                            //isBtnClicekd : 처음분석하기 눌렀는지확인: 화살표보이기 여부때문에
                                            props.setIsBtnClicked(true);
                                        }
                                        props.setReportDoorVisible(true);
                                    }
                                }}
                                disabled={
                                    !(
                                        selectedDistrict !=
                                            "지역을 선택하세요" &&
                                        selectedStore != "업종을 선택하세요"
                                    )
                                }
                            >
                                분석하기
                            </button>
                        </div>
                    </div>
                </StModalContent>
                <div
                    className={ConceptStyle.modalArrow}
                    onClick={() => setModalOpen(!modalOpen)}
                >
                    <img
                        className={ConceptStyle.modalArrowImg}
                        src={ic_arrow}
                        color={colors.red}
                        style={{
                            rotate: modalOpen ? "" : "180deg",
                        }}
                    />
                </div>
            </StWrap>
        </>
    );
};
export default ConceptModal;
