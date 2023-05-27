import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import AnalysisReportStyle from "../styles/AnalysisStyle.module.css";
import ConceptSlideReportStyle from "../styles/ConceptSlideReport.module.css";
import { STreportMenuEach } from "../styles/AnalysisST";
import {
    SiteSelectedStore,
    SiteSelectedRestaurant,
    SiteSelectedConcept,
} from "../state/atom";
import { colors } from "../styles/designSystem";
import { PieChart } from "react-minimal-pie-chart";
import { getSiteStores, getSiteTop3 } from "../api/reportAxios";
import StoreModal from "./StoreModal";

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
    const [modalOpen, setModalOpen] = useState(false);

    const [modalStoreId, setModalStoreId] = useState(0); // 가게상세모달 보여줄 가게 번호
    const [sortSite, setSortSite] = useState("");
    const [sortCate, setSortCate] = useState("");
    const [siteTop3, setSiteTop3] = useState([
        {
            rank: 1,
            site: "성수1가2동",
            kw: [20, 30],
            pct: 88,
        },
        {
            rank: 2,
            site: "신촌동",
            kw: [14, 25],
            pct: 71.4,
        },
        {
            rank: 3,
            site: "성수2가1동",
            kw: [21, 31],
            pct: 61.9,
        },
    ]);
    const [siteStores, setSiteStores] = useState([
        {
            name: "아오이비스트로",
            imgsrc: "https://d12zq4w4guyljn.cloudfront.net/300_300_20220313131218_photo1_da5845cfa3c2.jpg",
            tag: ["분위기", "데이트", "인스타"],
            storeId: 123213,
        },
        {
            name: "성수먕당",
            imgsrc: "https://d12zq4w4guyljn.cloudfront.net/300_300_20220313131218_photo1_da5845cfa3c2.jpg",
            tag: ["저ㅗㄴ맛", "데이트", "인스타"],
            storeId: 13543,
        },
        {
            name: "차만다",
            imgsrc: "https://d12zq4w4guyljn.cloudfront.net/300_300_20220313131218_photo1_da5845cfa3c2.jpg",
            tag: ["힙함", "데이트", "인스타"],
            storeId: 4213,
        },
    ]); // {카테고리}별 많은 가게
    useEffect(() => {
        function scrollListener() {
            window.addEventListener("scroll", props.handleScroll);
        }
        scrollListener();
        return () => {
            window.removeEventListener("scroll", props.handleScroll);
        };
    });
    // useEffect(() => { //서버버ㅓ
    //     getSiteTop3().then((e)=> setSiteTop3(e));
    // })
    // useEffect(() => {
    //     getSiteStores().then((e) => setSiteStores(e));
    // }, [sortSite,sortCate]) // 서버버
    return (
        <>
            <div
                className={AnalysisReportStyle.reportInnerWrap}
                style={{
                    paddingTop: props.menuFixed ? "140px" : "10px",
                }}
            >
                <div className={AnalysisReportStyle.borderBox}>
                    <div className={AnalysisReportStyle.reportTitle}>
                        {selectedConcept.map((e: any, i: number) => (
                            <span key={i} style={{ color: "var(--red" }}>
                                {i != 0 && "#"}
                                {e}
                                &nbsp;
                            </span>
                        ))}
                        이(가) 포함된{" "}
                        <span style={{ color: "var(--red" }}>
                            {selectedStore}
                            {selectedRestaurant && `(${selectedRestaurant})`}
                        </span>
                        이(가) 가장 많은 지역은
                    </div>
                    <div className={AnalysisReportStyle.reportPiesWrap}>
                        {siteTop3.map((e: any, i: number) => (
                            <div key={i}>
                                <PieChart
                                    style={{ height: "auto" }}
                                    data={[
                                        {
                                            value: e.pct,
                                            color: "#faa8a5",
                                            name: "name1",
                                        },
                                    ]}
                                    reveal={e.pct}
                                    lineWidth={40}
                                    background="#f3f3f3"
                                    lengthAngle={360}
                                    animate
                                    startAngle={-90}
                                    label={({ dataEntry }) =>
                                        dataEntry.value + "%"
                                    }
                                    labelStyle={{
                                        fontSize: "13px",
                                        fill: "#33333",
                                    }}
                                    labelPosition={0}
                                    // rounded={true}
                                />
                                <div
                                    className={
                                        AnalysisReportStyle.reportPieUnderWrap
                                    }
                                >
                                    <div
                                        className={
                                            AnalysisReportStyle.reportPieUnderTitle
                                        }
                                    >
                                        <div
                                            style={{
                                                color: "var(--red)",
                                                fontSize: "1.5rem",
                                            }}
                                        >
                                            {e.rank}위
                                        </div>
                                        <div>{e.site}</div>
                                    </div>
                                    <div style={{ fontSize: "0.8rem" }}>
                                        {e.kw[0]} 개 중 {e.kw[1]}개의 키워드를
                                        포함하고 있습니다.
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={AnalysisReportStyle.borderBox}>
                    <div className={AnalysisReportStyle.reportTitle}>
                        {selectedConcept.map((e: any, i: number) => (
                            <span key={i} style={{ color: "var(--red" }}>
                                {i != 0 && "#"}
                                {e}{" "}
                            </span>
                        ))}
                        이(가) 포함된 대표{" "}
                        <span style={{ color: "var(--red" }}>
                            {selectedStore}
                            {selectedRestaurant && `(${selectedRestaurant})`}
                        </span>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            gap: "1rem",
                            paddingBottom: "10px",
                        }}
                    >
                        <select
                            className={AnalysisReportStyle.selectStyle}
                            onChange={(e) => setSortSite(e.currentTarget.value)}
                        >
                            {["북촌", "성수", "신촌"].map(
                                (e: any, i: number) => (
                                    <option key={i} value={e}>
                                        {e}
                                    </option>
                                )
                            )}
                        </select>
                        <select
                            className={AnalysisReportStyle.selectStyle}
                            onChange={(e) => setSortCate(e.currentTarget.value)}
                        >
                            {["긍정 리뷰", "단골", "뜨고 있는"].map(
                                (e: any, i: number) => (
                                    <option key={i} value={e}>
                                        {e}
                                    </option>
                                )
                            )}
                        </select>
                    </div>
                    <div className={ConceptSlideReportStyle.cateKw3storeWrap}>
                        {siteStores.map((e: any, i: number) => (
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
                                        width: "100px",
                                        borderRadius: "10px",
                                    }}
                                    src={e.imgsrc}
                                />
                                {e.name}
                                <div style={{ fontSize: "0.8rem" }}>
                                    {e.tag.map((etag: string, i: number) => (
                                        <span key={i}>#{etag} </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {modalOpen && (
                <StoreModal
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    modalStoreId={modalStoreId}
                />
            )}
        </>
    );
};

export default SiteReport;
