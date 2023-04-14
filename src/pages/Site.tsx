import React, { useState } from "react";
import Layout from "./Layout";
import ReportLayout from "./ReportLayout";
import { StSelectbox } from "../styles/ConceptST";
import ic_concept from "../assets/ic_concept.png";
import ic_arrow from "../assets/ic_arrow.png";
import { colors } from "../styles/designSystem";

const Site = () => {
    const Test = () => {
        return (
            <>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                    }}
                >
                    <StSelectbox
                        style={{
                            width: "30%",
                            margin: "0",
                            justifyContent: "space-between",
                        }}
                    >
                        <div
                            style={{
                                padding: "3% 5%",
                                display: "grid",
                                width: "100%",
                                gridTemplateColumns: "25px auto 25px",
                                alignItems: "center",
                            }}
                        >
                            <img
                                src={ic_concept}
                                style={{ width: "19px", height: "19px" }}
                            />
                            <div>업종을 선택하세요</div>
                            <img
                                src={ic_arrow}
                                style={{
                                    rotate: "180deg",
                                    width: "24px",
                                }}
                            />
                        </div>
                    </StSelectbox>
                    <StSelectbox
                        style={{
                            width: "30%",
                            margin: "0",
                            justifyContent: "space-between",
                        }}
                    >
                        <div
                            style={{
                                padding: "3% 5%",
                                display: "grid",
                                width: "100%",
                                gridTemplateColumns: "25px auto 25px",
                                alignItems: "center",
                            }}
                        >
                            <img
                                src={ic_concept}
                                style={{ width: "19px", height: "19px" }}
                            />
                            <div>컨셉을 선택하세요</div>
                            <img
                                src={ic_arrow}
                                style={{
                                    rotate: "180deg",
                                    width: "24px",
                                }}
                            />
                        </div>
                    </StSelectbox>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div
                        style={{
                            width: "110px",
                            background: "#D9D9D9",
                            color: "#727272",
                            display: "flex",
                            justifyContent: "center",
                            height: "37px",
                            alignItems: "center",
                            borderRadius: "10px",
                        }}
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
                <ReportLayout title="지역 추천" childrenSelectWrap={<Test />}>
                    <div>여기는 리포트</div>
                </ReportLayout>
            </Layout>
        </>
    );
};
export default Site;
