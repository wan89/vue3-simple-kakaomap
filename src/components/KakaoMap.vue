<template>
  <div id="kakao-map" style="height: 100%; width:100%; background-color: #eee;">
    {{ logMsg }}
  </div>
</template>

<script lang="ts" setup>
import type { LatLagType, LatLagPosition,markerOptions } from './../types'
import { PropType, Ref, ref } from 'vue';
import { loadJsFile } from './../assets/Utills';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    kakao: any;
  }
}

// ==================================================================================================
// values
// ==================================================================================================

const props = defineProps({
  latLag: Object as PropType<LatLagType>,
  apiKey: String,
  markerImageUrl: String,
  markerOptions: Object as PropType<markerOptions>
});

let maps:object;
let marker:any;
let logMsg:Ref<string> = ref('~~');

// ==================================================================================================
// functions
// ==================================================================================================

const initMap = () => {
    const container = document.getElementById("kakao-map"); //지도를 담을 영역의 DOM 레퍼런스
    if(!container) return;

    const latLagPosition : LatLagPosition = new window.kakao.maps.LatLng(props.latLag.latitude, props.latLag.longitude) as LatLagPosition;
    const options:object = {
      center: latLagPosition, //지도의 중심좌표.
      level: 3,
    };
    const kakaoMap:object = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    maps = kakaoMap;

    let markerImage:object | null = null;

    if(props.markerImageUrl && props.markerImageUrl != ''){
      const imageSrc = props.markerImageUrl, // 마커이미지의 주소입니다    
      imageSize = new window.kakao.maps.Size(props.markerOptions.w, props.markerOptions.h), // 마커이미지의 크기입니다
      imageOption = { offset: new window.kakao.maps.Point(props.markerOptions.x, props.markerOptions.y )};//마커의 offset/센터값.
      markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
    }

    console.log(markerImage);

    marker = new window.kakao.maps.Marker({
      position: latLagPosition,
      image: markerImage? markerImage:null
    });

    marker.setMap(maps);

};

if(props.latLag && props.latLag.latitude != 0){
  loadJsFile(`//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${props.apiKey}`)
    .then(()=>{
      try{
        console.log(window.kakao?.maps.load);
        window.kakao?.maps.load(initMap);
      } catch(err){
        console.log(err);
        logMsg = err as string;
      }
    }).catch((resReason:string)=>{
      logMsg.value = resReason;
      console.error(resReason+" js file의 URL가 정확한지 확인해주세요");
    })
}
</script>