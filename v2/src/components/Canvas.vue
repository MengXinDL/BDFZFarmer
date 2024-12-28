<script setup lang="ts">
import Block from './Block.vue';

import { TresCanvas } from '@tresjs/core';
import { ref, computed, onMounted, watch } from 'vue';
import * as THREE from 'three';


const [h, w] = [window.innerHeight, window.innerWidth];

const cameraRef = ref();
const isDragging = ref(false);
const lastMousePos = ref({ x: 0, y: 0 });
const cameraPosition = ref(new THREE.Vector3(5, 5, 5));
const sceneRef = ref();

const blockRadius = 2;

// 相机方向向量


function onPointerDown(event: MouseEvent) {
  isDragging.value = true;
  lastMousePos.value = { x: event.clientX, y: event.clientY };
}

function onPointerUp() {
  isDragging.value = false;
}

function onPointerMove(event: MouseEvent) {
  if (!isDragging.value || !cameraRef.value) return;

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

let blocks = ref<[number, number][]>([]);

function updateBlock(){
  const pos = cameraPosition.value;
  let newBlock: [number, number][] = [];
  for(let i = -blockRadius; i <= blockRadius; i++)
    for(let j = -blockRadius; j <= blockRadius; j++)
      if(Math.hypot(i, j) <= blockRadius)
        newBlock.push([i + Math.round(pos.x / 8) - 1, j + Math.round(pos.z / 8) - 1]);
  blocks.value = newBlock;
  console.log(newBlock[0], pos.x, pos.z);
}
updateBlock();
watch(cameraPosition, updateBlock, {deep: true})
</script> 

<template>
  <TresCanvas 
    window-size 
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointerleave="onPointerUp"
    ref = "sceneRef"
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
    <Block v-for="block in blocks" :pos="block" :key="blocks[0].toString()"/>
    <!-- <template v-for="i in 5">
      <template v-for="j in 6">
        <Land
          :position="[i - 2, j - 3]"
          :land-type="getLandTypeFromValues(j - 2, (i - 1) / 5)"
        />
      </template> -->
    <!-- </template> -->
  </TresCanvas>
</template>


<style scoped>
</style>