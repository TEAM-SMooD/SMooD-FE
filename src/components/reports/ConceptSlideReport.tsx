import React, { useEffect, useRef, useState } from "react";
import {
    STconceptSlideReportWrap,
    STconceptSlideReportDoor,
} from "../../styles/ConceptSlideReportST";
import ConceptSlideReportStyle from "../../styles/ConceptSlideReport.module.css";
import ic_arrow from "../../assets/ic_arrow.png";
import StoreModal from "../StoreModal";
import { useObserver } from "../../hooks/useObserver";

interface btnActiveProps {
    isBtnClicked: boolean;
    setIsBtnClicked: React.Dispatch<React.SetStateAction<boolean>>;
    reportDoorVisible: boolean;
    setReportDoorVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConceptSlideReport = (props: btnActiveProps) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [isFocused, setIsfocused] = useState(0);
    const refKeyword = useObserver(1, setIsfocused);
    const refCategory = useObserver(2, setIsfocused);
    const refClosed = useObserver(3, setIsfocused);

    const onScroll = (
        refcurrent: React.RefObject<HTMLDivElement>,
        e: number
    ) => {
        if (refcurrent.current) {
            refcurrent.current.scrollIntoView({ behavior: "smooth" });
            setIsfocused(e);
        }
    };
    return (
        <>
            <STconceptSlideReportWrap slideOpen={props.reportDoorVisible}>
                <div
                    className={`${ConceptSlideReportStyle.h50center} ${ConceptSlideReportStyle.reportHeader}`}
                >
                    스무디 리포트
                </div>
                <div className={ConceptSlideReportStyle.reportNav}>
                    <div
                        ref={refKeyword}
                        onClick={() => onScroll(refKeyword, 1)}
                        className={
                            isFocused == 1
                                ? `${ConceptSlideReportStyle.reportNavEach} ${ConceptSlideReportStyle.reportNavEachSelected}`
                                : `${ConceptSlideReportStyle.reportNavEach}`
                        }
                    >
                        키워드분석
                    </div>
                    <div
                        ref={refCategory}
                        onClick={() => onScroll(refCategory, 2)}
                        className={
                            isFocused == 2
                                ? `${ConceptSlideReportStyle.reportNavEach} ${ConceptSlideReportStyle.reportNavEachSelected}`
                                : `${ConceptSlideReportStyle.reportNavEach}`
                        }
                    >
                        카테고리별키워드분석
                    </div>
                    <div
                        ref={refClosed}
                        onClick={() => onScroll(refClosed, 3)}
                        className={
                            isFocused == 3
                                ? `${ConceptSlideReportStyle.reportNavEach} ${ConceptSlideReportStyle.reportNavEachSelected}`
                                : `${ConceptSlideReportStyle.reportNavEach}`
                        }
                    >
                        폐업가게분석
                    </div>
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

                <button onClick={() => setModalOpen(true)}>모달오픈!</button>
                <div className={ConceptSlideReportStyle.reportContentWrap}>
                    본문
                    <div ref={refKeyword}>키워드분석</div>
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
                    <div ref={refCategory}>카테고리별키워드분석</div>
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
                    <div ref={refClosed}>폐업</div>
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

                {modalOpen && (
                    <>
                        <StoreModal
                            modalOpen={modalOpen}
                            setModalOpen={setModalOpen}
                        />
                    </>
                )}

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
            </STconceptSlideReportWrap>
        </>
    );
};

export default ConceptSlideReport;
