import React, { useEffect, useRef, useState } from "react";
import Layout from "./Layout";
import ReportLayout from "./ReportLayout";
import { StoreSelectBox, ConceptSelectBox } from "../components/SelectBox";
import { useRecoilState } from "recoil";
import {
    SiteSelectedStore,
    SiteSelectedConcept,
    SiteOpenedSelect,
    SiteSelectedRestaurant,
} from "../state/atom";
import SelectStyle from "../styles/SelectBox.module.css";
import SiteReport from "../components/SiteReport";
import AnalysisReportStyle from "../styles/AnalysisStyle.module.css";
import { useNavigate } from "react-router-dom";
import useTitle from "../hooks/useTitle";

const Site = () => {
    const changeTitle = useTitle("");
    useEffect(() => {
        changeTitle("SMooD - 지역 추천");
    });
    const [selectedStore, setSelectedStore] = useRecoilState(SiteSelectedStore);
    const [selectedConcept, setSelectedConcept] =
        useRecoilState(SiteSelectedConcept);
    const [selectedRestaurant, setSelectedRestaurant] = useRecoilState(
        SiteSelectedRestaurant
    );
    const [selectedAll, setSelectedAll] = useState(false);
    const [reportOpen, setReportOpen] = useState(false);

    const [scrollY, setScrollY] = useState(0);
    const [menuFixed, setMenuFixed] = useState(false);

    //
    // function initViz() {
    //     var containerDiv = document.getElementById("vizContainer"),
    //     url = "https://YOUR-SERVER/views/YOUR-VISUALIZATION";

    //     var viz = new tableau.Viz(containerDiv, url);
    // }
    // initViz();

    //

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
            (selectedStore == "카페" && selectedConcept.length != 1) ||
            (selectedRestaurant != "" && selectedConcept.length != 1)
        ) {
            setSelectedAll(true);
        } else {
            setSelectedAll(false);
        }
        setReportOpen(false);
    }, [selectedStore, selectedRestaurant, selectedConcept]);

    const SelectBlock = () => {
        const [openedSelect, setOpenedSelect] =
            useRecoilState(SiteOpenedSelect);
        const navigate = useNavigate();

        return (
            <>
                <div
                    className={
                        menuFixed
                            ? `${AnalysisReportStyle.fixedMenu} ${AnalysisReportStyle.Menu}`
                            : `${AnalysisReportStyle.Menu}`
                    }
                >
                    <div className={AnalysisReportStyle.selectBoxWrap}>
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
                        />
                        <ConceptSelectBox
                            state={selectedConcept}
                            changeState={(each: any) => {
                                if (selectedConcept.includes(each)) {
                                    const changeConcept =
                                        selectedConcept.filter(
                                            (e) => e != each
                                        );
                                    setSelectedConcept(changeConcept);
                                } else {
                                    if (selectedConcept.length < 4) {
                                        // 최대 3개 선택
                                        setSelectedConcept((prev) => [
                                            ...prev,
                                            each,
                                        ]);
                                    } else {
                                        alert(
                                            "컨셉 키워드는 3개까지 선택할 수 있어요"
                                        );
                                    }
                                }
                            }}
                            openId={2}
                            handleOnclick={() => {
                                if (openedSelect != 2) {
                                    setOpenedSelect(2);
                                } else {
                                    setOpenedSelect(0);
                                }
                            }}
                            openedSelect={openedSelect}
                            setOpenedSelect={setOpenedSelect}
                        />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            paddingTop: "10px",
                        }}
                    >
                        <button
                            className={
                                selectedAll
                                    ? `${SelectStyle.clickableReportBtn} ${SelectStyle.reportBtn}`
                                    : `${SelectStyle.reportBtn}`
                            }
                            onClick={() => {
                                if (!sessionStorage.getItem("userId")) {
                                    setReportOpen(true);
                                    setOpenedSelect(0);
                                    alert(
                                        "보고서를 보려면 먼저 로그인해주세요."
                                    );
                                    navigate("/mylogin");
                                } else {
                                    setReportOpen(true);
                                    setOpenedSelect(0);
                                }
                            }}
                            disabled={!selectedAll}
                        >
                            분석하기
                        </button>
                    </div>

                    {reportOpen && (
                        <div
                            style={{
                                height: "10px",
                                width: "200%",
                                position: "relative",
                                left: "-50%",
                                background: "white",
                                borderBottom: "1px solid var(--linegrey)",
                            }}
                        ></div>
                    )}
                </div>
            </>
        );
    };
    return (
        <>
            <Layout idx={2}>
                <ReportLayout
                    title="지역 추천"
                    childrenSelectWrap={<SelectBlock />}
                >
                    {reportOpen && (
                        <SiteReport
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
export default Site;
