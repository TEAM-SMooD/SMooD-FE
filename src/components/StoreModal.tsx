import React, { useEffect, useRef, useState } from "react";
// import useDetectOutside from "../hooks/useDetectOutside";

interface StoreModalProps {
    modalOpen: boolean;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const StoreModal = (props: StoreModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const closeModal = () => {
        props.setModalOpen(false);
    };
    useEffect(() => {
        const handleOutsideClick = (e: any) => {
            console.log("modalREf", modalRef.current);
            console.log(e.target);
            // console.log("??", );
            if (
                modalRef.current &&
                !modalRef.current.contains(e.target) &&
                e.target.innerHTML != "모달오픈!" //////////////////////이게아닐텐데 어떡할까요 ㅠ ㅅ ㅠ!
            ) {
                props.setModalOpen(false); //모달(ref에설정된) 외부를 클릭하면 모달오픈 닫음
                console.log("g");
            }
        };
        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    });

    // const [modalOpen, modalRef, modalHandler] = useDetectOutside(false);
    return (
        <div ref={modalRef}>
            <p>모달창인디</p>
        </div>
    );
};

export default StoreModal;
