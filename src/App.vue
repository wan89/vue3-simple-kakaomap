<template>
  <div style="width:100%; height: 30px; border-bottom: 2px solid #eee; text-align: center; padding-top: 10px;">daum map</div>
  <KakaoMap
    :latLag="{latitude:37.5178013, longitude:126.9000577}"
    apiKey="d2373a30b726d414591f02d968e8bebf"
    markerImageUrl="https://wedqueen.s3.ap-northeast-2.amazonaws.com/test/marker_red.png"
    :markerOptions = '{w:64, h:69, x:22, y:69}'
  />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import KakaoMap from './components/KakaoMap.vue';

@Options({
  components: {
    KakaoMap,
  },
})
export default class App extends Vue {}
</script>

<style>
html, body, #app {
  width: 100%; height: 100%;
  margin:0; padding:0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
