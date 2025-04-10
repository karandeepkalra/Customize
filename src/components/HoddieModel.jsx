// // import { useRef, useEffect, useState, useMemo } from "react";
// // import { useGLTF, Decal } from "@react-three/drei";
// // import * as THREE from "three";
// // import { useControls, folder, button } from "leva";

// // export function Hoodie({ position, scale = 1, decalProps = {} }) {
// //   const { nodes, materials, scene } = useGLTF("/newbama1.glb");
// //   const [defaultLogoTexture, setDefaultLogoTexture] = useState(null);
// //   const [customLogo, setCustomLogo] = useState(null);
// //   const [meshSettings, setMeshSettings] = useState({
// //     "Main003": { position: [0.00, 0.17, 0.10], rotation: [0.04, 0.01, 0.00], scale: [0.10, 0.17, 1] },
// //     "Main004": { position: [0.00, 0.17, 0.10], rotation: [0.04, 0.01, 0.00], scale: [0.10, 0.17, 1] },
// //     // "Arms002": { position: [0.15, 0.05, 0.10], rotation: [0.00, 0.30, 0.00], scale: [0.08, 0.12, 1] },

// //     "Arms002": { position: [0.26, 0.10, 0.10], rotation: [0.00, 0.30, 0.00], scale: [0.07, 0.17, 0.1] },
// //   });
// //   const modelRef = useRef();
// //   const decalRef = useRef();
// //   const [currentMeshName, setCurrentMeshName] = useState("Main003");
// //   const [modelScale, setModelScale] = useState(scale);
// //   useEffect(() => {
// //     const textureLoader = new THREE.TextureLoader();
// //     textureLoader.load(
// //       "/Decal.webp",
// //       (texture) => {
// //         texture.flipY = false;
// //         texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
// //         texture.minFilter = THREE.LinearFilter;
// //         texture.magFilter = THREE.LinearFilter;
// //         texture.anisotropy = 16;
        
// //         // Maintain proper aspect ratio
// //         const aspectRatio = texture.image.width / texture.image.height;
        
// //         // Update scales to maintain aspect ratio for each mesh
// //         setMeshSettings(prev => ({
// //           ...prev,
// //           "Main003": { ...prev["Main003"], scale: [0.10 * aspectRatio, 0.17, 1] },
// //           "Main004": { ...prev["Main004"], scale: [0.10 * aspectRatio, 0.17, 1] },
// //           "Arms002": { ...prev["Arms002"], scale: [0.07, 0.17, 1] },
// //         }));
        
// //         texture.needsUpdate = true;
// //         setDefaultLogoTexture(texture);
// //       },
// //       undefined,
// //       (error) => console.error("Failed to load default logo texture:", error)
// //     );
// //   }, []);

// //   // Handle custom logo
// //   useEffect(() => {
// //     if (decalProps.logoTexture) {
// //       const texture = decalProps.logoTexture;
// //       texture.flipY = false;
// //       texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
// //       texture.minFilter = THREE.LinearFilter;
// //       texture.magFilter = THREE.LinearFilter;
// //       texture.anisotropy = 16;
// //       texture.needsUpdate = true;
// //       setCustomLogo(texture);
// //     }
// //   }, [decalProps.logoTexture]);

// //   // Track scale changes
// //   useEffect(() => {
// //     setModelScale(scale);
// //   }, [scale]);

// //   // Apply scale to model
// //   useEffect(() => {
// //     if (modelRef.current) {
// //       modelRef.current.scale.set(modelScale, modelScale, modelScale);
// //     }
// //   }, [modelScale]);

// //   // Compute selected mesh synchronously
// //   const selectedMesh = useMemo(() => {
// //     if (!scene) return null;
// //     let foundMesh = null;
// //     scene.traverse((child) => {
// //       if (child.isMesh && child.name === currentMeshName) {
// //         foundMesh = child;
// //       }
// //     });
// //     return foundMesh;
// //   }, [scene, currentMeshName]);

// //   const currentSettings = meshSettings[currentMeshName] || {
// //     position: [0, 0, 0],
// //     rotation: [0, 0, 0],
// //     scale: [0.1, 0.1, 1],
// //   };
// //   const logoTexture = customLogo || defaultLogoTexture;

// //   // Calculate adjusted decal position based on model scale
// //   const adjustedDecalPosition = useMemo(() => {
// //     return currentSettings.position;
// //   }, [currentSettings.position]);

