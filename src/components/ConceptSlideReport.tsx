import React, { useEffect, useRef, useState } from "react";
import {
    STconceptSlideReportWrap,
    STconceptSlideReportDoor,
} from "../styles/ConceptSlideReportST";
import ConceptSlideReportStyle from "../styles/ConceptSlideReport.module.css";
import ic_arrow from "../assets/ic_arrow.png";
import StoreModal from "./StoreModal";
import { useObserver } from "../hooks/useObserver";
import {
    ConceptOpenedSelect,
    ConceptSelectedRestaurant,
    ConceptSelectedStore,
    ConceptSelectedDistrict,
    ConceptSelectedDistrict2,
    selectedDistrictCrdnt,
} from "../state/atom";
import { useRecoilValue } from "recoil";
import ic_loc from "../assets/ic_location.png";
import ic_store from "../assets/ic_store.png";
import IframeTableu from "./IframeTableu";
import {
    getCategoryStores,
    getKeywordStore,
    getReportUrls,
    getKeyword20,
} from "../api/reportAxios";
import notfound from "../assets/notfound.png";

interface btnActiveProps {
    isBtnClicked: boolean;
    setIsBtnClicked: React.Dispatch<React.SetStateAction<boolean>>;
    reportDoorVisible: boolean;
    setReportDoorVisible: React.Dispatch<React.SetStateAction<boolean>>;
    reportReload: boolean;
    setReportReload: React.Dispatch<React.SetStateAction<boolean>>;
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
    const [selectedCateKw, setSeletedCateKw] = useState("긍정 리뷰");
    const [modalStoreId, setModalStoreId] = useState(0); // 가게상세모달 보여줄 가게 번호
    const [kwStores, setKwStores] = useState([]); // {키워드} 포함한 대표 가게
    const [cateStores, setCateStores] = useState([]); // {카테고리}별 많은 가게
    const [keyword20, setKeyword20] = useState([]);
    const [urls, setUrls] = useState({
        url1: ["", ""],
        url2: "",
        url3: ["", ""],
    });
    const [selectedKeyword, setSelectedKeyword] = useState("");
    const handleSelectChange = (e: string) => {
        setSelectedKeyword(e);
    };
    const [nowDistNStore, setNowDistNStore] = useState([
        selectedDistrict,
        selectedStore ? selectedStore : selectedRestaurant,
    ]);
    useEffect(() => {
        setNowDistNStore([
            selectedDistrict,
            selectedStore ? selectedStore : selectedRestaurant,
        ]);
    }, [props.reportReload]);
    useEffect(() => {
        if (selectedStore != "업종을 선택하세요" && selectedDistrict2 != "") {
            getReportUrls(
                selectedDistrict2,
                selectedStore == "카페" ? selectedStore : selectedRestaurant
            ).then((e) => setUrls(e));
            getKeyword20(
                selectedDistrict2,
                selectedStore == "카페" ? selectedStore : selectedRestaurant
            ).then((e) => setKeyword20(e));
        }
    }, [props.isBtnClicked]);
    useEffect(() => {
        if (keyword20.length > 0) {
            setSelectedKeyword(keyword20[0]["keyword"]);
        }
    }, [keyword20]);
    useEffect(() => {
        getKeywordStore(
            selectedDistrict2,
            selectedStore == "카페" ? selectedStore : selectedRestaurant,
            selectedKeyword
        ).then((e) => setKwStores(e));
    }, [selectedKeyword, props.reportReload]);
    useEffect(() => {
        if (selectedStore != "업종을 선택하세요" && selectedDistrict2 != "") {
            getCategoryStores(
                selectedCateKw,
                selectedDistrict2,
                selectedStore == "카페" ? selectedStore : selectedRestaurant
            ).then((e) => setCateStores(e));
        }
    }, [selectedCateKw, selectedKeyword]);
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
                        잘나가는 가게 키워드
                    </div>
                    {/* <div
                        ref={refClosed}
                        onClick={() => onScroll(refClosed, 3)}
                        className={
                            isFocused == 3
                                ? `${ConceptSlideReportStyle.reportNavEach} ${ConceptSlideReportStyle.reportNavEachSelected}`
                                : `${ConceptSlideReportStyle.reportNavEach}`
                        }
                    >
                        폐업가게분석
                    </div> */}
                </div>
                <div
                    style={{
                        width: "100%",
                        height: "40px",
                        background: "white",
                        boxShadow: " 0px 2px rgba(0,0,0,.1)",
                    }}
                    className={ConceptSlideReportStyle.h50center}
                >
                    <img src={ic_loc} style={{ width: "1rem" }} />
                    {nowDistNStore[0]}
                    <img src={ic_loc} style={{ width: "1rem" }} />
                    {nowDistNStore[1]}
                </div>

