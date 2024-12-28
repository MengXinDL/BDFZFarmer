<script setup lang="ts">
import { RoundedBox, Levioso } from '@tresjs/cientos';
import { ref } from 'vue';
import { LandTypes } from '@/types/land';
import { LAND_INFOS } from '@/constant/land';
import { max } from 'three/tsl';
import { getLandTypeFromPos } from '@/utils/land';

const props = defineProps<{
  landType?: LandTypes,
  position: [number, number],
  distance?: number,
  float?: boolean,
}>();

const landType = ref<LandTypes>(props.landType ?? getLandTypeFromPos(props.position[0], props.position[1]));
const scale = ref(1 / Math.max(1, props.distance ?? 1));

</script>

<template>
  <Levioso
    v-if="props.float"
    :rotationFactor="0"
    :speed="5"
    :range="[-0.05, 0.05]"
  >
    <RoundedBox
      :args="[1.8 * scale, 0.7, 1.8 * scale, 1, 0.1]"
      :position="[props.position[0] * 2, 0, props.position[1] * 2]"
    >
      <TresMeshStandardMaterial
        :color="LAND_INFOS[landType].color"
      />
    </RoundedBox>
  </Levioso>
  
  <RoundedBox
    v-else
    :args="[1.8 * scale, 0.7, 1.8 * scale, 1, 0.1]"
    :position="[props.position[0] * 2, 0, props.position[1] * 2]"
  >
    <TresMeshStandardMaterial
      :color="LAND_INFOS[landType].color"
    />
  </RoundedBox>
</template>


<style scoped>
</style>