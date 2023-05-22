import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import home_cream from "../assets/home_cream.jpg";
import home_logo from "../assets/home_logo.png";
import home_ic_store from "../assets/home_ic_store.png";
import home_ic_store_red from "../assets/home_ic_store_red.png";
import home_ic_map from "../assets/home_ic_map.png";
import home_ic_map_red from "../assets/home_ic_map_red.png";
import {
    StHome,
    StCreamImg,
    StLogo,
    SThomeBtn,
    SThomeIc,
} from "../styles/HomeST";
import useTitle from "../hooks/useTitle";

const Home = () => {
    const navigate = useNavigate();
    const [isHover, setIsHover] = useState(0);
    const changeTitle = useTitle("");
    useEffect(() => {
        changeTitle("SMooD");
    });
    return (
        <StHome>
            <StCreamImg src={home_cream} />
            <StLogo src={home_logo} />

            <div style={{ display: "flex", gap: "100px", marginTop: "3rem" }}>
                <SThomeBtn
                    onClick={() => navigate("/concept")}
                    onMouseOver={() => setIsHover(1)}
                    onMouseOut={() => setIsHover(0)}
                >
                    {isHover == 1 ? (
                        <SThomeIc src={home_ic_store_red} />
                    ) : (
                        <SThomeIc src={home_ic_store} />
                    )}
                    <div style={{ fontSize: "2rem", padding: "25px 0px 20px" }}>
                        컨셉 추천
                    </div>
                    <div>가게 컨셉을 아직 못 정했어요</div>
                </SThomeBtn>
                <SThomeBtn
                    onClick={() => navigate("/site")}
                    onMouseOver={() => setIsHover(2)}
                    onMouseOut={() => setIsHover(0)}
                >
                    {isHover == 2 ? (
                        <SThomeIc src={home_ic_map_red} />
                    ) : (
                        <SThomeIc src={home_ic_map} />
                    )}
                    <div style={{ fontSize: "2rem", padding: "25px 0px 20px" }}>
                        지역 추천
                    </div>
                    <div>어디에 내 가게를 내면 좋을까요?</div>
                </SThomeBtn>
            </div>
        </StHome>
    );
};
export default Home;
