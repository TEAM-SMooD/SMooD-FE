import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import main_logo from "../assets/main_logo.png";
import headerStyle from "../styles/HeaderStyle.module.css";

interface HeaderProps {
    idx: number;
}

const Header = (props: HeaderProps) => {
    const headermenu = ["컨셉 추천", "지역 추천", "지역별 상권분석"];
    const headerPath = ["concept", "site", "analysis"];
    const navigate = useNavigate();

    return (
        <header className={headerStyle.header}>
            <div className={headerStyle.pointer}>
                <img
                    src={main_logo}
                    className={headerStyle.logo}
                    onClick={() => navigate("/")}
                />
            </div>
            <div className={`${headerStyle.pointer} ${headerStyle.menueach}`}>
                {headermenu.map((e: string, idx: number) => (
                    <div
                        className={headerStyle.pointer}
                        key={idx}
                        onClick={() => {
                            navigate(`/${headerPath[idx]}`);
                        }}
                    >
                        {e}
                    </div>
                ))}
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div>[ 로그인</div>
                <div>|</div>
                <div>회원가입 ]</div>
            </div>
        </header>
    );
};

export default Header;
