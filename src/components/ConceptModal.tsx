import React, { useEffect, useState } from "react";
import {
    StSelectbox,
    StWrap,
    StDropdown,
    StModalContent,
    StDropdown2,
} from "../styles/ConceptST";
import { colors } from "../styles/designSystem";
import ic_arrow from "../assets/ic_arrow.png";
import ConceptStyle from "../styles/ConceptStyle.module.css";
import ic_location from "../assets/ic_location.png";
import ic_store from "../assets/ic_store.png";
import ic_concept from "../assets/ic_concept.png";
import {
    districtArr,
    sungsuArr,
    bukchonArr,
    shinchonArr,
    storeArr,
    restaurantArr,
} from "../data/concepmodalData";
import { useRecoilState } from "recoil";
import { selectedDistrictCrdnt } from "../state/atom";
import { crdntList } from "../data/concepmodalData";
import SelectStyle from "../styles/SelectBox.module.css";
interface btnActiveProps {
    btnActive: boolean;
    setBtnActive: React.Dispatch<React.SetStateAction<boolean>>;
}
const ConceptModal = (props: btnActiveProps) => {
    const [modalOpen, setModalOpen] = useState(true);
    const [selectedDropdown, setSelectedDropdown] = useState(0);
    const [district, setDistrict] = useState("지역을 선택하세요");
    const [district2, setDistrict2] = useState("");
    const [store, setStore] = useState("업종을 선택하세요");
    const [store2, setStore2] = useState("");
    const [crdnt, setCrdnt] = useRecoilState(selectedDistrictCrdnt);

    const handelChangeCrdnt = (each: any) => {
        if (each != "카페" && each != "음식점") {
            setCrdnt(crdntList[each]);
        }
    };
    const handleSelectDistrict = (id: string, each: string) => {
        return (
            <div
                key={each}
                className={[
                    ConceptStyle.selectEach,
                    ConceptStyle.selectEachHover,
                ].join(" ")}
                style={{
                    borderStyle: "solid",
                    borderWidth: "0.7px",
                    borderColor:
                        id == "district"
                            ? district == "지역을 선택하세요"
                                ? "transparent"
                                : district == each
                                ? `${colors.red} ${colors.red} transparent ${colors.red}`
                                : `${colors.grey} ${colors.grey} ${colors.red} ${colors.grey}`
                            : id == "district2"
                            ? "transparent"
                            : id == "store"
                            ? store == "업종을 선택하세요"
                                ? "transparent"
                                : each == "카페" && store == "카페"
                                ? `${colors.red} ${colors.red} ${colors.red} ${colors.red}`
                                : each == "카페" && store == "음식점"
                                ? `${colors.grey} ${colors.grey} ${colors.red} ${colors.grey}`
                                : each == "음식점" && store == "카페"
                                ? `${colors.grey} ${colors.grey}  ${colors.grey} ${colors.grey}`
                                : `${colors.red} ${colors.red} transparent ${colors.red}`
                            : "",
                    color: each == district ? colors.red : "",
                }}
                onClick={(e: any) => {
                    id == "district"
                        ? setDistrict(e.target.innerHTML)
                        : id == "restaurant"
                        ? setStore2(e.target.innerHTML)
                        : id == "store"
                        ? setStore(e.target.innerHTML)
                        : id == "sungsu" || "buckchon" || "shinchon"
                        ? setDistrict2(e.target.innerHTML)
                        : console.log("");
                    handelChangeCrdnt(each);
                }}
            >
                {each}
            </div>
        );
    };
    useEffect(() => {
        setDistrict2("");
    }, [district]); // 큰범위지역(district)이 바뀌면 상세지역(district2)은 초기화시킵니다.

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
                            display: !modalOpen ? "none" : "",
                        }}
                    >
                        <StSelectbox isOpen={selectedDropdown == 1}>
                            <div
                                className={ConceptStyle.selectBoxContent}
                                onClick={(e) => {
                                    selectedDropdown == 1
                                        ? setSelectedDropdown(0)
                                        : setSelectedDropdown(1);
                                }}
                            >
                                <img
                                    src={ic_location}
                                    style={{ width: "17px", height: "17px" }}
                                />
                                <div>
                                    {district} | {district2}
                                </div>
                            </div>

                            <StDropdown
                                districtstore={1}
                                district1={district}
                                selectedDropdown={selectedDropdown}
                                top={85}
                                style={{ gridTemplateColumns: "1fr 1fr 1fr" }}
                            >
                                {districtArr.map((each, i) =>
                                    handleSelectDistrict("district", each)
                                )}
                            </StDropdown>
                            <StDropdown
                                districtstore={2}
                                district1={district}
                                selectedDropdown={selectedDropdown}
                                top={117}
                                style={{
                                    gridTemplateColumns:
                                        district == "성수"
                                            ? "1fr 1fr 1fr 1fr"
                                            : district == "북촌"
                                            ? "1fr 1fr"
                                            : "1fr",
                                }}
                            >
                                {district == "성수"
                                    ? sungsuArr.map((each, i) =>
                                          handleSelectDistrict(
                                              "district2",
                                              each
                                          )
                                      )
                                    : district == "북촌"
                                    ? bukchonArr.map((each, i) =>
                                          handleSelectDistrict(
                                              "district2",
                                              each
                                          )
                                      )
                                    : shinchonArr.map((each, i) =>
                                          handleSelectDistrict(
                                              "district2",
                                              each
                                          )
                                      )}
                            </StDropdown>
                        </StSelectbox>
                        <StSelectbox isOpen={selectedDropdown == 2}>
                            <div
                                className={ConceptStyle.selectBoxContent}
                                onClick={(e) => {
                                    selectedDropdown == 2
                                        ? setSelectedDropdown(0)
                                        : setSelectedDropdown(2);
                                }}
                            >
                                <img
                                    src={ic_concept}
                                    style={{ width: "17px", height: "17px" }}
                                />
                                <div>
                                    {store} | {store == "음식점" && store2}
                                </div>
                            </div>
                            <StDropdown
                                districtstore={3}
                                store1={store}
                                selectedDropdown={selectedDropdown}
                                top={130}
                                style={{ gridTemplateColumns: "1fr 1fr" }}
                            >
                                {storeArr.map((each, i) =>
                                    handleSelectDistrict("store", each)
                                )}
                            </StDropdown>
                            <StDropdown2
                                districtstore={4}
                                store1={store}
                                selectedDropdown={selectedDropdown}
                                top={162}
                            >
                                {store == "음식점" &&
                                    restaurantArr.map((each, i) => (
                                        <div
                                            key={each}
                                            className={[
                                                ConceptStyle.selectEach,
                                                ConceptStyle.selectEachHover,
                                            ].join(" ")}
                                            style={{}}
                                            onClick={(e: any) => {
                                                setStore2(e.target.innerHTML);
                                            }}
                                        >
                                            {each}
                                        </div>
                                    ))}
                            </StDropdown2>
                        </StSelectbox>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <button
                            className={
                                district != "지역을 선택하세요" &&
                                store != "업종을 선택하세요"
                                    ? `${SelectStyle.clickableReportBtn} ${SelectStyle.reportBtn}`
                                    : `${SelectStyle.reportBtn}`
                            }
                            onClick={() => props.setBtnActive(!props.btnActive)}
                            // ~~~ onClick 에 서버로부터 보고서 받아오는거 추가 필요 ~~~
                            disabled={
                                !(
                                    district != "지역을 선택하세요" &&
                                    store != "업종을 선택하세요"
                                )
                            }
                        >
                            분석하기
                        </button>
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