                <div className={ConceptSlideReportStyle.reportContentWrap}>
                    <div className={ConceptSlideReportStyle.report3refWrap}>
                        <div
                            ref={refKeyword}
                            className={
                                ConceptSlideReportStyle.report3refEachTitle
                            }
                        >
                            키워드분석
                        </div>

                        <div className={ConceptSlideReportStyle.borderBox}>
                            <div className={ConceptSlideReportStyle.innerTitle}>
                                2023년 1분기 핵심 키워드
                            </div>
                            <div style={{ display: "flex" }}>
                                {urls.url1 && (
                                    <>
                                        <IframeTableu
                                            size="50"
                                            src={urls.url1[0]}
                                            // src="https://public.tableau.com/views/1-test_16851632350350/20231?:language=ko-KR&publish=yes&:display_count=n&:origin=viz_share_link?:showVizHome=no&:embed=true"
                                        />
                                        <IframeTableu
                                            size="50"
                                            src={urls.url1[1]}
                                            // src="https://public.tableau.com/shared/SSNMQJJ9K?:display_count=n&:origin=viz_share_link?:showVizHome=no&:embed=true"
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                        <div className={ConceptSlideReportStyle.borderBox}>
                            <div className={ConceptSlideReportStyle.innerTitle}>
                                {/* <span style={{ color: "var(--red)" }}>
                                    인스타
                                </span> */}
                                <select
                                    className={
                                        ConceptSlideReportStyle.selectStyle
                                    }
                                    onChange={(e) =>
                                        handleSelectChange(
                                            e.currentTarget.value
                                        )
                                    }
                                >
                                    {keyword20 &&
                                        keyword20.map((e: any, i: number) => (
                                            <option value={e.keyword} key={i}>
                                                {e.keyword}
                                            </option>
                                        ))}
                                </select>{" "}
                                가 포함된 대표 가게
                            </div>
                            <div
                                className={
                                    ConceptSlideReportStyle.cateKw3storeWrap
                                }
                            >
                                {kwStores.map((e: any, i: number) => (
                                    <div
                                        onClick={() => {
                                            setModalOpen(true);
                                            setModalStoreId(e.storeId);
                                        }}
                                        className={
                                            ConceptSlideReportStyle.createKw3storeEachWrap
                                        }
                                        key={i}
                                    >
                                        <img
                                            style={{
                                                width: "140px",
                                                borderRadius: "10px",
                                                height: "140px",
                                            }}
                                            src={e.photo ? e.photo : notfound}
                                        />
                                        {e.name}
                                        <div style={{ fontSize: "0.8rem" }}>
                                            {e.keywords.map(
                                                (etag: string, i: number) => (
                                                    <span key={i}>
                                                        #{etag}{" "}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={ConceptSlideReportStyle.borderBox}>
                            <div className={ConceptSlideReportStyle.innerTitle}>
                                핵심 키워드 변화
                            </div>
                            <div>
                                {urls.url2 && (
                                    <IframeTableu
                                        src={urls.url2}
                                        // src="https://public.tableau.com/views/_16854401093190/sheet10?:language=ko-KR&:display_count=n&:origin=viz_share_link?:showVizHome=no&:embed=ture"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={ConceptSlideReportStyle.report3refWrap}>
                        <div
                            ref={refCategory}
                            className={
                                ConceptSlideReportStyle.report3refEachTitle
                            }
                        >
                            잘나가는 가게의 키워드 순위
                        </div>
                        <div
                            className={ConceptSlideReportStyle.cateKw3Container}
                        >
                            <div
                                onClick={() => setSeletedCateKw("긍정 리뷰")}
                                className={
                                    selectedCateKw == "긍정 리뷰"
                                        ? ConceptSlideReportStyle.cateKw3eachSelected
                                        : ConceptSlideReportStyle.cateKw3each
                                }
                            >
                                긍정 리뷰
                            </div>
                            <div
                                onClick={() => setSeletedCateKw("단골")}
                                className={
                                    selectedCateKw == "단골"
                                        ? ConceptSlideReportStyle.cateKw3eachSelected
                                        : ConceptSlideReportStyle.cateKw3each
                                }
                            >
                                단골
                            </div>
                            <div
                                onClick={() => setSeletedCateKw("뜨고 있는")}
                                className={
                                    selectedCateKw == "뜨고 있는"
                                        ? ConceptSlideReportStyle.cateKw3eachSelected
                                        : ConceptSlideReportStyle.cateKw3each
                                }
                            >
                                뜨고 있는
                            </div>
                        </div>
                        <div className={ConceptSlideReportStyle.borderBox}>
                            <div className={ConceptSlideReportStyle.innerTitle}>
                                {selectedCateKw == "뜨고 있는"
                                    ? "뜨고 있는 가게"
                                    : selectedCateKw == "단골"
                                    ? "단골이 많은 가게"
                                    : "긍정 리뷰가 많은 가게"}
                            </div>
                            <div
                                className={
                                    ConceptSlideReportStyle.cateKw3storeWrap
                                }
                            >
                                {cateStores.map((e: any, i: number) => (
                                    <div
                                        onClick={() => {
                                            setModalOpen(true);
                                            setModalStoreId(e.id);
                                        }}
                                        className={
                                            ConceptSlideReportStyle.createKw3storeEachWrap
                                        }
                                        key={i}
                                    >
                                        <img
                                            style={{
                                                width: "140px",
                                                height: "140px",
                                                borderRadius: "10px",
                                            }}
                                            src={e.photo ? e.photo : notfound}
                                        />
                                        {e.name}
                                        <div style={{ fontSize: "0.8rem" }}>
                                            {e.keywords &&
                                                e.keywords.map(
                                                    (
                                                        etag: string,
                                                        i: number
                                                    ) => (
                                                        <span key={i}>
                                                            #{etag}{" "}
                                                        </span>
                                                    )
                                                )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={ConceptSlideReportStyle.borderBox}>
                            <div className={ConceptSlideReportStyle.innerTitle}>
                                키워드 순위
                            </div>
                            <div className={ConceptSlideReportStyle.innerSub}>
                                {selectedCateKw == "뜨고 있는"
                                    ? "뜨고 있는 가게"
                                    : selectedCateKw == "단골"
                                    ? "단골이 많은 가게"
                                    : "긍정 리뷰가 많은 가게"}
                                의 키워드입니다.
                            </div>
                            <div>
                                {urls.url3 && (
                                    <IframeTableu
                                        src={
                                            urls.url3[
                                                selectedCateKw == "긍정 리뷰"
                                                    ? 0
                                                    : selectedCateKw == "단골"
                                                    ? 1
                                                    : 2
                                            ]
                                        }
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    {/* <div className={ConceptSlideReportStyle.report3refWrap}>
                        <div ref={refClosed} className={ConceptSlideReportStyle.report3refEachTitle}>폐업 가게 분석</div>
                        <div className={ConceptSlideReportStyle.borderBox}>
                            <div className={ConceptSlideReportStyle.innerTitle}>잘나가는 가게 vs 폐업한 가게 키워드</div>
                            <div>
                                <iframe
                                    id="myframe"
                                    src={
                                        "https://public.tableau.com/shared/MBGJCGPGD?:display_count=n&:origin=viz_share_link?:showVizHome=no&:embed=true&%ED%96%89%EC%A0%95%EB%8F%99=%EA%B0%80%ED%9A%8C%EB%8F%99&%EC%97%85%EC%A2%85=%EB%8F%99%EB%82%A8%EC%95%84%EC%8B%9C%EC%95%84&%EA%B0%80%EA%B2%8C%EB%AA%85=%EB%B0%98%ED%83%80%EC%9D%B4&%EA%B0%80%EA%B2%8C%EB%AA%85=%EB%B0%98%ED%83%80%EC%9D%B4"
                                    }
                                    width="100%"
                                    height="300"
                                    title="분석 보고서"
                                />{" "}
                            </div>
                        </div>
                    </div> */}
                </div>

                {modalOpen && (
                    <>
                        <StoreModal
                            modalOpen={modalOpen}
                            setModalOpen={setModalOpen}
                            modalStoreId={modalStoreId}
                        />
                    </>
                )}

                <STconceptSlideReportDoor
                    style={{ display: props.isBtnClicked ? "" : "none" }}
                    onClick={() => {
                        props.setReportDoorVisible(!props.reportDoorVisible);
                    }}
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
