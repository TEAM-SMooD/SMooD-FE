import React, { useEffect, useRef, useState } from "react";

const IframeTableu = (props: any) => {
    return (
        <>
            <iframe
                id="myframe"
                src={props.src}
                // src={
                //     "https://public.tableau.com/views/1-_16850819048790/sheet6?:language=ko-KR&publish=yes&:display_count=n&:origin=viz_share_link?:showVizHome=no&:embed=true&행정동=가회동&업종=동남아시아"
                // }
                width={props.size ? String(props.size) + "%" : "100%"}
                height="300"
                title="분석 보고서 워드클라우드"
            />
        </>
    );
};
export default IframeTableu;
