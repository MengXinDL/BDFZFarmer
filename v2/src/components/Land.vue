<script setup lang="ts">
import { RoundedBox, Levioso } from '@tresjs/cientos';
import { ref } from 'vue';
import { LandTypes } from '@/types/land';
import { LAND_INFOS } from '@/constant/land';
import { max } from 'three/tsl';

const props = defineProps<{
  landType?: LandTypes;
  position: [number, number];
  distance?: number;
}>();

const landType = ref<LandTypes>(props.landType ?? LandTypes.NONE);
const scale = ref(1 / Math.max(1, props.distance ?? 1));
</script>

<template>
  <!-- <Levioso
    :rotationFactor="0"
    :speed="1.5"
    :range="[-0.05, 0.05]"
  > -->
    <RoundedBox
      :args="[1.8 * scale, 0.7, 1.8 * scale]"
      :radius="0.2"
      :position="[props.position[0] * 2, 0, props.position[1] * 2]"
    >
      <TresMeshStandardMaterial
        :color="LAND_INFOS[landType].color"
      />
    </RoundedBox>
  <!-- </Levioso> -->
</template>


<style scoped>
</style>