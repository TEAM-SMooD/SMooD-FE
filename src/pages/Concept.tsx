import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import ConceptModal from "../components/ConceptModal";
import ConceptSlideReport from "../components/reports/ConceptSlideReport";
import { useRecoilState } from "recoil";
import { selectedDistrictCrdnt } from "../state/atom";
import KakaoMap from "../components/KakaoMap";

const Concept = () => {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);
    const [crdnt, setCrdnt] = useRecoilState(selectedDistrictCrdnt);
    const [isBtnClicked, setIsBtnClicked] = useState(false);
    const [reportDoorVisible, setReportDoorVisible] = useState(false);
    const resizeListener = () => {
        setInnerWidth(window.innerWidth);
        setInnerHeight(window.innerHeight);
    };
    window.addEventListener("resize", resizeListener);

    return (
        <>
            <Layout idx={1}>
                <KakaoMap
                    elementsId="map"
                    mapWidth={innerWidth}
                    mapHeight={innerHeight - 70}
                    crdnt={crdnt}
                />
                <ConceptModal
                    isBtnClicked={isBtnClicked}
                    setIsBtnClicked={setIsBtnClicked}
                    reportDoorVisible={reportDoorVisible}
                    setReportDoorVisible={setReportDoorVisible}
                />
                <ConceptSlideReport
                    isBtnClicked={isBtnClicked}
                    setIsBtnClicked={setIsBtnClicked}
                    reportDoorVisible={reportDoorVisible}
                    setReportDoorVisible={setReportDoorVisible}
                />
            </Layout>
        </>
    );
};
export default Concept;
