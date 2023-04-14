import React, { useState } from "react";
import Layout from "./Layout";
import ReportLayout from "./ReportLayout";

const Site = () => {
    const [a, setA] = useState("z");
    const Test = () => {
        return (
            <>
                <div onClick={() => setA("asdf")}>여기 업종이랑 뭐 선택</div>
                <div>분석하기버튼</div>
            </>
        );
    };
    return (
        <>
            <Layout idx={2}>
                <ReportLayout title="지역 추천" childrenSelectWrap={<Test />}>
                    <div>{a}여기는 리포트</div>
                </ReportLayout>
            </Layout>
        </>
    );
};
export default Site;