// //   // Leva controls with dependency on currentMeshName and currentSettings
// //   const [controlValues, setControlValues] = useControls(
// //     () => ({
// //       "Hoodie Options": folder({
// //         meshName: {
// //           options: { Main003: "Main003", Main004: "Main004", Arms002: "Arms002" },
// //           value: currentMeshName,
// //           onChange: (value) => setCurrentMeshName(value),
// //         },
// //         roughness: { value: 0.7, min: 0, max: 1, step: 0.01 },
// //         metalness: { value: 0.1, min: 0, max: 1, step: 0.01 },
// //         opacity: { value: 1, min: 0, max: 1, step: 0.01 },
// //         enableDecal: { value: true, label: "Show Logo" },
// //         modelScale: { value: modelScale, min: 0.5, max: 2, step: 0.1, onChange: (v) => setModelScale(v) },
// //       }),
// //       "Logo Position": folder({
// //         posX: {
// //           value: currentSettings.position[0],
// //           min: -2,
// //           max: 2,
// //           step: 0.01,
// //           onChange: (v) => updateMeshSetting("position", 0, v),
// //         },
// //         posY: {
// //           value: currentSettings.position[1],
// //           min: -2,
// //           max: 2,
// //           step: 0.01,
// //           onChange: (v) => updateMeshSetting("position", 1, v),
// //         },
// //         posZ: {
// //           value: currentSettings.position[2],
// //           min: -1,
// //           max: 1,
// //           step: 0.01,
// //           onChange: (v) => updateMeshSetting("position", 2, v),
// //         },
// //         rotX: {
// //           value: currentSettings.rotation[0],
// //           min: 0,
// //           max: Math.PI * 2,
// //           step: 0.01,
// //           onChange: (v) => updateMeshSetting("rotation", 0, v),
// //         },
// //         rotY: {
// //           value: currentSettings.rotation[1],
// //           min: 0,
// //           max: Math.PI * 2,
// //           step: 0.01,
// //           onChange: (v) => updateMeshSetting("rotation", 1, v),
// //         },
// //         rotZ: {
// //           value: currentSettings.rotation[2],
// //           min: 0,
// //           max: Math.PI * 2,
// //           step: 0.01,
// //           onChange: (v) => updateMeshSetting("rotation", 2, v),
// //         },
// //         scaleX: {
// //           value: currentSettings.scale[0],
// //           min: 0.01,
// //           max: 2,
// //           step: 0.01,
// //           onChange: (v) => updateMeshSetting("scale", 0, v),
// //         },
// //         scaleY: {
// //           value: currentSettings.scale[1],
// //           min: 0.01,
// //           max: 2,
// //           step: 0.01,
// //           onChange: (v) => updateMeshSetting("scale", 1, v),
// //         },
// //   //       resetPosition: button(() => {
// //   //         setMeshSettings((prev) => ({
// //   //           ...prev,
// //   //           [currentMeshName]: { position: [0.00, 0.00, 0.00], rotation: [0.00, 0.00, 0.00], scale: [0.10, 0.10, 1] },
// //   //         }));
// //   //       }),
// //   //       debug: { value: false },
// //   //     }),
// //   //   }),
// //   //   [currentMeshName, currentSettings, modelScale] // Include modelScale in dependencies
// //   // );
// //   resetPosition: button(() => {
// //     const defaultPositions = {
// //       "Main003": { position: [0.00, 0.17, 0.10], rotation: [0.04, 0.01, 0.00], scale: [0.10, 0.17, 1] },
// //       "Main004": { position: [0.00, 0.17, 0.10], rotation: [0.04, 0.01, 0.00], scale: [0.10, 0.17, 1] },
// //       "Arms002": { position: [0.26, 0.10, 0.10], rotation: [0.00, 0.30, 0.00], scale: [0.07, 0.17, 0.1] },
// //     };
    
