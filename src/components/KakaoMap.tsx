import React, { useEffect, useState } from "react";
interface kakaomapPRops {
    elementsId: string;
    mapWidth: number;
    mapHeight: number;
    crdnt: number[];
    isForStore?: number; // 가게정보모달에서 쓸때 1
}
const KakaoMap = (props: kakaomapPRops) => {
    const kakao = (window as any).kakao;

    useEffect(() => {
        const container = document.getElementById(props.elementsId); //지도를 담을 영역의 DOM 레퍼런스 호출에서 지정
        const options = {
            //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(props.crdnt[0], props.crdnt[1]), //지도의 중심좌표
            level: 5, //지도의 레벨(확대, 축소 정도)
        };
        const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
        // const newLatLng = new kakao.maps.LatLng(crdnt[0], crdnt[1]);
        // map.panTo(newLatLng);
        if (props.isForStore) {
            const imgSrc =
                "https://user-images.githubusercontent.com/81412212/234525871-5f4254a3-3d9f-48d0-8bf5-49363f2eafa6.png";
            const imgSize = new kakao.maps.Size(30, 40);
            const imgOption = { offset: new kakao.maps.Point(15, 40) };
            const markerImage = new kakao.maps.MarkerImage(
                imgSrc,
                imgSize,
                imgOption
            );
            const markerPosition = new kakao.maps.LatLng(
                props.crdnt[0],
                props.crdnt[1]
            ); // 마커가 표시될 위치입니다

            // 마커를 생성합니다
            const marker = new kakao.maps.Marker({
                position: markerPosition,
                image: markerImage, // 마커이미지 설정
            });
            marker.setMap(map);
        }
    }, [props.crdnt]);
    return (
        <div
            id={props.elementsId}
            style={{ width: props.mapWidth, height: props.mapHeight }}
        ></div>
    );
};

export default KakaoMap;
