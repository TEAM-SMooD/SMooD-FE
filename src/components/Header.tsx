import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import main_logo from "../assets/main_logo.png";
import headerStyle from "../styles/HeaderStyle.module.css";
import { useRecoilState } from "recoil";
import { menuState } from "../state/atom";

interface HeaderProps {
    idx: number;
}

const Header = (props: HeaderProps) => {
    const headermenu = ["컨셉 추천", "지역 추천", "지역별 상권분석"];
    const headerPath = ["concept", "site", "analysis"];
    const navigate = useNavigate();
    const [menu, setMenu] = useRecoilState(menuState);
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
                            menu === headerPath[idx]
                                ? headerStyle.menuEachSelected
                                : headerStyle.menuEach
                        }`}
                        key={idx}
                        onClick={() => {
                            setMenu(headerPath[idx]);
                            navigate(`/${headerPath[idx]}`);
                        }}
                    >
                        {/* {e} */}
                        <div>{e}</div>
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
