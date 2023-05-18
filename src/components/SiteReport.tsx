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
        <div>
            <div
                style={{
                    paddingTop: props.menuFixed ? "140px" : "10px",
                }}
            >
                <div className={AnalysisReportStyle.reportTitle}>
                    <div>
                        {selectedStore} {selectedConcept}
                    </div>
                    <div>보고서</div>
                </div>

                <PieChart
                    style={{ width: "20%" }}
                    data={[
                        {
                            value: 20,
                            color: "rgba(255,80,75,0.8)",
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
                        fontSize: "20px",
                        fill: "#33333",
                    }}
                    labelPosition={0}
                    rounded={true}
                />
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

export default SiteReport;
