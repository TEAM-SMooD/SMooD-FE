import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { StWrap } from "../styles/Concept";
import ConceptModal from "../components/ConceptModal";

const kakao = (window as any).kakao;

const Concept = () => {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);

    useEffect(() => {
        const resizeListener = () => {
            setInnerWidth(window.innerWidth);
            setInnerHeight(window.innerHeight);
        };
        window.addEventListener("resize", resizeListener);
        const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스 호출에서 지정
        const options = {
            //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(
                37.54425914722608,
                127.03765846378526
            ), //지도의 중심좌표
            level: 5, //지도의 레벨(확대, 축소 정도)
        };
        const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    }, []);

    return (
        <>
            <Layout idx={1}>
                <div
                    id="map"
                    style={{ width: innerWidth, height: innerHeight - 70 }}
                ></div>
                <ConceptModal />
            </Layout>
        </>
    );
};
export default Concept;
