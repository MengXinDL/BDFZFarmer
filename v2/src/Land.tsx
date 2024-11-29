import * as THREE from 'three'
import { RoundedBox } from '@react-three/drei';
import { Grass } from './Grass';

export function Land(props: JSX.IntrinsicElements['group']) {
  const material = new THREE.MeshStandardMaterial({ color: 0xb56605, roughness: 1, metalness: 0 });
  return (
    <group {...props} dispose={null}>
      <RoundedBox args={[2, 0.7, 2]} radius={0.2} material={material} position={[0, 0, 0]} />
      <Grass position={[0, 0, 0]} />
    </group>
  )
}
