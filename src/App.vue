<template>
  <div style="width:100%; height: 30px;"></div>
  <KakaoMap
    :latLag="{latitude:37.5178013, longitude:126.9000577}"
    apiKey="d2373a30b726d414591f02d968e8bebf"
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
