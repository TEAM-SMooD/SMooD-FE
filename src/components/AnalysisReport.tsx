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
import { colors } from "../styles/designSystem";

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
interface scrollProps {
    scrollY: number;
    setScrollY: React.Dispatch<React.SetStateAction<number>>;
    handleScroll: () => void;
    menuFixed: boolean;
    setMenuFixed: React.Dispatch<React.SetStateAction<boolean>>;
}
const AnalysisReport = (props: scrollProps) => {
    const selectedDistrict = useRecoilValue(AnalysisSelectedDistrict);
    const selectedDistric2 = useRecoilValue(AnalysisSelectedDistrict2);
    const selectedStore = useRecoilValue(AnalysisSelectedStore);
    const selectedRestaurant = useRecoilValue(AnalysisSelectedRestaurant);

    const [selectedMenu, setSelectedMenu] = useState(1);

    useEffect(() => {
        function scrollListener() {
            window.addEventListener("scroll", props.handleScroll);
        }
        scrollListener();
        return () => {
            window.removeEventListener("scroll", props.handleScroll);
        };
    });
    return (
        <div>
            <div
                className={
                    props.menuFixed
                        ? `${AnalysisReportStyle.fixedReportMenu}`
                        : ""
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
                style={{
                    paddingTop: props.menuFixed ? "140px" : "10px",
                }}
            >
                <div className={AnalysisReportStyle.reportTitle}>
                    <div>
                        {selectedDistrict} {selectedDistric2}
                    </div>
                    <div style={{ fontSize: "1.5rem", color: colors.red }}>
                        {selectedMenu == 1
                            ? "인구"
                            : selectedMenu == 2
                            ? "주변시설 현황"
                            : selectedMenu == 3
                            ? "매출"
                            : selectedMenu == 4
                            ? "상권 정보"
                            : ""}
                    </div>
                    <div>보고서</div>
                </div>
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
            </div>
        </div>
    );
};

export default AnalysisReport;
