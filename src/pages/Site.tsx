import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import ReportLayout from "./ReportLayout";
import { StoreSelectBox, ConceptSelectBox } from "../components/SelectBox";
import { useRecoilState } from "recoil";
import {
    SiteSelectedStore,
    SiteSelectedConcept,
    SiteOpenedSelect,
    SiteSelectedRestaurant,
} from "../state/atom";
import SelectStyle from "../styles/SelectBox.module.css";

const Site = () => {
    const [selectedStore, setSelectedStore] = useRecoilState(SiteSelectedStore);
    const [selectedConcept, setSelectedConcept] =
        useRecoilState(SiteSelectedConcept);
    const [selectedRestaurant, setSelectedRestaurant] = useRecoilState(
        SiteSelectedRestaurant
    );
    const [selectedAll, setSelectedAll] = useState(false);
    const [reportOpen, setReportOpen] = useState(false);

    useEffect(() => {
        if (
            (selectedStore == "카페" && selectedConcept.length != 1) ||
            (selectedRestaurant != "" && selectedConcept.length != 1)
        ) {
            setSelectedAll(true);
        } else {
            setSelectedAll(false);
        }
        setReportOpen(false);
    }, [selectedStore, selectedRestaurant, selectedConcept]);

    const SelectBlock = () => {
        const [openedSelect, setOpenedSelect] =
            useRecoilState(SiteOpenedSelect);
        return (
            <>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                    }}
                >
                    <StoreSelectBox
                        state={selectedStore}
                        changeState={(e: any) => setSelectedStore(e)}
                        resState={selectedRestaurant}
                        resChangeState={setSelectedRestaurant}
                        openId={1}
                        handleOnclick={() => {
                            if (selectedStore != "업종을 선택하세요") {
                                setSelectedStore("업종을 선택하세요");
                                setSelectedRestaurant("");
                            }
                            if (openedSelect != 1) {
                                setOpenedSelect(1);
                            } else {
                                setOpenedSelect(0);
                            }
                        }}
                        openedSelect={openedSelect}
                        setOpenedSelect={setOpenedSelect}
                    />
                    <ConceptSelectBox
                        state={selectedConcept}
                        changeState={(each: any) => {
                            if (selectedConcept.includes(each)) {
                                const changeConcept = selectedConcept.filter(
                                    (e) => e != each
                                );
                                setSelectedConcept(changeConcept);
                            } else {
                                setSelectedConcept((prev) => [...prev, each]);
                            }
                        }}
                        openId={2}
                        handleOnclick={() => {
                            if (openedSelect != 2) {
                                setOpenedSelect(2);
                            } else {
                                setOpenedSelect(0);
                            }
                        }}
                        openedSelect={openedSelect}
                        setOpenedSelect={setOpenedSelect}
                    />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button
                        className={
                            selectedAll
                                ? `${SelectStyle.clickableReportBtn} ${SelectStyle.reportBtn}`
                                : `${SelectStyle.reportBtn}`
                        }
                        onClick={() => {
                            setReportOpen(true);
                            setOpenedSelect(0);
                        }}
                        disabled={!selectedAll}
                    >
                        분석하기
                    </button>
                </div>
            </>
        );
    };
    return (
        <>
            <Layout idx={2}>
                <ReportLayout
                    title="지역 추천"
                    childrenSelectWrap={<SelectBlock />}
                >
                    {reportOpen && (
                        <div>
                            여기는 리포트 - -{selectedStore}
                            {selectedRestaurant}
                            {selectedConcept}
                        </div>
                    )}
                </ReportLayout>
            </Layout>
        </>
    );
};
export default Site;
