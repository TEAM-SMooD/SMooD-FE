import React, { useState } from "react";
import { STsiteReportWrap, STsiteReportDoor } from "../../styles/SiteReportST";
import SiteReportStyle from "../../styles/SiteReport.module.css";

interface btnActiveProps {
    btnActive: boolean;
    setBtnActive: React.Dispatch<React.SetStateAction<boolean>>;
}
const SiteReports = (props: btnActiveProps) => {
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);
    const resizeListener = () => {
        setInnerHeight(window.innerHeight);
    };
    window.addEventListener("resize", resizeListener);

    return (
        <>
            <STsiteReportWrap slideOpen={props.btnActive}>
                <div
                    className={`${SiteReportStyle.h50center} ${SiteReportStyle.reportHeader}`}
                >
                    스무디 리포트
                </div>
                <div className={SiteReportStyle.reportNav}>
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
                    className={SiteReportStyle.h50center}
                >
                    선택한것들 보여줘야지
                </div>
                <div className={SiteReportStyle.reportContentWrap}>본문</div>
                <STsiteReportDoor
                    onClick={() => props.setBtnActive(!props.btnActive)}
                />
            </STsiteReportWrap>
        </>
    );
};

export default SiteReports;
