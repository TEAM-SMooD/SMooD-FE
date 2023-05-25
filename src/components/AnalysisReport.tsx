import React, { useEffect, useState } from "react";
import AnalysisReportStyle from "../styles/AnalysisStyle.module.css";
import { STreportMenuEach } from "../styles/AnalysisST";
import axios from "axios";

interface scrollProps {
    scrollY: number;
    setScrollY: React.Dispatch<React.SetStateAction<number>>;
    handleScroll: () => void;
    menuFixed: boolean;
    setMenuFixed: React.Dispatch<React.SetStateAction<boolean>>;
}
const AnalysisReport = (props: scrollProps) => {
    const [selectedMenu, setSelectedMenu] = useState(1);
    const [tableauUrl, setTableauUrl] = useState<any>([]);
    const getAnalysisTableau = async () => {
        try {
            const res = await axios.get(
                ""
                // `${process.env.REACT_APP_SERVER_URL}/` // api 맹글어주면~
            );
            console.log("getAnalysisTableau res", res.data.body.result);
            setTableauUrl(res);
        } catch (err) {
            console.log("getPostsERR", err);
        }
    };
    useEffect(() => {
        function scrollListener() {
            window.addEventListener("scroll", props.handleScroll);
        }
        scrollListener();
        return () => {
            window.removeEventListener("scroll", props.handleScroll);
        };
        getAnalysisTableau(); ///
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
                {tableauUrl && (
                    <iframe
                        id="myframe"
                        // src={tableauUrl[selectedMenu]}
                        src={
                            "https://public.tableau.com/views/-_16844621835620/sheet12?:language=ko-KR&publish=yes&:display_count=n&:origin=viz_share_link?:showVizHome=no&:embed=true&행정동=성수1가제1동"
                        }
                        width="100%"
                        height="2000"
                        title="성수인구"
                        onClick={(e: any) => {
                            console.log("eee'", e.target);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default AnalysisReport;
