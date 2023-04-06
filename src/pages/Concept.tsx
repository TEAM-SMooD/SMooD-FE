import React from "react";
import Layout from "./Layout";
import { useRecoilState } from "recoil";
import { menuState } from "../state/atom";

const Concept = () => {
    const [menu, setMenu] = useRecoilState(menuState);
    return (
        <>
            <Layout idx={1}>
                <div>컨셉 추천 본문</div>
            </Layout>
        </>
    );
};
export default Concept;
