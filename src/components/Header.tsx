import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import main_logo from "../assets/main_logo.png";

interface HeaderProps {
    idx: number;
}

const Header = (props: HeaderProps) => {
    const headermenu = ["컨셉 추천", "지역 추천", "지역별 상권분석"];
    const headerPath = ["concept", "site", "analysis"];
    const navigate = useNavigate();

    return (
        <header
            style={{
                background: "white",
                height: "70px",
                display: "grid",
                gridTemplateColumns: "255px 1fr auto",
                flexDirection: "row",
                position: "fixed",
                width: "100%",
                alignItems: "center",
                padding: "0 40px",
            }}
        >
            <img
                src={main_logo}
                style={{ width: "155px", height: "50px" }}
                onClick={() => navigate("/")}
            />
            <div style={{ display: "flex", flexDirection: "row", gap: "39px" }}>
                {headermenu.map((e: string, idx: number) => (
                    <div
                        key={idx}
                        onClick={(e) => {
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