// //     setMeshSettings((prev) => ({
// //       ...prev,
// //       [currentMeshName]: defaultPositions[currentMeshName] || { position: [0.00, 0.00, 0.00], rotation: [0.00, 0.00, 0.00], scale: [0.10, 0.10, 1] },
// //     }));
// //   }),
// //   debug: { value: false },
// //       }),
// //     }),
// //   [currentMeshName, currentSettings, modelScale] // Include modelScale in dependencies
// //   );
// //   function updateMeshSetting(property, index, value) {
// //     setMeshSettings((prev) => {
// //       const newSettings = { ...prev };
// //       const settingsCopy = { ...newSettings[currentMeshName] };
// //       settingsCopy[property] = [...settingsCopy[property]];
// //       settingsCopy[property][index] = value;
// //       newSettings[currentMeshName] = settingsCopy;
// //       return newSettings;
// //     });
// //   }

// //   const { roughness, metalness, opacity, enableDecal, debug } = controlValues;

// //   if (!nodes || !materials) {
// //     return (
// //       <mesh>
// //         <boxGeometry args={[1, 1, 1]} />
// //         <meshBasicMaterial color="red" />
// //       </mesh>
// //     );
// //   }

// //   return (
// //     <group ref={modelRef} position={position} dispose={null}>
// //       {/* {Object.entries(nodes).map(([name, node]) => {
// //         if (node.isMesh) {
// //           return (
// //             <mesh
// //               key={name}
// //               name={name}
// //               castShadow
// //               receiveShadow
// //               geometry={node.geometry}
// //               material={
// //                 node.material
// //                   ? new THREE.MeshStandardMaterial().copy(materials[node.material.name] || materials.Configurator_01)
// //                   : materials.Configurator_01
// //               }
// //             />
// //           );
// //         } */}
// //         {/* return null;
// //       })} */}

// // {Object.entries(nodes).map(([name, node]) => {
// //   if (node.isMesh) {
// //     const isSelected = name === currentMeshName;
// //     return (
// //       <mesh
// //         key={name}
// //         name={name}
// //         castShadow
// //         receiveShadow
// //         geometry={node.geometry}
// //         material={
// //           node.material
// //             ? (() => {
// //                 const material = new THREE.MeshStandardMaterial().copy(
// //                   materials[node.material.name] || materials.Configurator_01
// //                 );
// //                 // Make selected mesh brighter
// //                 if (isSelected) {
// //                   material.emissive = new THREE.Color("#FFFFFF");
// //                   material.emissiveIntensity = 0.2;
// //                 }
// //                 return material;
// //               })()
// //             : materials.Configurator_01
// //         }
// //       />
// //     );
// //   }
// //   return null;
// // })}

// //       {selectedMesh && enableDecal && logoTexture && (
// //         <group scale={[1, 1, 1]}>
// //           <mesh key={`decal-${currentMeshName}-${selectedMesh.name}`} geometry={selectedMesh.geometry}>
// //             <Decal
// //               ref={decalRef}
// //               debug={debug}
// //               position={adjustedDecalPosition}
// //               rotation={currentSettings.rotation}
// //               scale={currentSettings.scale}
// //               map={logoTexture}
// //               polygonOffset
// //               polygonOffsetFactor={-10}
// //               transparent
// //             >
// //               <meshStandardMaterial
// //                 map={logoTexture}
// //                 transparent
// //                 opacity={opacity}
// //                 depthTest={true}
// //                 depthWrite={false}
// //                 polygonOffset
// //                 polygonOffsetFactor={-10}
// //                 roughness={roughness}
// //                 metalness={metalness}
// //                 side={THREE.FrontSide}
// //                 toneMapped={false}
// //                 emissive="#FFFFFF"
// //                 emissiveIntensity={0.1}
// //               />
// //             </Decal>
// //           </mesh>
// //         </group>
// //       )}

// //       {debug && (
// //         <>
// //           <mesh position={currentSettings.position} scale={0.05}>
// //             <sphereGeometry args={[1, 16, 16]} />
// //             <meshBasicMaterial color="red" wireframe={false} />
// //           </mesh>
// //           <axesHelper args={[1]} position={[0, 0, 0]} />
// //         </>
// //       )}
// //     </group>
// //   );
// // }

// // useGLTF.preload("/newbama1.glb");





// import { useRef, useEffect, useState, useMemo } from "react";
// import { useGLTF, Decal } from "@react-three/drei";
// import * as THREE from "three";
// import { useControls, folder, button } from "leva";

