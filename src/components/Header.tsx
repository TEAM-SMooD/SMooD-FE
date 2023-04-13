import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import main_logo from "../assets/main_logo.png";
import headerStyle from "../styles/HeaderStyle.module.css";
import kakao_login from "../assets/kakao_login.png";

interface HeaderProps {
    idx: number;
}

const Header = (props: HeaderProps) => {
    const headermenu = ["컨셉 추천", "지역 추천", "지역별 상권분석"];
    const headerPath = ["concept", "site", "analysis"];
    const navigate = useNavigate();
    const path = useLocation();

    return (
        <header className={headerStyle.header}>
            <div className={headerStyle.pointer}>
                <img
                    src={main_logo}
                    className={headerStyle.logo}
                    onClick={() => navigate("/")}
                />
            </div>
            <div className={`${headerStyle.pointer} ${headerStyle.menubar}`}>
                {headermenu.map((e: string, idx: number) => (
                    <div
                        className={`${
                            path.pathname.slice(1) === headerPath[idx]
                                ? headerStyle.menuEachSelected
                                : headerStyle.menuEach
                        }`}
                        key={idx}
                        onClick={() => {
                            navigate(`/${headerPath[idx]}`);
                        }}
                    >
                        <div>{e}</div>
                    </div>
                ))}
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <a href={process.env.REACT_APP_KAKAO_AUTH_URL}>
                    <img src={kakao_login} />
                </a>
            </div>
        </header>
    );
};

export default Header;
