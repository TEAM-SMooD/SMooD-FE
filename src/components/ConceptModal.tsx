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

const ConceptModal = () => {
    const [modalOpen, setModalOpen] = useState(true);
    const [selectedDropdown, setSelectedDropdown] = useState(0);
    const [district, setDistrict] = useState("지역을 선택하세요");
    const [district2, setDistrict2] = useState("");
    const [store, setStore] = useState("업종을 선택하세요");
    const [store2, setStore2] = useState("");

    const districtArr = ["성수", "북촌", "신촌"];
    const sungsuArr = ["1가 1동", "1가 2동", "2가 1동", "2가 3동"];
    const bukchonArr = ["가회동", "삼청동"];
    const shinchonArr = ["신촌동"];
    const storeArr = ["카페", "음식점"];
    const restaurantArr = [
        "한식",
        "유흥주점",
        "분식",
        "일식/수산물",
        "양식",
        "패스트푸드",
        "닭/오리요리",
        "제과제빵/떡/케익",
        "중식",
        "별식/퓨전요리",
        "음식배달 서비스",
    ];

    console.log(district);
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