// export function Hoodie({ position, scale = 1, decalProps = {} }) {
//   const { nodes, materials, scene } = useGLTF("/newbama1.glb");
//   const [defaultLogoTexture, setDefaultLogoTexture] = useState(null);
//   const [customLogo, setCustomLogo] = useState(null);
//   const [meshSettings, setMeshSettings] = useState({
//     "Main003": { position: [0.00, 0.17, 0.10], rotation: [0.04, 0.01, 0.00], scale: [0.10, 0.17, 1] },
//     "Main004": { position: [0.00, 0.17, 0.10], rotation: [0.04, 0.01, 0.00], scale: [0.10, 0.17, 1] },
//     // "Arms002": { position: [0.15, 0.05, 0.10], rotation: [0.00, 0.30, 0.00], scale: [0.08, 0.12, 1] },

//     "Arms002": { position: [0.26, 0.10, 0.10], rotation: [0.00, 0.30, 0.00], scale: [0.07, 0.17, 0.1] },
//   });
//   const modelRef = useRef();
//   const decalRef = useRef();
//   const [currentMeshName, setCurrentMeshName] = useState("Main003");
//   const [modelScale, setModelScale] = useState(scale);
//   useEffect(() => {
//     const textureLoader = new THREE.TextureLoader();
//     textureLoader.load(
//       "/Decal.webp",
//       (texture) => {
//         texture.flipY = false;
//         texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
//         texture.minFilter = THREE.LinearFilter;
//         texture.magFilter = THREE.LinearFilter;
//         texture.anisotropy = 16;
        
//         // Maintain proper aspect ratio
//         const aspectRatio = texture.image.width / texture.image.height;
        
//         // Update scales to maintain aspect ratio for each mesh
//         setMeshSettings(prev => ({
//           ...prev,
//           "Main003": { ...prev["Main003"], scale: [0.10 * aspectRatio, 0.17, 1] },
//           "Main004": { ...prev["Main004"], scale: [0.10 * aspectRatio, 0.17, 1] },
//           "Arms002": { ...prev["Arms002"], scale: [0.07, 0.17, 1] },
//         }));
        
//         texture.needsUpdate = true;
//         setDefaultLogoTexture(texture);
//       },
//       undefined,
//       (error) => console.error("Failed to load default logo texture:", error)
//     );
//   }, []);

//   // Handle custom logo
//   useEffect(() => {
//     if (decalProps.logoTexture) {
//       const texture = decalProps.logoTexture;
//       texture.flipY = false;
//       texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
//       texture.minFilter = THREE.LinearFilter;
//       texture.magFilter = THREE.LinearFilter;
//       texture.anisotropy = 16;
//       texture.needsUpdate = true;
//       setCustomLogo(texture);
//     }
//   }, [decalProps.logoTexture]);

//   // Track scale changes
//   useEffect(() => {
//     setModelScale(scale);
//   }, [scale]);

//   // Apply scale to model
//   useEffect(() => {
//     if (modelRef.current) {
//       modelRef.current.scale.set(modelScale, modelScale, modelScale);
//     }
//   }, [modelScale]);

//   // Compute selected mesh synchronously
//   const selectedMesh = useMemo(() => {
//     if (!scene) return null;
//     let foundMesh = null;
//     scene.traverse((child) => {
//       if (child.isMesh && child.name === currentMeshName) {
//         foundMesh = child;
//       }
//     });
//     return foundMesh;
//   }, [scene, currentMeshName]);


//   const adjustedDecalPosition = useMemo(() => {
//     const offsetZ = currentMeshName === "Arms002" ? 0.05 : 0; // Small offset for Arms002
//     return [meshCenter[0], meshCenter[1], meshCenter[2] + offsetZ];
//   }, [meshCenter, currentMeshName]);

//   const currentSettings = meshSettings[currentMeshName] || {
//     position: [0, 0, 0],
//     rotation: [0, 0, 0],
//     scale: [0.1, 0.1, 1],
//   };
//   const logoTexture = customLogo || defaultLogoTexture;

//   // Calculate adjusted decal position based on model scale
//   const adjustedDecalPosition = useMemo(() => {
//     if (currentMeshName === "Arms002") {
//       return [0.26, 0.10, 0.15]; // Hardcoded position for testing
//     }
//     return meshCenter;
//   }, [meshCenter, currentMeshName]);

