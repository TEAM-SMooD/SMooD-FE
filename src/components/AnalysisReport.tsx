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

const ReportTableau = (props: { loc: string; store: string }) => {
    if (document.querySelector("iframe")) {
        // console.log(document.querySelector("iframe").contentWindow.document);
    }

    return (
        <>
            <iframe
                id="myframe"
                src={`https://public.tableau.com/views/_16843934504640/sheet17?:language=ko-KR&publish=yes&:display_count=n&:origin=viz_share_link?:showVizHome=no&:embed=true&행정동=${props.loc}&업종=${props.store}`}
                width="100%"
                height="2000"
                title="성수인구"
                onClick={(e: any) => {
                    console.log("eee'", e.target);
                }}
            />
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
                    <div
                        onClick={(e: any) => {
                            console.log("eee'", e.target);
                        }}
                    >
                        보고서
                    </div>
                </div>
                {selectedMenu == 1 ? (
                    <ReportTableau loc="성수1가제2동" store="한식" />
                ) : selectedMenu == 2 ? (
                    <ReportTableau loc="성수1가제2동" store="한식" />
                ) : selectedMenu == 3 ? (
                    <ReportTableau loc="성수1가제2동" store="한식" />
                ) : selectedMenu == 4 ? (
                    <ReportTableau loc="성수1가제2동" store="한식" />
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default AnalysisReport;
