// import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
// import { useState, useEffect } from "react";
// import { Hoodie } from "./HoddieModel";
// import * as THREE from "three";

// export const Experience = () => {
//   const [customTextures, setCustomTextures] = useState({
//     Main003: null,
//     Main004: null,
//     Arms002: null
//   });

//   useEffect(() => {
//     const textureLoader = new THREE.TextureLoader();
    
//     // Load different textures for each mesh
//     const texturePaths = {
//       Main003: "/logoPrint.jpeg",
//       Main004: "/Decal.webp", // Replace with actual path
//       Arms002: "/Diagonal.png"  // Replace with actual path
//     };
    
//     // Create a map to store loaded textures
//     const loadedTextures = {};
    
//     // Load each texture
//     Object.entries(texturePaths).forEach(([meshName, path]) => {
//       textureLoader.load(
//         path,
//         (texture) => {
//           texture.flipY = false;
//           texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
//           texture.minFilter = THREE.LinearFilter;
//           texture.magFilter = THREE.LinearFilter;
//           texture.anisotropy = 16;
//           texture.needsUpdate = true;
          
//           // Update the textures state with this new texture
//           setCustomTextures(prev => ({
//             ...prev,
//             [meshName]: texture
//           }));
//         },
//         undefined,
//         (error) => console.error(`Error loading texture for ${meshName}:`, error)
//       );
//     });
//   }, []);

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
import { useState, useEffect } from "react";
import { Hoodie } from "./HoddieModel";
import * as THREE from "three";

export const Experience = ({ customTextures }) => {
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
        decalProps={{ customTextures }}
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