<script setup lang="ts">
import Land from './Land.vue';

import { TresCanvas } from '@tresjs/core';
import { ref, computed } from 'vue';
import * as THREE from 'three';
import { getLandTypeFromPos } from '@/utils/land';
import { LandTypes } from '@/types/land';


const [h, w] = [window.innerHeight, window.innerWidth];

const cameraRef = ref();
const isDragging = ref(false);
const lastMousePos = ref({ x: 0, y: 0 });
const cameraPosition = ref(new THREE.Vector3(5, 5, 5));
const id = ref(0); // 用于刷新页面

// 相机方向向量


// 计算可见范围
const visibleTiles = computed(() => {
  if (!cameraRef.value) return { minX: -5, maxX: 5, minZ: -5, maxZ: 5 };
  
  const camera = cameraRef.value;
  const center = (camera.position as THREE.Vector3).clone().add({ x: -5, y: -5, z: -5});
  const viewRadius = 5;
  
  // return {
  //   minX: minX - buffer,
  //   maxX: maxX + buffer,
  //   minZ: minZ - buffer,
  //   maxZ: maxZ + buffer
  // };
  return {
    minX: Math.floor(center.x - viewRadius),
    maxX: Math.ceil(center.x + viewRadius),
    minZ: Math.floor(center.z - viewRadius),
    maxZ: Math.ceil(center.z + viewRadius)
  };
});
function range(start: number, end: number) {
  return Array.from({ length: end - start }, (_, i) => start + i);
}

const uniqueLands = computed(() => {
  const lands: {
    key: string;
    position: [number, number];
    landType: LandTypes;
    distance: number;
  }[] = [];
  
  for (let x = visibleTiles.value.minX; x <= visibleTiles.value.maxX; x++) {
    for (let z = visibleTiles.value.minZ; z <= visibleTiles.value.maxZ; z++) {
      const dis = Math.hypot(x - cameraPosition.value.x + 5, z - cameraPosition.value.z + 5);
      const key = `${id.value}-${x},${z}`;
      lands.push({
        key,
        position: [x, z],
        landType: getLandTypeFromPos(x, z),
        distance: dis
      });
    }
  }
  console.log(lands.map(land => land.key));
  return lands;
});

function onPointerDown(event: MouseEvent) {
  isDragging.value = true;
  lastMousePos.value = { x: event.clientX, y: event.clientY };
}

function onPointerUp() {
  isDragging.value = false;
}

function onPointerMove(event: MouseEvent) {
  if (!isDragging.value || !cameraRef.value) return;

  id.value++;id.value %= 2147483647;
  console.log(id.value);

  const scale = 0.01;
  const deltaX = event.movementX * scale;
  const deltaY = event.movementY * scale;

  const right = new THREE.Vector3(-1, 0, 1), forward = new THREE.Vector3(-1, 0, -1);
  const moveVector = new THREE.Vector3()
    .addScaledVector(right, deltaX)
    .addScaledVector(forward, deltaY * Math.sqrt(3));
  cameraRef.value.position.add(moveVector);
  cameraPosition.value = cameraRef.value.position;
  
  lastMousePos.value = { x: event.clientX, y: event.clientY };
}


</script> 

<template>
  <TresCanvas 
    window-size 
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointerleave="onPointerUp"
  >
  <TresOrthographicCamera
    ref="cameraRef"
    :position="[5, 5, 5]"
    :look-at="[0, 0, 0]"
    :top="h / -2" :bottom="h / 2"
    :left="w / -2" :right="w / 2"
    :zoom="100"
  >
  </TresOrthographicCamera>
    <TresDirectionalLight
      :color="0xffffff"
      :intensity="2"
      :position="[6, 8, 9]"
    />
    <template v-for="land in uniqueLands" :key="land.key">
      <Land
        v-if="land.distance < 5 && land.key.startsWith(id.toString())"
        :position="land.position"
        :land-type="land.landType"
        :distance="land.distance"
      />
    </template>
  </TresCanvas>
</template>


<style scoped>
</style>