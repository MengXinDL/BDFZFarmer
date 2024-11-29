import React from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as Land from './Land';
import { PlaneGeometry } from 'three';




function App() {
  return (
    <div className="App">
      <Canvas>
        <ambientLight intensity={1} />
        <directionalLight position={[3, 2, 1]} intensity={10} />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          maxPolarAngle={Math.PI * 0.4}
          minPolarAngle={Math.PI * 0.4}
          position={[0, 5, 0]}
        />
        <Land.Land />
      </Canvas>
    </div>
  );
}

export default App;
