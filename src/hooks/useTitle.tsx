import { useEffect, useState } from "react";

const useTitle = (newtitle: string) => {
    const [title, setTitle] = useState(newtitle);

    const updateTitle = () => {
        const htmlTitle = document.querySelector("title");
        if (htmlTitle) {
            htmlTitle.innerText = title;
        }
    };
    useEffect(updateTitle, [title]);

    return setTitle;
};
export default useTitle;
