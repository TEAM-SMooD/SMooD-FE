import React, { useState } from "react";
import Layout from "./Layout";
import ReportLayout from "./ReportLayout";
import { STselectbox, STselectWrap, STicons } from "../styles/SelectST";
import ic_concept from "../assets/ic_concept.png";
import ic_arrow from "../assets/ic_arrow.png";
import { StoreSelectBox, DistrictSelectBox } from "../components/SelectBox";
import { useRecoilState } from "recoil";
import {
    SiteSelectedStore,
    SiteSelectedConcept,
    SiteOpenedSelect,
    SiteSelectedDistrict,
    SiteSelectedRestaurant,
} from "../state/atom";
import SelectStyle from "../styles/SelectBox.module.css";
const Site = () => {
    const SelectBlock = () => {
        const [selectedStore, setSelectedStore] =
            useRecoilState(SiteSelectedStore);
        const [selectedConcept, setSelectedConcept] =
            useRecoilState(SiteSelectedConcept);
        const [selectedDistrict, setSelectedDistrict] =
            useRecoilState(SiteSelectedDistrict);
        const [openedSelect, setOpenedSelect] =
            useRecoilState(SiteOpenedSelect);
        const [selectedRestaurant, setSelectedRestaurant] = useRecoilState(
            SiteSelectedRestaurant
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
                    <StoreSelectBox
                        openId={1}
                        handleOnclick={() => setOpenedSelect(1)}
                    />
                    <DistrictSelectBox
                        openId={2}
                        handleOnclick={() => setOpenedSelect(2)}
                    />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div
                        className={
                            selectedRestaurant != "" &&
                            selectedDistrict != "지역을 선택하세요"
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
            <Layout idx={2}>
                <ReportLayout
                    title="지역 추천"
                    childrenSelectWrap={<SelectBlock />}
                >
                    <div>여기는 리포트</div>
                </ReportLayout>
            </Layout>
        </>
    );
};
export default Site;
