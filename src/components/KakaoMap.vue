<template>
  <div id="kakao-map" style="height: 100%; width:100%; background-color: #eee;"></div>
</template>

<script lang="ts" setup>
import type {LatLagType} from './../types'
import { PropType } from 'vue';

const props = defineProps({
  latLag: Object as PropType<LatLagType>,
});

let maps;
let marker;

declare global {
    // eslint-disable-next-line no-unused-vars
  interface Window {
    kakao: any;
  }
}

const initMap = () => {
    const container = document.getElementById("kakao-map"); //지도를 담을 영역의 DOM 레퍼런스
    if(!container) return;

    const latLagPosition = new window.kakao.maps.LatLng(props.latLag.latitude, props.latLag.longitude);
    const options = {
      center: latLagPosition, //지도의 중심좌표.
      level: 3,
    };
    const kakaoMap = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    maps = kakaoMap;
    
    const imageSrc = 'https://wedqueen.s3.ap-northeast-2.amazonaws.com/test/marker_red.png', // 마커이미지의 주소입니다    
    imageSize = new window.kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
    imageOption = {offset: new window.kakao.maps.Point(27, 69)};
    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
    marker = new window.kakao.maps.Marker({
        position: latLagPosition,
        image: markerImage 
    });
    marker.setMap(maps);
};

const loadKakaoJs = ()=>{
  return new Promise((resolve) => {
    let script = document.createElement('script')
    script.onload = () => {
      resolve(()=>{});
    }
    script.async = true
    script.src = '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=d2373a30b726d414591f02d968e8bebf'
    document.head.appendChild(script)
  })
};

if(props.latLag && props.latLag.latitude != 0){
  loadKakaoJs().then(()=>{
    try{
      console.log(window.kakao?.maps.load);
      window.kakao?.maps.load(initMap);
    } catch(err){
      console.log(err);
    }
    
  })
}
</script>