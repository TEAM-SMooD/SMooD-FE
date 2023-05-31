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
import notfound from "../assets/notfound.png";

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

    const [modalOpen, setModalOpen] = useState(false);

    const [modalStoreId, setModalStoreId] = useState(0); // 가게상세모달 보여줄 가게 번호
    const [sortSite, setSortSite] = useState("전체");
    const [sortCate, setSortCate] = useState("긍정 리뷰");
    const [siteTop3, setSiteTop3] = useState([]);
    const [siteStores, setSiteStores] = useState([]); // {카테고리}별 많은 가게
    useEffect(() => {
        function scrollListener() {
            window.addEventListener("scroll", props.handleScroll);
        }
        scrollListener();
        return () => {
            window.removeEventListener("scroll", props.handleScroll);
        };
    });
    useEffect(() => {
        const category =
            selectedStore == "카페" ? selectedStore : selectedRestaurant;
        const k1 = selectedConcept[1];
        const k2 = selectedConcept[2] ? selectedConcept[2] : "";
        const k3 = selectedConcept[3] ? selectedConcept[3] : "";
        getSiteTop3(category, k1, k2, k3).then((e) => setSiteTop3(e));
    }, []);
    useEffect(() => {
        const category =
            selectedStore == "카페" ? selectedStore : selectedRestaurant;
        const k1 = selectedConcept[1];
        const k2 = selectedConcept[2] ? selectedConcept[2] : "";
        const k3 = selectedConcept[3] ? selectedConcept[3] : "";
        getSiteStores(sortSite, sortCate, category, k1, k2, k3).then((e) =>
            setSiteStores(e)
        );
    }, [sortSite, sortCate]);
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
                    {siteTop3 && (
                        <div className={AnalysisReportStyle.reportPiesWrap}>
                            {siteTop3.map((e: any, i: number) => (
                                <div key={i}>
                                    <PieChart
                                        style={{ height: "auto" }}
                                        data={[
                                            {
                                                value: e.percentage,
                                                color: "#faa8a5",
                                                name: "name1",
                                            },
                                        ]}
                                        reveal={e.percentage}
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
                                                {i + 1}위
                                            </div>
                                            <div>{e.name}</div>
                                        </div>
                                        <div style={{ fontSize: "0.8rem" }}>
                                            {e.storeSum} 곳 중 {e.keywordSum}
                                            곳이 키워드를 포함하고 있습니다.
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
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
                            gap: "2rem",
                            paddingBottom: "10px",
                        }}
                    >
                        <select
                            className={AnalysisReportStyle.selectStyle}
                            onChange={(e) => setSortSite(e.currentTarget.value)}
                        >
                            {[
                                "전체",
                                "성수1가 제1동",
                                "성수1가 제2동",
                                "성수2가 제1동",
                                "성수2가 제3동",
                                "가회동",
                                "삼청동",
                                "신촌동",
                            ].map((e: any, i: number) => (
                                <option key={i} value={e}>
                                    {e}
                                </option>
                            ))}
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
                        {siteStores &&
                            siteStores.map((e: any, i: number) => (
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
                                     referrerPolicy="no-referrer"
                                        style={{
                                            width: "170px",
                                            height: "170px",
                                            borderRadius: "10px",
                                        }}
                                        src={e.photo ? e.photo : notfound}
                                    />
                                    {e.name}
                                    <div style={{ fontSize: "0.8rem" }}>
                                        {e.keywords &&
                                            e.keywords.map(
                                                (
                                                    ekeyword: string,
                                                    i: number
                                                ) => (
                                                    <span key={i}>
                                                        #{ekeyword}{" "}
                                                    </span>
                                                )
                                            )}
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
