import React, { useState } from "react";
import {
    STconceptSlideReportWrap,
    STconceptSlideReportDoor,
} from "../../styles/ConceptSlideReportST";
import ConceptSlideReportStyle from "../../styles/ConceptSlideReport.module.css";

interface btnActiveProps {
    btnActive: boolean;
    setBtnActive: React.Dispatch<React.SetStateAction<boolean>>;
    reportDoorVisible: boolean;
}
const ConceptSlideReport = (props: btnActiveProps) => {
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);
    const resizeListener = () => {
        setInnerHeight(window.innerHeight);
    };
    window.addEventListener("resize", resizeListener);

    return (
        <>
            <STconceptSlideReportWrap slideOpen={props.btnActive}>
                <div
                    className={`${ConceptSlideReportStyle.h50center} ${ConceptSlideReportStyle.reportHeader}`}
                >
                    스무디 리포트
                </div>
                <div className={ConceptSlideReportStyle.reportNav}>
                    <div>키워드분석</div>
                    <div>카테고리별키워드분석</div>
                    <div>폐업가게분석</div>
                </div>
                <div
                    style={{
                        width: "100%",
                        background: "white",
                        boxShadow: " 0 2px 4px 0 rgba(0,0,0,.1)",
                    }}
                    className={ConceptSlideReportStyle.h50center}
                >
                    선택한것들 보여줘야지
                </div>
                <div className={ConceptSlideReportStyle.reportContentWrap}>
                    본문
                </div>
                <STconceptSlideReportDoor
                    style={{ display: props.reportDoorVisible ? "" : "none" }}
                    onClick={() => props.setBtnActive(!props.btnActive)}
                />
            </STconceptSlideReportWrap>
        </>
    );
};

export default ConceptSlideReport;
