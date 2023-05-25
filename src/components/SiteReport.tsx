import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import AnalysisReportStyle from "../styles/AnalysisStyle.module.css";
import { STreportMenuEach } from "../styles/AnalysisST";
import {
    SiteSelectedStore,
    SiteSelectedRestaurant,
    SiteSelectedConcept,
} from "../state/atom";
import { colors } from "../styles/designSystem";
import { PieChart } from "react-minimal-pie-chart";

interface scrollProps {
    scrollY: number;
    setScrollY: React.Dispatch<React.SetStateAction<number>>;
    handleScroll: () => void;
    menuFixed: boolean;
    setMenuFixed: React.Dispatch<React.SetStateAction<boolean>>;
}
const SiteReport = (props: scrollProps) => {
    const selectedStore = useRecoilValue(SiteSelectedStore);
    const selectedRestaurant = useRecoilValue(SiteSelectedRestaurant);
    const selectedConcept = useRecoilValue(SiteSelectedConcept);

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
        <>
            <div
                className={AnalysisReportStyle.reportInnerWrap}
                style={{
                    paddingTop: props.menuFixed ? "140px" : "10px",
                }}
            >
                <div className={AnalysisReportStyle.borderBox}>
                    <div className={AnalysisReportStyle.reportTitle}>
                        {selectedConcept.map((e: any, i: number) => (
                            <span key={i} style={{ color: "var(--red" }}>
                                {i != 0 && "#"}
                                {e}{" "}
                            </span>
                        ))}
                        이(가) 포함된{" "}
                        <span style={{ color: "var(--red" }}>
                            {selectedStore}
                            {selectedRestaurant && `(${selectedRestaurant})`}
                        </span>
                        이(가) 가장 많은 지역은 '___'입니다
                    </div>
                    <div className={AnalysisReportStyle.reportPiesWrap}>
                        <div>
                            <PieChart
                                style={{ height: "auto" }}
                                data={[
                                    {
                                        value: 20,
                                        color: "#faa8a5",
                                        // color: "rgba(255,80,75,0.8)",
                                        name: "name1",
                                    },
                                ]}
                                reveal={20}
                                lineWidth={40}
                                background="#f3f3f3"
                                lengthAngle={360}
                                // animate
                                startAngle={-90}
                                label={({ dataEntry }) => dataEntry.value + "%"}
                                labelStyle={{
                                    fontSize: "15px",
                                    fill: "#33333",
                                }}
                                labelPosition={0}
                                // rounded={true}
                            />
                            <div
                                className={
                                    AnalysisReportStyle.reportPieUnderWrap
                                }
                            >
                                <div
                                    className={
                                        AnalysisReportStyle.reportPieUnderTitle
                                    }
                                >
                                    <div
                                        style={{
                                            color: "var(--red)",
                                            fontSize: "1.5rem",
                                        }}
                                    >
                                        1위
                                    </div>
                                    <div>성수2동</div>
                                </div>
                                <div style={{ fontSize: "0.8rem" }}>
                                    __ 개 중 __개의 키워드를 포함하고 있습니다.
                                </div>
                            </div>
                        </div>

                        <div>
                            <PieChart
                                style={{ height: "auto" }}
                                data={[
                                    {
                                        value: 20,
                                        color: "#faa8a5",
                                        // color: "rgba(255,80,75,0.8)",
                                        name: "name1",
                                    },
                                ]}
                                reveal={20}
                                lineWidth={40}
                                background="#f3f3f3"
                                lengthAngle={360}
                                // animate
                                startAngle={-90}
                                label={({ dataEntry }) => dataEntry.value + "%"}
                                labelStyle={{
                                    fontSize: "15px",
                                    fill: "#33333",
                                }}
                                labelPosition={0}
                                // rounded={true}
                            />
                            <div
                                className={
                                    AnalysisReportStyle.reportPieUnderWrap
                                }
                            >
                                <div
                                    className={
                                        AnalysisReportStyle.reportPieUnderTitle
                                    }
                                >
                                    <div
                                        style={{
                                            color: "var(--red)",
                                            fontSize: "1.5rem",
                                        }}
                                    >
                                        1위
                                    </div>
                                    <div>성수2동</div>
                                </div>
                                <div style={{ fontSize: "0.8rem" }}>
                                    __ 개 중 __개의 키워드를 포함하고 있습니다.
                                </div>
                            </div>
                        </div>
                        <div>
                            <PieChart
                                style={{ height: "auto" }}
                                data={[
                                    {
                                        value: 20,
                                        color: "#faa8a5",
                                        // color: "rgba(255,80,75,0.8)",
                                        name: "name1",
                                    },
                                ]}
                                reveal={20}
                                lineWidth={40}
                                background="#f3f3f3"
                                lengthAngle={360}
                                // animate
                                startAngle={-90}
                                label={({ dataEntry }) => dataEntry.value + "%"}
                                labelStyle={{
                                    fontSize: "15px",
                                    fill: "#33333",
                                }}
                                labelPosition={0}
                                // rounded={true}
                            />
                            <div
                                className={
                                    AnalysisReportStyle.reportPieUnderWrap
                                }
                            >
                                <div
                                    className={
                                        AnalysisReportStyle.reportPieUnderTitle
                                    }
                                >
                                    <div
                                        style={{
                                            color: "var(--red)",
                                            fontSize: "1.5rem",
                                        }}
                                    >
                                        1위
                                    </div>
                                    <div>성수2동</div>
                                </div>
                                <div style={{ fontSize: "0.8rem" }}>
                                    __ 개 중 __개의 키워드를 포함하고 있습니다.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={AnalysisReportStyle.borderBox}>
                    <div className={AnalysisReportStyle.reportTitle}>
                        {selectedConcept.map((e: any, i: number) => (
                            <span key={i} style={{ color: "var(--red" }}>
                                {i != 0 && "#"}
                                {e}{" "}
                            </span>
                        ))}
                        이(가) 포함된 대표{" "}
                        <span style={{ color: "var(--red" }}>
                            {selectedStore}
                            {selectedRestaurant && `(${selectedRestaurant})`}
                        </span>
                    </div>
                    <div>
                        <div>셀렉트</div>
                        <div>귀찮아....</div>
                    </div>
                    <div>
                        여기는 가게들ㄹ.ㄹㄹ.ㄹ..ㄹ.가게상세로 연결도 . . ..
                    </div>
                </div>
            </div>
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
        </>
    );
};

export default SiteReport;
