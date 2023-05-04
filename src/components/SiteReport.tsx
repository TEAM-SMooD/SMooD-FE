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

export default SiteReport;
