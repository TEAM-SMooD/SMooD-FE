import React, { useEffect, useState } from "react";
import AnalysisReportStyle from "../styles/AnalysisStyle.module.css";
import { STreportMenuEach } from "../styles/AnalysisST";
import { useRecoilState } from "recoil";
import {
    AnalysisSelectedStore,
    AnalysisSelectedDistrict,
    AnalysisSelectedDistrict2,
    AnalysisSelectedRestaurant,
} from "../state/atom";
import { customAxios } from "../api/customAxios";

interface scrollProps {
    scrollY: number;
    setScrollY: React.Dispatch<React.SetStateAction<number>>;
    handleScroll: () => void;
    menuFixed: boolean;
    setMenuFixed: React.Dispatch<React.SetStateAction<boolean>>;
}

const AnalysisReport = (props: scrollProps) => {
    const [selectedMenu, setSelectedMenu] = useState(0);
    const [tableauUrl, setTableauUrl] = useState<any>([]);

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
    const getAnalysisTableau = async () => {
        try {
            const res = await customAxios().get(
                `/tableau?dong=${selectedDistrict2}&category=${
                    selectedStore == "카페" ? selectedStore : selectedDistrict2
                }`
            );
            // console.log("getAnalysisTableau res", res.data.body.result);
            setTableauUrl(res.data.body.result.url);
        } catch (err) {
            console.log("getAnalysisTableauERR", err);
        }
    };

    useEffect(() => {
        getAnalysisTableau(); ///

        function scrollListener() {
            window.addEventListener("scroll", props.handleScroll);
        }
        scrollListener();
        return () => {
            window.removeEventListener("scroll", props.handleScroll);
        };
    }, [selectedMenu]);

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
                        idx={0}
                        onClick={() => setSelectedMenu(0)}
                    >
                        인구
                    </STreportMenuEach>
                    <STreportMenuEach
                        selectedIdx={selectedMenu}
                        idx={1}
                        onClick={() => setSelectedMenu(1)}
                    >
                        주변시설 현황
                    </STreportMenuEach>
                    <STreportMenuEach
                        selectedIdx={selectedMenu}
                        idx={2}
                        onClick={() => setSelectedMenu(2)}
                    >
                        매출
                    </STreportMenuEach>
                    <STreportMenuEach
                        selectedIdx={selectedMenu}
                        idx={3}
                        onClick={() => setSelectedMenu(3)}
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
                {tableauUrl && (
                    <iframe
                        id="myframe"
                        src={tableauUrl[selectedMenu]}
                        // src={`https://public.tableau.com/views/-_16844621835620/sheet12?:language=ko-KR&publish=yes&:display_count=n&:origin=viz_share_link?:showVizHome=no&:embed=true&dong=${encodeURIComponent(
                        //     selectedDistrict2
                        // )}`}
                        width="100%"
                        height="2000"
                        title="분석 보고서"
                    />
                )}
            </div>
        </div>
    );
};

export default AnalysisReport;
