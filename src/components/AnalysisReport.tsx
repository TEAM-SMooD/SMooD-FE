import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import AnalysisReportStyle from "../styles/AnalysisStyle.module.css";
import { STreportMenuEach } from "../styles/AnalysisST";
import {
    AnalysisSelectedStore,
    AnalysisSelectedRestaurant,
    AnalysisSelectedDistrict,
    AnalysisSelectedDistrict2,
} from "../state/atom";

const ReportPopulation = () => {
    return (
        <>
            <div>reportPopulation </div>
        </>
    );
};
const ReportFacility = () => {
    return (
        <>
            <div>reportFacility </div>
        </>
    );
};
const ReportSale = () => {
    return (
        <>
            <div>reportSale </div>
        </>
    );
};
const ReportInfo = () => {
    return (
        <>
            <div>reportInfo </div>
        </>
    );
};
const AnalysisReport = () => {
    const selectedDistrict = useRecoilValue(AnalysisSelectedDistrict);
    const selectedDistric2 = useRecoilValue(AnalysisSelectedDistrict2);
    const selectedStore = useRecoilValue(AnalysisSelectedStore);
    const selectedRestaurant = useRecoilValue(AnalysisSelectedRestaurant);

    const [selectedMenu, setSelectedMenu] = useState(1);

    const [scrollY, setScrollY] = useState(0);
    console.log("rererere", scrollY);
    const [menuFixed, setMenuFixed] = useState(false);
    function handleScroll() {
        setScrollY(window.pageYOffset);
        if (scrollY > 90) {
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
    return (
        <div>
            <div
                className={
                    menuFixed ? `${AnalysisReportStyle.fixedReportMenu}` : ""
                }
                style={{ background: "white" }}
            >
                <div className={AnalysisReportStyle.reportMenuWrap}>
                    <STreportMenuEach
                        selectedIdx={selectedMenu}
                        idx={1}
                        onClick={() => setSelectedMenu(1)}
                    >
                        인구
                    </STreportMenuEach>
                    <STreportMenuEach
                        selectedIdx={selectedMenu}
                        idx={2}
                        onClick={() => setSelectedMenu(2)}
                    >
                        주변시설 현황
                    </STreportMenuEach>
                    <STreportMenuEach
                        selectedIdx={selectedMenu}
                        idx={3}
                        onClick={() => setSelectedMenu(3)}
                    >
                        매출
                    </STreportMenuEach>
                    <STreportMenuEach
                        selectedIdx={selectedMenu}
                        idx={4}
                        onClick={() => setSelectedMenu(4)}
                    >
                        상권정보
                    </STreportMenuEach>
                </div>
            </div>
            <div
                className={
                    menuFixed ? `${AnalysisReportStyle.fixedReport}` : ""
                }
            >
                {selectedMenu == 1 ? (
                    <ReportPopulation />
                ) : selectedMenu == 2 ? (
                    <ReportFacility />
                ) : selectedMenu == 3 ? (
                    <ReportSale />
                ) : selectedMenu == 4 ? (
                    <ReportInfo />
                ) : (
                    ""
                )}
                <div>.</div>
                <div>.</div>
                <div>.</div>
                <div>.</div>
                <div>.</div>
                <div>.</div>
                <div>.</div>
                <div>.</div>
                <div>.</div>
                <div>.</div>
                <div>.</div>
                <div>.</div>
                <div>.</div>
                <div>.</div>
                <div>.</div>
                <div>.</div>
                <div>.</div>
                <div>.</div>
                <div>.</div>
                <div>.</div>
                <div>.</div>
                <div>.</div>
                <div>.</div>
                <div>.</div>
                <div>.</div>
                <div>.</div>
                <div>.</div>
                <div>.</div>
                <div>.</div>
                <div>.</div>
                <div>.</div>
                <div>.</div>
                <div>.</div>
                <div>.</div>
            </div>
        </div>
    );
};

export default AnalysisReport;
