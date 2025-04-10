

// import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
// import { useState, useEffect } from "react";
// import { Hoodie } from "./HoddieModel";
// import * as THREE from "three";

// export const Experience = ({ customTextures }) => {
//   const [meshCenters, setMeshCenters] = useState({});

//   // Handler for when mesh centers are calculated
//   const handleMeshCentersCalculated = (centers) => {
//     setMeshCenters(centers);
//   };

//   return (
//     <>
//       <ambientLight intensity={0.3} />
//       <directionalLight
//         position={[10, 10, 5]}
//         intensity={0.8}
//         castShadow
//         shadow-mapSize={[1024, 1024]}
//       />
//       <directionalLight
//         position={[-10, 5, -5]}
//         intensity={0.4}
//         color="#B1E1FF"
//       />
//       <OrbitControls
//         minPolarAngle={Math.PI / 6}
//         maxPolarAngle={Math.PI / 1.5}
//         enablePan={true}
//         enableZoom={true}
//         enableRotate={true}
//       />
//       <Hoodie
//         position={[0, 0, 0]}
//         scale={1}
//         decalProps={{ customTextures }}
//         onMeshCentersCalculated={handleMeshCentersCalculated}
//       />
//       <ContactShadows
//         position={[0, -1.5, 0]}
//         opacity={0.4}
//         blur={2}
//         scale={10}
//         far={2}
//         resolution={1024}
//       />
//       <Environment preset="sunset" background blur={4} />
//     </>
//   );
// };


// import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
// import { useState } from "react";
// import { Hoodie } from "./HoddieModel";

// export const Experience = ({ customTextures, customScales }) => {
//   const [meshCenters, setMeshCenters] = useState({});
  
//   // Handler for when mesh centers are calculated
//   const handleMeshCentersCalculated = (centers) => {
//     setMeshCenters(centers);
//   };

//   return (
//     <>
//       <ambientLight intensity={0.3} />
//       <directionalLight
//         position={[10, 10, 5]}
//         intensity={0.8}
//         castShadow
//         shadow-mapSize={[1024, 1024]}
//       />
//       <directionalLight
//         position={[-10, 5, -5]}
//         intensity={0.4}
//         color="#B1E1FF"
//       />
//       <OrbitControls
//         minPolarAngle={Math.PI / 6}
//         maxPolarAngle={Math.PI / 1.5}
//         enablePan={true}
//         enableZoom={true}
//         enableRotate={true}
//       />
//       <Hoodie
//         position={[0, 0, 0]}
//         scale={1}
//         decalProps={{ 
//           customTextures,
//           customScales 
//         }}
//         onMeshCentersCalculated={handleMeshCentersCalculated}
//       />
//       <ContactShadows
//         position={[0, -1.5, 0]}
//         opacity={0.4}
//         blur={2}
//         scale={10}
//         far={2}
//         resolution={1024}
//       />
//       <Environment preset="sunset" background blur={4} />
//     </>
//   );
// };


import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { useState } from "react";
import { Hoodie } from "./HoddieModel";

export const Experience = ({ customTextures, customScales }) => {
  const [meshCenters, setMeshCenters] = useState({});
 
  // Handler for when mesh centers are calculated
  const handleMeshCentersCalculated = (centers) => {
    setMeshCenters(centers);
  };

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight
        position={[-10, 5, -5]}
        intensity={0.4}
        color="#B1E1FF"
      />
      <OrbitControls
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 1.5}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
      />
      <Hoodie
        position={[0, 0, 0]}
        scale={1}
        decalProps={{
          customTextures,
          customScales
        }}
        onMeshCentersCalculated={handleMeshCentersCalculated}
      />
      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.4}
        blur={2}
        scale={10}
        far={2}
        resolution={1024}
      />
      <Environment preset="sunset" background blur={4} />
    </>
  );
};