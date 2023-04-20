import React, { useState } from "react";
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
    selectedDistrictCrdnt,
} from "../state/atom";
import SelectStyle from "../styles/SelectBox.module.css";
import { DistrictSelectBox, StoreSelectBox } from "./SelectBox";
interface btnActiveProps {
    btnActive: boolean;
    setBtnActive: React.Dispatch<React.SetStateAction<boolean>>;
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
    const [openedSelect, setOpenedSelect] = useRecoilState(ConceptOpenedSelect);
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
                            openId={3}
                            handleOnclick={() => {
                                if (selectedDistrict != "지역을 선택하세요") {
                                    setSelectedDistrict("지역을 선택하세요");
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
                                    props.setBtnActive(!props.btnActive);
                                    props.setReportDoorVisible(true);
                                }}
                                // ~~~ onClick 에 서버로부터 보고서 받아오는거 추가 필요 ~~~
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
