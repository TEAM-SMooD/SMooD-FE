import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import home_cream from "../assets/home_cream.jpg";
import home_logo from "../assets/home_logo.png";
import { StHome, StCreamImg, StLogo, SThomeBtn } from "../styles/HomeST";
const Home = () => {
    const navigate = useNavigate();

    return (
        <StHome>
            <StCreamImg src={home_cream} />
            <StLogo src={home_logo} />
            <div style={{ display: "flex", gap: "100px", marginTop: "3rem" }}>
                <SThomeBtn onClick={() => navigate("/concept")}>
                    컨셉 추천
                </SThomeBtn>
                <SThomeBtn onClick={() => navigate("/site")}>
                    지역 추천
                </SThomeBtn>
            </div>
        </StHome>
    );
};
export default Home;
