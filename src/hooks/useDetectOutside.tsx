import { useEffect, useState, useRef, useCallback } from "react";

const useDetectOutside = (init: boolean) => {
    const [isOpen, setIsOpen] = useState(init);
    const ref = useRef<HTMLDivElement>(null); //ref는 모달창에 걸것임

    const modalHandler = () => {
        setIsOpen(!isOpen);
    };
    const handleOutsideClick = (e: any) => {
        if (ref.current !== null && !ref.current.contains(e.target)) {
            setIsOpen(!isOpen); //모달(ref에설정된) 외부를 클릭하면 모달오픈 닫음
        }
    };
    useEffect(() => {
        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, [handleOutsideClick]);

    return [isOpen, ref, modalHandler];
};

export default useDetectOutside;