//   // Leva controls with dependency on currentMeshName and currentSettings
//   const [controlValues, setControlValues] = useControls(
//     () => ({
//       "Hoodie Options": folder({
//         meshName: {
//           options: { Main003: "Main003", Main004: "Main004", Arms002: "Arms002" },
//           value: currentMeshName,
//           onChange: (value) => setCurrentMeshName(value),
//         },
//         roughness: { value: 0.7, min: 0, max: 1, step: 0.01 },
//         metalness: { value: 0.1, min: 0, max: 1, step: 0.01 },
//         opacity: { value: 1, min: 0, max: 1, step: 0.01 },
//         enableDecal: { value: true, label: "Show Logo" },
//         modelScale: { value: modelScale, min: 0.5, max: 2, step: 0.1, onChange: (v) => setModelScale(v) },
//       }),
//       "Logo Position": folder({
//         posX: {
//           value: currentSettings.position[0],
//           min: -2,
//           max: 2,
//           step: 0.01,
//           onChange: (v) => updateMeshSetting("position", 0, v),
//         },
//         posY: {
//           value: currentSettings.position[1],
//           min: -2,
//           max: 2,
//           step: 0.01,
//           onChange: (v) => updateMeshSetting("position", 1, v),
//         },
//         posZ: {
//           value: currentSettings.position[2],
//           min: -1,
//           max: 1,
//           step: 0.01,
//           onChange: (v) => updateMeshSetting("position", 2, v),
//         },
//         rotX: {
//           value: currentSettings.rotation[0],
//           min: 0,
//           max: Math.PI * 2,
//           step: 0.01,
//           onChange: (v) => updateMeshSetting("rotation", 0, v),
//         },
//         rotY: {
//           value: currentSettings.rotation[1],
//           min: 0,
//           max: Math.PI * 2,
//           step: 0.01,
//           onChange: (v) => updateMeshSetting("rotation", 1, v),
//         },
//         rotZ: {
//           value: currentSettings.rotation[2],
//           min: 0,
//           max: Math.PI * 2,
//           step: 0.01,
//           onChange: (v) => updateMeshSetting("rotation", 2, v),
//         },
//         scaleX: {
//           value: currentSettings.scale[0],
//           min: 0.01,
//           max: 2,
//           step: 0.01,
//           onChange: (v) => updateMeshSetting("scale", 0, v),
//         },
//         scaleY: {
//           value: currentSettings.scale[1],
//           min: 0.01,
//           max: 2,
//           step: 0.01,
//           onChange: (v) => updateMeshSetting("scale", 1, v),
//         },
//   //       resetPosition: button(() => {
//   //         setMeshSettings((prev) => ({
//   //           ...prev,
//   //           [currentMeshName]: { position: [0.00, 0.00, 0.00], rotation: [0.00, 0.00, 0.00], scale: [0.10, 0.10, 1] },
//   //         }));
//   //       }),
//   //       debug: { value: false },
//   //     }),
//   //   }),
//   //   [currentMeshName, currentSettings, modelScale] // Include modelScale in dependencies
//   // );
//   resetPosition: button(() => {
//     const defaultPositions = {
//       "Main003": { position: [0.00, 0.17, 0.10], rotation: [0.04, 0.01, 0.00], scale: [0.10, 0.17, 1] },
//       "Main004": { position: [0.00, 0.17, 0.10], rotation: [0.04, 0.01, 0.00], scale: [0.10, 0.17, 1] },
//       "Arms002": { position: [0.26, 0.10, 0.10], rotation: [0.00, 0.30, 0.00], scale: [0.07, 0.17, 0.1] },
//     };
    
//     setMeshSettings((prev) => ({
//       ...prev,
//       [currentMeshName]: defaultPositions[currentMeshName] || { position: [0.00, 0.00, 0.00], rotation: [0.00, 0.00, 0.00], scale: [0.10, 0.10, 1] },
//     }));
//   }),
//   debug: { value: false },
//       }),
//     }),
//   [currentMeshName, currentSettings, modelScale] // Include modelScale in dependencies
//   );
//   function updateMeshSetting(property, index, value) {
//     setMeshSettings((prev) => {
//       const newSettings = { ...prev };
//       const settingsCopy = { ...newSettings[currentMeshName] };
//       settingsCopy[property] = [...settingsCopy[property]];
//       settingsCopy[property][index] = value;
//       newSettings[currentMeshName] = settingsCopy;
//       return newSettings;
//     });
//   }

//   const { roughness, metalness, opacity, enableDecal, debug } = controlValues;

