import React, { useEffect, useState } from "react";
import { StSelectbox, StWrap } from "../styles/ConceptST";
import { colors } from "../styles/designSystem";
import ic_arrow from "../assets/ic_arrow.png";
import ConceptStyle from "../styles/ConceptStyle.module.css";
import ic_location from "../assets/ic_location.png";
import ic_store from "../assets/ic_store.png";
import ic_concept from "../assets/ic_concept.png";

const ConceptModal = () => {
    const [modalOpen, setModalOpen] = useState(true);
    return (
        <>
            <StWrap>
                <div className={ConceptStyle.modalContents}>
                    <div style={{ fontWeight: "bold", color: colors.red }}>
                        컨셉 추천
                    </div>
                    <div
                        style={{
                            marginTop: "15px",
                            display: !modalOpen ? "none" : "",
                        }}
                    >
                        <StSelectbox>
                            <img
                                src={ic_location}
                                style={{ width: "17px", height: "17px" }}
                            />
                            먀?
                        </StSelectbox>
                        <StSelectbox>
                            <img
                                src={ic_concept}
                                style={{ width: "17px", height: "17px" }}
                            />
                            먀?
                        </StSelectbox>
                    </div>
                </div>
                <div
                    className={ConceptStyle.modalArrow}
                    onClick={() => setModalOpen(!modalOpen)}
                >
                    <img
                        className={ConceptStyle.modalArrowImg}
                        src={ic_arrow}
                        color={colors.red}
                        style={{
                            rotate: modalOpen ? "180deg" : "",
                        }}
                    />
                </div>
            </StWrap>
        </>
    );
};
export default ConceptModal;
