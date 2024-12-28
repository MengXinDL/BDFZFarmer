<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Land from './Land.vue';
import type { Group, Scene } from 'three';

const props = defineProps<{
  pos: [number, number],
}>();


const blockScale = 4;
const pos = [
  props.pos[0] * blockScale,
  props.pos[1] * blockScale
];
const lands = computed(()=>{
  const l: [number, number][] = [];
  for(let i = 0; i < 4; i++){
    for(let  j = 0; j < 4; j++){
      l.push([pos[0] + i, pos[1] + j]);
    }
  }
  return l;
});


const r = ref<Group>();

defineExpose({
  unload(scene: Scene) {
    if(r.value){
      r.value.clear();
      scene.remove(r.value);
    }
  }
})
</script>

<template>
  <TresGroup ref="r">
    <Land v-for="p in lands" :position="p"/>
  </TresGroup>
</template>