//   if (!nodes || !materials) {
//     return (
//       <mesh>
//         <boxGeometry args={[1, 1, 1]} />
//         <meshBasicMaterial color="red" />
//       </mesh>
//     );
//   }

//   return (
//     <group ref={modelRef} position={position} dispose={null}>
//       {/* {Object.entries(nodes).map(([name, node]) => {
//         if (node.isMesh) {
//           return (
//             <mesh
//               key={name}
//               name={name}
//               castShadow
//               receiveShadow
//               geometry={node.geometry}
//               material={
//                 node.material
//                   ? new THREE.MeshStandardMaterial().copy(materials[node.material.name] || materials.Configurator_01)
//                   : materials.Configurator_01
//               }
//             />
//           );
//         } */}
//         {/* return null;
//       })} */}

// {Object.entries(nodes).map(([name, node]) => {
//   if (node.isMesh) {
//     const isSelected = name === currentMeshName;
//     return (
//       <mesh
//         key={name}
//         name={name}
//         castShadow
//         receiveShadow
//         geometry={node.geometry}
//         material={
//           node.material
//             ? (() => {
//                 const material = new THREE.MeshStandardMaterial().copy(
//                   materials[node.material.name] || materials.Configurator_01
//                 );
//                 // Make selected mesh brighter
//                 if (isSelected) {
//                   material.emissive = new THREE.Color("#FFFFFF");
//                   material.emissiveIntensity = 0.2;
//                 }
//                 return material;
//               })()
//             : materials.Configurator_01
//         }
//       />
//     );
//   }
//   return null;
// })}

//       {/* {selectedMesh && enableDecal && logoTexture && (
//         <group scale={[1, 1, 1]}>
//           <mesh key={`decal-${currentMeshName}-${selectedMesh.name}`} geometry={selectedMesh.geometry}>
//             <Decal
//               ref={decalRef}
//               debug={debug}
//               position={adjustedDecalPosition}
//               rotation={currentSettings.rotation}
//               scale={currentSettings.scale}
//               map={logoTexture}
//               polygonOffset
//               polygonOffsetFactor={-10}
//               transparent
//             >
//               <meshStandardMaterial
//                 map={logoTexture}
//                 transparent
//                 opacity={opacity}
//                 depthTest={true}
//                 depthWrite={false}
//                 polygonOffset
//                 polygonOffsetFactor={-10}
//                 roughness={roughness}
//                 metalness={metalness}
//                 side={THREE.FrontSide}
//                 toneMapped={false}
//                 emissive="#FFFFFF"
//                 emissiveIntensity={0.1}
//               />
//             </Decal>
//           </mesh>
//         </group>
//       )} */}


// {selectedMesh && enableDecal && logoTexture && (
//   <group scale={[1, 1, 1]}>
//     <mesh key={`decal-${currentMeshName}-${selectedMesh.name}`} geometry={selectedMesh.geometry}>
//       <Decal
//         ref={decalRef}
//         debug={debug}
//         position={adjustedDecalPosition}
//         rotation={currentSettings.rotation}
//         scale={currentSettings.scale}
//         map={logoTexture}
//         polygonOffset
//         polygonOffsetFactor={-10}
//         transparent
//       >
//         <meshStandardMaterial
//           map={logoTexture}
//           transparent
//           opacity={opacity}
//           depthTest={true}
//           depthWrite={false}
//           polygonOffset
//           polygonOffsetFactor={-10}
//           roughness={roughness}
//           metalness={metalness}
//           side={THREE.DoubleSide} // Render on both sides to avoid culling issues
//           toneMapped={false}
//           emissive="#FFFFFF"
//           emissiveIntensity={0.1}
//         />
//       </Decal>
//     </mesh>
//   </group>
// )}
// {debug && (
//   <>
//     <mesh position={adjustedDecalPosition} scale={0.05}>
//       <sphereGeometry args={[1, 16, 16]} />
//       <meshBasicMaterial color="red" wireframe={false} />
//     </mesh>
//     <axesHelper args={[1]} position={adjustedDecalPosition} />
//     {console.log(`Mesh: ${currentMeshName}, Center:`, adjustedDecalPosition)}
//   </>
// )}
//     </group>
//   );
// }

// useGLTF.preload("/newbama1.glb");

import { useRef, useEffect, useState, useMemo } from "react";
import { useGLTF, Decal } from "@react-three/drei";
import * as THREE from "three";
import { useControls, folder, button } from "leva";

