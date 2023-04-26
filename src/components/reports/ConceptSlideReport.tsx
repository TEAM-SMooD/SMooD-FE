import React, { useState } from "react";
import {
    STconceptSlideReportWrap,
    STconceptSlideReportDoor,
} from "../../styles/ConceptSlideReportST";
import ConceptSlideReportStyle from "../../styles/ConceptSlideReport.module.css";
import ic_arrow from "../../assets/ic_arrow.png";
import StoreModal from "../StoreModal";

interface btnActiveProps {
    isBtnClicked: boolean;
    setIsBtnClicked: React.Dispatch<React.SetStateAction<boolean>>;
    reportDoorVisible: boolean;
    setReportDoorVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const ConceptSlideReport = (props: btnActiveProps) => {
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);
    const resizeListener = () => {
        setInnerHeight(window.innerHeight);
    };
    const [modalOpen, setModalOpen] = useState(false);

    window.addEventListener("resize", resizeListener);
    return (
        <>
            <STconceptSlideReportWrap slideOpen={props.reportDoorVisible}>
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
                    style={{ display: props.isBtnClicked ? "" : "none" }}
                    onClick={() =>
                        props.setReportDoorVisible(!props.reportDoorVisible)
                    }
                >
                    <img
                        src={ic_arrow}
                        style={{
                            rotate: props.reportDoorVisible
                                ? "90deg"
                                : "-90deg",
                            width: "35px",
                        }}
                    />
                </STconceptSlideReportDoor>

                <button onClick={() => setModalOpen(true)}>모달오픈!</button>
                {modalOpen && (
                    <>
                        <StoreModal
                            modalOpen={modalOpen}
                            setModalOpen={setModalOpen}
                        />
                    </>
                )}
            </STconceptSlideReportWrap>
        </>
    );
};

export default ConceptSlideReport;
