import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import ReportLayout from "./ReportLayout";
import { DistrictSelectBox, StoreSelectBox } from "../components/SelectBox";
import { useRecoilState } from "recoil";
import AnalysisReport from "../components/AnalysisReport";
import AnalysisReportStyle from "../styles/AnalysisStyle.module.css";

import {
    AnalysisSelectedStore,
    AnalysisOpenedSelect,
    AnalysisSelectedDistrict,
    AnalysisSelectedDistrict2,
    AnalysisSelectedRestaurant,
} from "../state/atom";
import SelectStyle from "../styles/SelectBox.module.css";

const Analysis = () => {
    const [selectedDistrict, setSelectedDistrict] = useRecoilState(
        AnalysisSelectedDistrict
    );
    const [selectedDistrict2, setSelectedDistrict2] = useRecoilState(
        AnalysisSelectedDistrict2
    );
    const [selectedStore, setSelectedStore] = useRecoilState(
        AnalysisSelectedStore
    );
    const [selectedRestaurant, setSelectedRestaurant] = useRecoilState(
        AnalysisSelectedRestaurant
    );
    const [selectedAll, setSelectedAll] = useState(false);
    const [reportOpen, setReportOpen] = useState(false);

    const [scrollY, setScrollY] = useState(0);
    const [menuFixed, setMenuFixed] = useState(false);

    function handleScroll() {
        setScrollY(window.pageYOffset);
        if (scrollY >= 90) {
            setMenuFixed(true);
        } else {
            setMenuFixed(false);
        }
    }
    useEffect(() => {
        function scrollListener() {
            window.addEventListener("scroll", handleScroll);
        }
        scrollListener();
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });

    useEffect(() => {
        if (
            (selectedStore == "카페" && selectedDistrict2 != "") ||
            (selectedRestaurant != "" && selectedDistrict2 != "")
        ) {
            setSelectedAll(true);
        } else {
            setSelectedAll(false);
        }
        setReportOpen(false);
    }, [selectedStore, selectedRestaurant, selectedDistrict, selectedDistrict]);

    const SelectBlock = () => {
        const [openedSelect, setOpenedSelect] =
            useRecoilState(AnalysisOpenedSelect);

        return (
            <>
                <div
                    className={
                        menuFixed ? `${AnalysisReportStyle.fixedMenu}` : ""
                    }
                    style={{
                        background: "white",
                        padding: "10px 0px 10px 0px",
                        height: "100px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
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
                        />
                        <StoreSelectBox
                            state={selectedStore}
                            changeState={(e: any) => setSelectedStore(e)}
                            resState={selectedRestaurant}
                            resChangeState={setSelectedRestaurant}
                            openId={1}
                            handleOnclick={() => {
                                if (openedSelect != 1) {
                                    setOpenedSelect(1);
                                    if (selectedStore != "업종을 선택하세요") {
                                        setSelectedStore("업종을 선택하세요");
                                        setSelectedRestaurant("");
                                        setOpenedSelect(1);
                                    } else {
                                        setOpenedSelect(1);
                                    }
                                } else {
                                    setOpenedSelect(0);
                                }
                            }}
                            openedSelect={openedSelect}
                            setOpenedSelect={setOpenedSelect}
                        />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <button
                            className={
                                selectedAll
                                    ? `${SelectStyle.clickableReportBtn} ${SelectStyle.reportBtn}`
                                    : `${SelectStyle.reportBtn}`
                            }
                            onClick={() => {
                                setReportOpen(true);
                                setOpenedSelect(0);
                            }}
                            disabled={!selectedAll}
                        >
                            분석하기
                        </button>
                    </div>
                </div>
            </>
        );
    };
    return (
        <>
            <Layout idx={3}>
                <ReportLayout
                    title="지역별 상권 분석"
                    childrenSelectWrap={<SelectBlock />}
                >
                    {reportOpen && (
                        <AnalysisReport
                            scrollY={scrollY}
                            setScrollY={setScrollY}
                            menuFixed={menuFixed}
                            setMenuFixed={setMenuFixed}
                            handleScroll={handleScroll}
                        />
                    )}
                </ReportLayout>
            </Layout>
        </>
    );
};
export default Analysis;
