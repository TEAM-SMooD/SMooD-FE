import React, { useEffect, useRef, useState } from "react";
import {
    STconceptSlideReportWrap,
    STconceptSlideReportDoor,
} from "../../styles/ConceptSlideReportST";
import ConceptSlideReportStyle from "../../styles/ConceptSlideReport.module.css";
import ic_arrow from "../../assets/ic_arrow.png";
import StoreModal from "../StoreModal";
import { useObserver } from "../../hooks/useObserver";
import {
    ConceptOpenedSelect,
    ConceptSelectedRestaurant,
    ConceptSelectedStore,
    ConceptSelectedDistrict,
    ConceptSelectedDistrict2,
    selectedDistrictCrdnt,
} from "../../state/atom";
import { useRecoilValue } from "recoil";
import ic_loc from "../../assets/ic_location.png";
import ic_store from "../../assets/ic_store.png";

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

    const selectedStore = useRecoilValue(ConceptSelectedStore);
    const selectedRestaurant = useRecoilValue(ConceptSelectedRestaurant);
    const selectedDistrict = useRecoilValue(ConceptSelectedDistrict);
    const selectedDistrict2 = useRecoilValue(ConceptSelectedDistrict2);
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
                        boxShadow: " 0px 2px rgba(0,0,0,.1)",
                    }}
                    className={ConceptSlideReportStyle.h50center}
                >
                    <img src={ic_loc} style={{ width: "1rem" }} />
                    {selectedDistrict}
                    <img src={ic_loc} style={{ width: "1rem" }} />
                    {selectedStore}
                </div>

                <div className={ConceptSlideReportStyle.reportContentWrap}>
                    <div ref={refKeyword}>키워드분석</div>

                    <div className={ConceptSlideReportStyle.borderBox}>
                        <div>2023suseh z해핵심 키워드</div>
                        <div>
                            <div>워클</div>
                            <div>표</div>
                        </div>
                    </div>
                    <div className={ConceptSlideReportStyle.borderBox}>
                        <div>인스타가 포함된 키워드</div>
                        <div>
                            <div>가게1</div>
                            <div>가게2</div>
                        </div>
                    </div>
                    <div className={ConceptSlideReportStyle.borderBox}>
                        <div>핵심 키워드 변화</div>
                        <div>표</div>
                    </div>
                    <div ref={refCategory}>카테고리별키워드분석</div>
                    <div>
                        <div>긍정리뷰</div>
                        <div>긍정리뷰</div>
                        <div>긍정리뷰</div>
                    </div>
                    <div className={ConceptSlideReportStyle.borderBox}>
                        <div>키워드 순위</div>
                        <div>비율 순위의 높은 가게의 </div>
                        <div>표</div>
                    </div>
                    <div className={ConceptSlideReportStyle.borderBox}>
                        긍정 리뷰가 많은 가게
                        <div>
                            <button onClick={() => setModalOpen(true)}>
                                모달오픈!
                            </button>
                        </div>
                    </div>
                    <div ref={refClosed}>폐업 가게 분석</div>
                    <div className={ConceptSlideReportStyle.borderBox}>
                        <div>잘나가는 vs</div>
                        <div>태블로 </div>
                    </div>

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
