<script setup lang="ts">
import { TresCanvas } from '@tresjs/core';
const height = window.innerHeight;
const width = window.innerWidth;
const scale = 1 / Math.max(height, width);
</script>

<template>
  <TresCanvas clear-color="#222222" window-size>
    <!-- <TresOrthographicCamera
      :position="[3,3,3]" :look-at="[0,0,0]"
      :top=" + height * scale" :bottom=" - height * scale"
      :left=" - width * scale" :right=" + width * scale"
    /> -->
    <TresMesh>
      <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
      <TresMeshBasicMaterial color="orange" />
    </TresMesh>
  </TresCanvas>
</template>

<style scoped>
html, body {
  margin: 0;
  width: 100%;
  height: 100%;
  padding: 0;
}
</style>