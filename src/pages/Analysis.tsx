import React, { useState } from "react";
import Layout from "./Layout";
import ReportLayout from "./ReportLayout";
import { DistrictSelectBox, StoreSelectBox } from "../components/SelectBox";
import { useRecoilState } from "recoil";
import {
    AnalysisSelectedStore,
    SiteOpenedSelect,
    AnalysisSelectedDistrict,
    AnalysisSelectedRestaurant,
} from "../state/atom";
import SelectStyle from "../styles/SelectBox.module.css";

const Analysis = () => {
    const SelectBlock = () => {
        const [selectedDistrict, setSelectedDistrict] = useRecoilState(
            AnalysisSelectedDistrict
        );
        const [selectedStore, setSelectedStore] = useRecoilState(
            AnalysisSelectedStore
        );
        const [openedSelect, setOpenedSelect] =
            useRecoilState(SiteOpenedSelect);
        const [selectedRestaurant, setSelectedRestaurant] = useRecoilState(
            AnalysisSelectedRestaurant
        );
        console.log(
            "store,distirct",
            selectedStore,
            selectedDistrict,
            openedSelect
        );
        return (
            <>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                    }}
                >
                    <DistrictSelectBox
                        state={selectedDistrict}
                        changeState={(e: any) => setSelectedDistrict(e)}
                        openId={3}
                        handleOnclick={() => {
                            if (openedSelect != 3) {
                                setOpenedSelect(3);
                            } else {
                                setOpenedSelect(0);
                            }
                        }}
                    />
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
                                setOpenedSelect(1);
                            } else {
                                setOpenedSelect(1);
                            }
                        }}
                    />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div
                        className={
                            (selectedStore == "카페" &&
                                selectedDistrict != "지역을 선택하세요") ||
                            (selectedRestaurant != "" &&
                                selectedDistrict != "지역을 선택하세요")
                                ? `${SelectStyle.clickableReportBtn} ${SelectStyle.reportBtn}`
                                : `${SelectStyle.reportBtn}`
                        }
                        onClick={() =>
                            console.log(selectedStore, selectedDistrict)
                        }
                    >
                        분석하기
                    </div>
                </div>
            </>
        );
    };
    return (
        <>
            <Layout idx={3}>
                <ReportLayout
                    title="지역별 상권 분석"
                    childrenSelectWrap={<SelectBlock />}
                >
                    <div>여기는 리포트</div>
                </ReportLayout>
            </Layout>
        </>
    );
};
export default Analysis;
