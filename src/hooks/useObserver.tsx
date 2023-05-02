import { useEffect, useRef } from "react";

export const useObserver = (
    navNumber: number,
    setNavNumber: React.Dispatch<React.SetStateAction<number>>
) => {
    const options = {};
    const refElement = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const osv = new IntersectionObserver((entries, observer) => {
            // console.log(entries[0].isIntersecting);
            if (entries[0].isIntersecting) {
                setNavNumber(navNumber);
            }
        }, options);
        if (refElement.current) {
            osv.observe(refElement.current);
        }
        return () => osv.disconnect();
    }, []);
    return refElement;
};