export function Hoodie({ position, scale = 1, decalProps = {} }) {
  const { nodes, materials, scene } = useGLTF("/newbama1.glb");
  const [defaultLogoTexture, setDefaultLogoTexture] = useState(null);
  const [customLogo, setCustomLogo] = useState(null);
  const [meshSettings, setMeshSettings] = useState({
    Main003: { position: [0.00, 0.17, 0.10], rotation: [0.04, 0.01, 0.00], scale: [0.10, 0.17, 1] },
    Main004: { position: [0.00, 0.17, 0.10], rotation: [0.04, 0.01, 0.00], scale: [0.10, 0.17, 1] },
    Arms002: { position: [0.26, 0.10, 0.10], rotation: [0.00, 0.30, 0.00], scale: [0.07, 0.17, 0.1] },
  });
  const modelRef = useRef();
  const decalRef = useRef();
  const [currentMeshName, setCurrentMeshName] = useState("Main003");
  const [modelScale, setModelScale] = useState(scale);

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      "/Diagonal.png",
      (texture) => {
        texture.flipY = false;
        texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.anisotropy = 16;
        const aspectRatio = texture.image.width / texture.image.height;
        setMeshSettings((prev) => ({
          ...prev,
          Main003: { ...prev["Main003"], scale: [0.10 * aspectRatio, 0.17, 1] },
          Main004: { ...prev["Main004"], scale: [0.10 * aspectRatio, 0.17, 1] },
          Arms002: { ...prev["Arms002"], scale: [0.07 * aspectRatio, 0.17, 1] },
        }));
        texture.needsUpdate = true;
        setDefaultLogoTexture(texture);
      },
      undefined,
      (error) => console.error("Failed to load default logo texture:", error)
    );
  }, []);

  useEffect(() => {
    if (decalProps.logoTexture) {
      const texture = decalProps.logoTexture;
      texture.flipY = false;
      texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = 16;
      texture.needsUpdate = true;
      setCustomLogo(texture);
    }
  }, [decalProps.logoTexture]);

  useEffect(() => {
    setModelScale(scale);
  }, [scale]);

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.scale.set(modelScale, modelScale, modelScale);
    }
  }, [modelScale]);

  const selectedMesh = useMemo(() => {
    if (!scene) return null;
    let foundMesh = null;
    scene.traverse((child) => {
      if (child.isMesh && child.name === currentMeshName) {
        foundMesh = child;
      }
    });
    return foundMesh;
  }, [scene, currentMeshName]);

  const meshCenter = useMemo(() => {
    if (!selectedMesh) return [0, 0, 0];
    const box = new THREE.Box3().setFromObject(selectedMesh);
    const center = new THREE.Vector3();
    box.getCenter(center);
    return [center.x, center.y, center.z];
  }, [selectedMesh]);

  const currentSettings = meshSettings[currentMeshName] || {
    position: meshCenter,
    rotation: [0, 0, 0],
    scale: [0.1, 0.1, 1],
  };
  const logoTexture = customLogo || defaultLogoTexture;

  const adjustedDecalPosition = useMemo(() => {
    const offsetZ = currentMeshName === "Arms002" ? 0.05 : 0; // Adjust for Arms002
    return [meshCenter[0], meshCenter[1], meshCenter[2] + offsetZ];
  }, [meshCenter, currentMeshName]);

  const [controlValues, setControlValues] = useControls(
    () => ({
      "Hoodie Options": folder({
        meshName: {
          options: { Main003: "Main003", Main004: "Main004", Arms002: "Arms002" },
          value: currentMeshName,
          onChange: (value) => setCurrentMeshName(value),
        },
        roughness: { value: 0.7, min: 0, max: 1, step: 0.01 },
        metalness: { value: 0.1, min: 0, max: 1, step: 0.01 },
        opacity: { value: 1, min: 0, max: 1, step: 0.01 },
        enableDecal: { value: true, label: "Show Logo" },
        modelScale: { value: modelScale, min: 0.5, max: 2, step: 0.1, onChange: (v) => setModelScale(v) },
      }),
      "Logo Position": folder({
        posX: {
          value: currentSettings.position[0],
          min: -2,
          max: 2,
          step: 0.01,
          onChange: (v) => updateMeshSetting("position", 0, v),
        },
        posY: {
          value: currentSettings.position[1],
          min: -2,
          max: 2,
          step: 0.01,
          onChange: (v) => updateMeshSetting("position", 1, v),
        },
        posZ: {
          value: currentSettings.position[2],
          min: -1,
          max: 1,
          step: 0.01,
          onChange: (v) => updateMeshSetting("position", 2, v),
        },
        rotX: {
          value: currentSettings.rotation[0],
          min: 0,
          max: Math.PI * 2,
          step: 0.01,
          onChange: (v) => updateMeshSetting("rotation", 0, v),
        },
        rotY: {
          value: currentSettings.rotation[1],
          min: 0,
          max: Math.PI * 2,
          step: 0.01,
          onChange: (v) => updateMeshSetting("rotation", 1, v),
        },
        rotZ: {
          value: currentSettings.rotation[2],
          min: 0,
          max: Math.PI * 2,
          step: 0.01,
          onChange: (v) => updateMeshSetting("rotation", 2, v),
        },
        scaleX: {
          value: currentSettings.scale[0],
          min: 0.01,
          max: 2,
          step: 0.01,
          onChange: (v) => updateMeshSetting("scale", 0, v),
        },
        scaleY: {
          value: currentSettings.scale[1],
          min: 0.01,
          max: 2,
          step: 0.01,
          onChange: (v) => updateMeshSetting("scale", 1, v),
        },
        resetPosition: button(() => {
          setMeshSettings((prev) => ({
            ...prev,
            [currentMeshName]: { position: meshCenter, rotation: [0, 0, 0], scale: [0.10, 0.17, 1] },
          }));
        }),
        debug: { value: false },
      }),
    }),
    [currentMeshName, currentSettings, modelScale, meshCenter]
  );

  function updateMeshSetting(property, index, value) {
    setMeshSettings((prev) => {
      const newSettings = { ...prev };
      const settingsCopy = { ...newSettings[currentMeshName] };
      settingsCopy[property] = [...settingsCopy[property]];
      settingsCopy[property][index] = value;
      newSettings[currentMeshName] = settingsCopy;
      return newSettings;
    });
  }

  const { roughness, metalness, opacity, enableDecal, debug } = controlValues;

  if (!nodes || !materials) {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="red" />
      </mesh>
    );
  }

  return (
    <group ref={modelRef} position={position} dispose={null}>
      {Object.entries(nodes).map(([name, node]) => {
        if (node.isMesh) {
          const isSelected = name === currentMeshName;
          return (
            <mesh
              key={name}
              name={name}
              castShadow
              receiveShadow
              geometry={node.geometry}
              material={
                node.material
                  ? (() => {
                      const material = new THREE.MeshStandardMaterial().copy(
                        materials[node.material.name] || materials.Configurator_01
                      );
                      if (isSelected) {
                        material.emissive = new THREE.Color("#FFFFFF");
                        material.emissiveIntensity = 0.2;
                      }
                      return material;
                    })()
                  : materials.Configurator_01
              }
            />
          );
        }
        return null;
      })}

      {selectedMesh && enableDecal && logoTexture && (
        <group scale={[1, 1, 1]}>
          <mesh key={`decal-${currentMeshName}-${selectedMesh.name}`} geometry={selectedMesh.geometry}>
            <Decal
              ref={decalRef}
              debug={debug}
              position={adjustedDecalPosition}
              rotation={currentSettings.rotation}
              scale={currentSettings.scale}
              map={logoTexture}
              polygonOffset
              polygonOffsetFactor={-10}
              transparent
            >
              <meshStandardMaterial
                map={logoTexture}
                transparent
                opacity={opacity}
                depthTest={true}
                depthWrite={false}
                polygonOffset
                polygonOffsetFactor={-10}
                roughness={roughness}
                metalness={metalness}
                side={THREE.DoubleSide}
                toneMapped={false}
                emissive="#FFFFFF"
                emissiveIntensity={0.1}
              />
            </Decal>
          </mesh>
        </group>
      )}

      {debug && (
        <>
          <mesh position={adjustedDecalPosition} scale={0.05}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial color="red" wireframe={false} />
          </mesh>
          <axesHelper args={[1]} position={adjustedDecalPosition} />
          {console.log(`Mesh: ${currentMeshName}, Center:`, adjustedDecalPosition)}
        </>
      )}
    </group>
  );
}

useGLTF.preload("/newbama1.glb");