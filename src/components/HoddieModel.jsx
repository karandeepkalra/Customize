// // import { useRef, useEffect, useState, useMemo } from "react";
// // import { useGLTF, Decal } from "@react-three/drei";
// // import * as THREE from "three";
// // import { useControls, folder, button } from "leva";

// // export function Hoodie({ position, scale = 1, decalProps = {} }) {
// //   const { nodes, materials, scene } = useGLTF("/newbama1.glb");
// //   const [textures, setTextures] = useState({
// //     Main003: null,
// //     Main004: null,
// //     Arms002: null
// //   });
  
// //   const [meshSettings, setMeshSettings] = useState({
// //     Main003: { position: [0.00, 0.17, 0.10], rotation: [0.04, 0.01, 0.00], scale: [0.10, 0.17, 1] },
// //     Main004: { position: [0.00, 0.17, 0.10], rotation: [0.04, 0.01, 0.00], scale: [0.10, 0.17, 1] },
// //     Arms002: { position: [0.26, 0.10, 0.10], rotation: [0.00, 0.30, 0.00], scale: [0.07, 0.17, 0.1] },
// //   });
  
// //   const modelRef = useRef();
// //   const decalRef = useRef();
// //   const [currentMeshName, setCurrentMeshName] = useState("Main003");
// //   const [modelScale, setModelScale] = useState(scale);

// //   // Load default textures for each mesh
// //   useEffect(() => {
// //     const textureLoader = new THREE.TextureLoader();
// //     const defaultTextures = {
// //       Main003: "/logoPrint.jpeg",
// //       Main004: "/Decal.webp", // Replace with actual path
// //       Arms002: "/Diagonal.png" 
// //     };
    
// //     // Load all textures
// //     Object.entries(defaultTextures).forEach(([meshName, texturePath]) => {
// //       textureLoader.load(
// //         texturePath,
// //         (texture) => {
// //           texture.flipY = false;
// //           texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
// //           texture.minFilter = THREE.LinearFilter;
// //           texture.magFilter = THREE.LinearFilter;
// //           texture.anisotropy = 16;
          
// //           const aspectRatio = texture.image.width / texture.image.height;
          
// //           // Update mesh settings based on texture aspect ratio
// //           setMeshSettings(prev => ({
// //             ...prev,
// //             [meshName]: { 
// //               ...prev[meshName], 
// //               scale: [
// //                 prev[meshName].scale[0] * aspectRatio, 
// //                 prev[meshName].scale[1], 
// //                 1
// //               ] 
// //             },
// //           }));
          
// //           texture.needsUpdate = true;
          
// //           // Update the textures state
// //           setTextures(prev => ({
// //             ...prev,
// //             [meshName]: texture
// //           }));
// //         },
// //         undefined,
// //         (error) => console.error(`Failed to load texture for ${meshName}:`, error)
// //       );
// //     });
// //   }, []);

// //   // Handle custom logo if provided via props
// //   useEffect(() => {
// //     if (decalProps.customTextures) {
// //       Object.entries(decalProps.customTextures).forEach(([meshName, texture]) => {
// //         if (texture) {
// //           texture.flipY = false;
// //           texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
// //           texture.minFilter = THREE.LinearFilter;
// //           texture.magFilter = THREE.LinearFilter;
// //           texture.anisotropy = 16;
// //           texture.needsUpdate = true;
          
// //           setTextures(prev => ({
// //             ...prev,
// //             [meshName]: texture
// //           }));
// //         }
// //       });
// //     }
// //   }, [decalProps.customTextures]);

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

// //   // Find selected mesh
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

// //   // Calculate mesh center
// //   const meshCenter = useMemo(() => {
// //     if (!selectedMesh) return [0, 0, 0];
// //     const box = new THREE.Box3().setFromObject(selectedMesh);
// //     const center = new THREE.Vector3();
// //     box.getCenter(center);
// //     return [center.x, center.y, center.z];
// //   }, [selectedMesh]);

// //   const currentSettings = meshSettings[currentMeshName] || {
// //     position: meshCenter,
// //     rotation: [0, 0, 0],
// //     scale: [0.1, 0.1, 1],
// //   };

// //   const adjustedDecalPosition = useMemo(() => {
// //     const offsetZ = currentMeshName === "Arms002" ? 0.05 : 0;
// //     return [meshCenter[0], meshCenter[1], meshCenter[2] + offsetZ];
// //   }, [meshCenter, currentMeshName]);

// //   // Leva controls
// //   const [controlValues] = useControls(
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
// //         enableDecal: { value: true, label: "Show Images" },
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
// //         resetPosition: button(() => {
// //           setMeshSettings((prev) => ({
// //             ...prev,
// //             [currentMeshName]: { 
// //               position: meshCenter, 
// //               rotation: [0, 0, 0], 
// //               scale: [0.10, 0.17, 1] 
// //             },
// //           }));
// //         }),
// //         debug: { value: false },
// //       }),
// //     }),
// //     [currentMeshName, currentSettings, modelScale, meshCenter]
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
// //       {/* Render all meshes */}
// //       {Object.entries(nodes).map(([name, node]) => {
// //         if (node.isMesh) {
// //           const isSelected = name === currentMeshName;
// //           return (
// //             <mesh
// //               key={name}
// //               name={name}
// //               castShadow
// //               receiveShadow
// //               geometry={node.geometry}
// //               material={
// //                 node.material
// //                   ? (() => {
// //                       const material = new THREE.MeshStandardMaterial().copy(
// //                         materials[node.material.name] || materials.Configurator_01
// //                       );
// //                       if (isSelected) {
// //                         material.emissive = new THREE.Color("#FFFFFF");
// //                         material.emissiveIntensity = 0.2;
// //                       }
// //                       return material;
// //                     })()
// //                   : materials.Configurator_01
// //               }
// //             />
// //           );
// //         }
// //         return null;
// //       })}

// //       {/* Apply decals to ALL meshes (not just the selected one) */}
// //       {enableDecal && Object.entries(nodes).map(([name, node]) => {
// //         if (node.isMesh && ["Main003", "Main004", "Arms002"].includes(name) && textures[name]) {
// //           const settings = meshSettings[name];
// //           const centerBox = new THREE.Box3().setFromObject(node);
// //           const center = new THREE.Vector3();
// //           centerBox.getCenter(center);
// //           const offsetZ = name === "Arms002" ? 0.05 : 0;
// //           const decalPosition = [center.x, center.y, center.z + offsetZ];
          
// //           return (
// //             <group key={`decal-group-${name}`} scale={[1, 1, 1]}>
// //               <mesh geometry={node.geometry}>
// //                 <Decal
// //                   key={`decal-${name}`}
// //                   debug={debug && name === currentMeshName}
// //                   position={settings.position}
// //                   rotation={settings.rotation}
// //                   scale={settings.scale}
// //                   map={textures[name]}
// //                   polygonOffset
// //                   polygonOffsetFactor={-10}
// //                   transparent
// //                 >
// //                   <meshStandardMaterial
// //                     map={textures[name]}
// //                     transparent
// //                     opacity={opacity}
// //                     depthTest={true}
// //                     depthWrite={false}
// //                     polygonOffset
// //                     polygonOffsetFactor={-10}
// //                     roughness={roughness}
// //                     metalness={metalness}
// //                     side={THREE.DoubleSide}
// //                     toneMapped={false}
// //                     emissive="#FFFFFF"
// //                     emissiveIntensity={0.1}
// //                   />
// //                 </Decal>
// //               </mesh>
// //             </group>
// //           );
// //         }
// //         return null;
// //       })}

// //       {/* Debug visualizations */}
// //       {debug && (
// //         <>
// //           <mesh position={adjustedDecalPosition} scale={0.05}>
// //             <sphereGeometry args={[1, 16, 16]} />
// //             <meshBasicMaterial color="red" wireframe={false} />
// //           </mesh>
// //           <axesHelper args={[1]} position={adjustedDecalPosition} />
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
//   const [textures, setTextures] = useState({
//     Main003: null,
//     Main004: null,
//     Arms002: null
//   });
  
//   // Initialize default settings for each mesh
//   const [meshSettings, setMeshSettings] = useState({
//     Main003: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [0.1, 0.1, 1] },
//     Main004: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [0.1, 0.1, 1] },
//     Arms002: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [0.1, 0.1, 1] },
//   });
  
//   const modelRef = useRef();
//   const [currentMeshName, setCurrentMeshName] = useState("Main003");
//   const [modelScale, setModelScale] = useState(scale);
//   const [meshCenters, setMeshCenters] = useState({});

//   // Calculate and store centers for all meshes
//   useEffect(() => {
//     if (!scene) return;
    
//     const centers = {};
    
//     ["Main003", "Main004", "Arms002"].forEach(meshName => {
//       let foundMesh = null;
      
//       scene.traverse((child) => {
//         if (child.isMesh && child.name === meshName) {
//           foundMesh = child;
//         }
//       });
      
//       if (foundMesh) {
//         // Calculate the bounding box center
//         const box = new THREE.Box3().setFromObject(foundMesh);
//         const center = new THREE.Vector3();
//         box.getCenter(center);
        
//         centers[meshName] = [center.x, center.y, center.z];
        
//         // Update mesh settings with calculated center position
//         setMeshSettings(prev => ({
//           ...prev,
//           [meshName]: {
//             ...prev[meshName],
//             position: [center.x, center.y, center.z]
//           }
//         }));
//       }
//     });
    
//     setMeshCenters(centers);
//   }, [scene]);

//   // Load default textures for each mesh
//   useEffect(() => {
//     const textureLoader = new THREE.TextureLoader();
//     const defaultTextures = {
//       Main003: "/logoPrint.jpeg",
//       Main004: "/Decal.webp",
//       Arms002: "/Diagonal.png" 
//     };
    
//     // Load all textures
//     Object.entries(defaultTextures).forEach(([meshName, texturePath]) => {
//       textureLoader.load(
//         texturePath,
//         (texture) => {
//           texture.flipY = false;
//           texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
//           texture.minFilter = THREE.LinearFilter;
//           texture.magFilter = THREE.LinearFilter;
//           texture.anisotropy = 16;
          
//           // Calculate aspect ratio of texture
//           const aspectRatio = texture.image.width / texture.image.height;
          
//           // Update mesh settings to maintain aspect ratio but keep centered
//           setMeshSettings(prev => ({
//             ...prev,
//             [meshName]: { 
//               ...prev[meshName], 
//               scale: [
//                 0.1 * aspectRatio, 
//                 0.1, 
//                 1
//               ] 
//             },
//           }));
          
//           texture.needsUpdate = true;
          
//           // Update the textures state
//           setTextures(prev => ({
//             ...prev,
//             [meshName]: texture
//           }));
//         },
//         undefined,
//         (error) => console.error(`Failed to load texture for ${meshName}:`, error)
//       );
//     });
//   }, []);

//   // Handle custom logo if provided via props
//   useEffect(() => {
//     if (decalProps.customTextures) {
//       Object.entries(decalProps.customTextures).forEach(([meshName, texture]) => {
//         if (texture) {
//           texture.flipY = false;
//           texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
//           texture.minFilter = THREE.LinearFilter;
//           texture.magFilter = THREE.LinearFilter;
//           texture.anisotropy = 16;
//           texture.needsUpdate = true;
          
//           // Calculate aspect ratio for custom textures too
//           const aspectRatio = texture.image.width / texture.image.height;
          
//           setTextures(prev => ({
//             ...prev,
//             [meshName]: texture
//           }));
          
//           // Update scale while maintaining aspect ratio
//           setMeshSettings(prev => ({
//             ...prev,
//             [meshName]: { 
//               ...prev[meshName], 
//               scale: [
//                 0.1 * aspectRatio, 
//                 0.1, 
//                 1
//               ] 
//             },
//           }));
//         }
//       });
//     }
//   }, [decalProps.customTextures]);

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

//   // Find selected mesh
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

//   // Calculate mesh center for the currently selected mesh
//   const meshCenter = useMemo(() => {
//     return meshCenters[currentMeshName] || [0, 0, 0];
//   }, [meshCenters, currentMeshName]);

//   const currentSettings = meshSettings[currentMeshName] || {
//     position: meshCenter,
//     rotation: [0, 0, 0],
//     scale: [0.1, 0.1, 1],
//   };

//   // Leva controls with proper initialization using mesh centers
//   const [controlValues] = useControls(
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
//         enableDecal: { value: true, label: "Show Images" },
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
//         resetPosition: button(() => {
//           // Reset to the calculated center position for this mesh
//           const center = meshCenters[currentMeshName] || [0, 0, 0];
//           const aspectRatio = textures[currentMeshName]?.image.width / textures[currentMeshName]?.image.height || 1;
          
//           setMeshSettings((prev) => ({
//             ...prev,
//             [currentMeshName]: { 
//               position: center, 
//               rotation: [0, 0, 0], 
//               scale: [0.1 * aspectRatio, 0.1, 1] 
//             },
//           }));
//         }),
//         debug: { value: false },
//       }),
//     }),
//     [currentMeshName, currentSettings, modelScale, meshCenter]
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
//       {/* Render all meshes */}
//       {Object.entries(nodes).map(([name, node]) => {
//         if (node.isMesh) {
//           const isSelected = name === currentMeshName;
//           return (
//             <mesh
//               key={name}
//               name={name}
//               castShadow
//               receiveShadow
//               geometry={node.geometry}
//               material={
//                 node.material
//                   ? (() => {
//                       const material = new THREE.MeshStandardMaterial().copy(
//                         materials[node.material.name] || materials.Configurator_01
//                       );
//                       if (isSelected) {
//                         material.emissive = new THREE.Color("#FFFFFF");
//                         material.emissiveIntensity = 0.2;
//                       }
//                       return material;
//                     })()
//                   : materials.Configurator_01
//               }
//             />
//           );
//         }
//         return null;
//       })}

//       {/* Apply decals to meshes with properly calculated positions */}
//       {enableDecal && Object.entries(nodes).map(([name, node]) => {
//         if (node.isMesh && ["Main003", "Main004", "Arms002"].includes(name) && textures[name]) {
//           const settings = meshSettings[name];
          
//           return (
//             <group key={`decal-group-${name}`} scale={[1, 1, 1]}>
//               <mesh geometry={node.geometry}>
//                 <Decal
//                   key={`decal-${name}`}
//                   debug={debug && name === currentMeshName}
//                   position={settings.position}
//                   rotation={settings.rotation}
//                   scale={settings.scale}
//                   map={textures[name]}
//                   polygonOffset
//                   polygonOffsetFactor={-10}
//                   transparent
//                 >
//                   <meshStandardMaterial
//                     map={textures[name]}
//                     transparent
//                     opacity={opacity}
//                     depthTest={true}
//                     depthWrite={false}
//                     polygonOffset
//                     polygonOffsetFactor={-10}
//                     roughness={roughness}
//                     metalness={metalness}
//                     side={THREE.DoubleSide}
//                     toneMapped={false}
//                     emissive="#FFFFFF"
//                     emissiveIntensity={0.1}
//                   />
//                 </Decal>
//               </mesh>
//             </group>
//           );
//         }
//         return null;
//       })}

//       {/* Debug visualizations */}
//       {debug && currentMeshName && meshCenters[currentMeshName] && (
//         <>
//           <mesh position={meshCenters[currentMeshName]} scale={0.05}>
//             <sphereGeometry args={[1, 16, 16]} />
//             <meshBasicMaterial color="red" wireframe={false} />
//           </mesh>
//           <axesHelper args={[1]} position={meshCenters[currentMeshName]} />
//         </>
//       )}
//     </group>
//   );
// }

// useGLTF.preload("/newbama1.glb");



// import { useRef, useEffect, useState, useMemo } from "react";
// import { useGLTF, Decal } from "@react-three/drei";
// import * as THREE from "three";
// import { useControls, folder, button } from "leva";

// export function Hoodie({ position, scale = 1, decalProps = {} }) {
//   const { nodes, materials, scene } = useGLTF("/newbama1.glb");
//   const [textures, setTextures] = useState({
//     Main003: null,
//     Main004: null,
//     Arms002: null
//   });
  
//   // Initialize default settings for each mesh
//   const [meshSettings, setMeshSettings] = useState({
//     Main003: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [0.1, 0.1, 1] },
//     Main004: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [0.1, 0.1, 1] },
//     Arms002: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [0.1, 0.1, 1] },
//   });
  
//   const modelRef = useRef();
//   const meshRefs = useRef({
//     Main003: null,
//     Main004: null,
//     Arms002: null
//   });
//   const [currentMeshName, setCurrentMeshName] = useState("Main003");
//   const [modelScale, setModelScale] = useState(scale);
//   const [meshCenters, setMeshCenters] = useState({});

//   // Calculate and store centers for all meshes
//   useEffect(() => {
//     if (!scene) return;
    
//     const centers = {};
    
//     ["Main003", "Main004", "Arms002"].forEach(meshName => {
//       let foundMesh = null;
      
//       scene.traverse((child) => {
//         if (child.isMesh && child.name === meshName) {
//           foundMesh = child;
//         }
//       });
      
//       if (foundMesh) {
//         // Calculate the bounding box center
//         const box = new THREE.Box3().setFromObject(foundMesh);
//         const center = new THREE.Vector3();
//         box.getCenter(center);
        
//         centers[meshName] = [center.x, center.y, center.z + 0.01];
        
//         // Update mesh settings with calculated center position
//         setMeshSettings(prev => ({
//           ...prev,
//           [meshName]: {
//             ...prev[meshName],
//             position: [center.x, center.y, center.z + 0.01]
//           }
//         }));
//       }
//     });
    
//     setMeshCenters(centers);
//   }, [scene]);

//   // Load default textures for each mesh
//   useEffect(() => {
//     const textureLoader = new THREE.TextureLoader();
//     const defaultTextures = {
//       Main003: "/logoPrint.jpeg",
//       Main004: "/Decal.webp",
//       Arms002: "/Diagonal.png" 
//     };
    
//     // Load all textures
//     Object.entries(defaultTextures).forEach(([meshName, texturePath]) => {
//       textureLoader.load(
//         texturePath,
//         (texture) => {
//           texture.flipY = false;
//           texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
//           texture.minFilter = THREE.LinearFilter;
//           texture.magFilter = THREE.LinearFilter;
//           texture.anisotropy = 16;
          
//           // Calculate aspect ratio of texture
//           const aspectRatio = texture.image.width / texture.image.height;
          
//           // Update mesh settings to maintain aspect ratio but keep centered
//           setMeshSettings(prev => ({
//             ...prev,
//             [meshName]: { 
//               ...prev[meshName], 
//               scale: [
//                 0.1 * aspectRatio, 
//                 0.1, 
//                 1
//               ] 
//             },
//           }));
          
//           texture.needsUpdate = true;
          
//           // Update the textures state
//           setTextures(prev => ({
//             ...prev,
//             [meshName]: texture
//           }));
//         },
//         undefined,
//         (error) => console.error(`Failed to load texture for ${meshName}:`, error)
//       );
//     });
//   }, []);

//   // Handle custom logo if provided via props
//   useEffect(() => {
//     if (decalProps.customTextures) {
//       Object.entries(decalProps.customTextures).forEach(([meshName, texture]) => {
//         if (texture) {
//           texture.flipY = false;
//           texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
//           texture.minFilter = THREE.LinearFilter;
//           texture.magFilter = THREE.LinearFilter;
//           texture.anisotropy = 16;
//           texture.needsUpdate = true;
          
//           // Calculate aspect ratio for custom textures too
//           const aspectRatio = texture.image.width / texture.image.height;
          
//           setTextures(prev => ({
//             ...prev,
//             [meshName]: texture
//           }));
          
//           // Update scale while maintaining aspect ratio
//           setMeshSettings(prev => ({
//             ...prev,
//             [meshName]: { 
//               ...prev[meshName], 
//               scale: [
//                 0.1 * aspectRatio, 
//                 0.1, 
//                 1
//               ] 
//             },
//           }));
//         }
//       });
//     }
//   }, [decalProps.customTextures]);

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

//   // Get current settings for the selected mesh
//   const currentSettings = useMemo(() => {
//     return meshSettings[currentMeshName] || {
//       position: [0, 0, 0],
//       rotation: [0, 0, 0],
//       scale: [0.1, 0.1, 1],
//     };
//   }, [meshSettings, currentMeshName]);

//   // Get current mesh center
//   const meshCenter = useMemo(() => {
//     return meshCenters[currentMeshName] || [0, 0, 0];
//   }, [meshCenters, currentMeshName]);

//   // Leva controls with proper initialization using mesh centers
//   const [controlValues] = useControls(
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
//         enableDecal: { value: true, label: "Show Images" },
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
//         resetPosition: button(() => {
//           // Reset to the calculated center position for this mesh
//           const center = meshCenters[currentMeshName] || [0, 0, 0];
//           const aspectRatio = textures[currentMeshName]?.image.width / textures[currentMeshName]?.image.height || 1;
          
//           setMeshSettings((prev) => ({
//             ...prev,
//             [currentMeshName]: { 
//               position: center, 
//               rotation: [0, 0, 0], 
//               scale: [0.1 * aspectRatio, 0.1, 1] 
//             },
//           }));
//         }),
//         debug: { value: false },
//       }),
//     }),
//     [currentMeshName, currentSettings, modelScale, meshCenter]
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
//       {/* Render all meshes - saving refs to mesh objects */}
//       {Object.entries(nodes).map(([name, node]) => {
//         if (node.isMesh) {
//           const isSelected = name === currentMeshName;
//           const isTargetMesh = ["Main003", "Main004", "Arms002"].includes(name);
          
//           // Create mesh with possible decal as child
//           return (
//             <mesh
//               key={name}
//               name={name}
//               ref={isTargetMesh ? (el) => (meshRefs.current[name] = el) : null}
//               castShadow
//               receiveShadow
//               geometry={node.geometry}
//               material={
//                 node.material
//                   ? (() => {
//                       const material = new THREE.MeshStandardMaterial().copy(
//                         materials[node.material.name] || materials.Configurator_01
//                       );
//                       if (isSelected) {
//                         material.emissive = new THREE.Color("#FFFFFF");
//                         material.emissiveIntensity = 0.2;
//                       }
//                       return material;
//                     })()
//                   : materials.Configurator_01
//               }
//             >
//               {/* Add decal as child of the mesh - this fixes the error */}
//               {enableDecal && isTargetMesh && textures[name] && (
//                 <Decal
//                   position={meshSettings[name].position}
//                   rotation={meshSettings[name].rotation}
//                   scale={meshSettings[name].scale}
//                   debug={debug && name === currentMeshName}
//                 >
//                   <meshStandardMaterial
//                     map={textures[name]}
//                     transparent
//                     opacity={opacity}
//                     depthTest={true}
//                     depthWrite={false}
//                     polygonOffset
//                     polygonOffsetFactor={-10}
//                     roughness={roughness}
//                     metalness={metalness}
//                     side={THREE.DoubleSide}
//                     toneMapped={false}
//                     emissive="#FFFFFF"
//                     emissiveIntensity={0.1}
//                   />
//                 </Decal>
//               )}
//             </mesh>
//           );
//         }
//         return null;
//       })}

//       {/* Debug visualizations */}
//       {debug && currentMeshName && meshCenters[currentMeshName] && (
//         <>
//           <mesh position={meshCenters[currentMeshName]} scale={0.05}>
//             <sphereGeometry args={[1, 16, 16]} />
//             <meshBasicMaterial color="red" wireframe={false} />
//           </mesh>
//           <axesHelper args={[1]} position={meshCenters[currentMeshName]} />
//         </>
//       )}
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
  const [textures, setTextures] = useState({
    Main003: null,
    Main004: null,
    Arms002: null
  });
  
  const [meshSettings, setMeshSettings] = useState({
    Main003: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [0.1, 0.1, 1] },
    Main004: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [0.1, 0.1, 1] },
    Arms002: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [0.1, 0.1, 1] },
  });
  
  const modelRef = useRef();
  const meshRefs = useRef({
    Main003: null,
    Main004: null,
    Arms002: null
  });
  const [modelScale, setModelScale] = useState(scale);
  const [meshCenters, setMeshCenters] = useState({});

  // Calculate and store centers for all meshes
  useEffect(() => {
    if (!scene) return;
    
    const centers = {};
    
    ["Main003", "Main004", "Arms002"].forEach(meshName => {
      let foundMesh = null;
      
      scene.traverse((child) => {
        if (child.isMesh && child.name === meshName) {
          foundMesh = child;
        }
      });
      
      if (foundMesh) {
        const box = new THREE.Box3().setFromObject(foundMesh);
        const center = new THREE.Vector3();
        box.getCenter(center);
        
        centers[meshName] = [center.x, center.y, center.z + 0.01];
        
        setMeshSettings(prev => ({
          ...prev,
          [meshName]: {
            ...prev[meshName],
            position: [center.x, center.y, center.z + 0.01]
          }
        }));
      }
    });
    
    setMeshCenters(centers);
  }, [scene]);

  // Load default textures for each mesh
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    const defaultTextures = {
      Main003: "/logoPrint.jpeg",
      Main004: "/Decal.webp",
      Arms002: "/Diagonal.png" 
    };
    
    Object.entries(defaultTextures).forEach(([meshName, texturePath]) => {
      textureLoader.load(
        texturePath,
        (texture) => {
          texture.flipY = false;
          texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.anisotropy = 16;
          
          const aspectRatio = texture.image.width / texture.image.height;
          
          setMeshSettings(prev => ({
            ...prev,
            [meshName]: { 
              ...prev[meshName], 
              scale: [0.1 * aspectRatio, 0.1, 1] 
            },
          }));
          
          texture.needsUpdate = true;
          
          setTextures(prev => ({
            ...prev,
            [meshName]: texture
          }));
        },
        undefined,
        (error) => console.error(`Failed to load texture for ${meshName}:`, error)
      );
    });
  }, []);

  // Handle custom logo if provided via props
  useEffect(() => {
    if (decalProps.customTextures) {
      Object.entries(decalProps.customTextures).forEach(([meshName, texture]) => {
        if (texture) {
          texture.flipY = false;
          texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.anisotropy = 16;
          texture.needsUpdate = true;
          
          const aspectRatio = texture.image.width / texture.image.height;
          
          setTextures(prev => ({
            ...prev,
            [meshName]: texture
          }));
          
          setMeshSettings(prev => ({
            ...prev,
            [meshName]: { 
              ...prev[meshName], 
              scale: [0.1 * aspectRatio, 0.1, 1] 
            },
          }));
        }
      });
    }
  }, [decalProps.customTextures]);

  // Track scale changes
  useEffect(() => {
    setModelScale(scale);
  }, [scale]);

  // Apply scale to model
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.scale.set(modelScale, modelScale, modelScale);
    }
  }, [modelScale]);

  // Leva controls without mesh selection
  const [controlValues] = useControls(() => ({
    "Hoodie Options": folder({
      roughness: { value: 0.7, min: 0, max: 1, step: 0.01 },
      metalness: { value: 0.1, min: 0, max: 1, step: 0.01 },
      opacity: { value: 1, min: 0, max: 1, step: 0.01 },
      enableDecal: { value: true, label: "Show Images" },
      modelScale: { value: modelScale, min: 0.5, max: 2, step: 0.1, onChange: (v) => setModelScale(v) },
    }),
  }), [modelScale]);

  const { roughness, metalness, opacity, enableDecal } = controlValues;

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
          const isTargetMesh = ["Main003", "Main004", "Arms002"].includes(name);
          
          return (
            <mesh
              key={name}
              name={name}
              ref={isTargetMesh ? (el) => (meshRefs.current[name] = el) : null}
              castShadow
              receiveShadow
              geometry={node.geometry}
              material={
                node.material
                  ? new THREE.MeshStandardMaterial().copy(
                      materials[node.material.name] || materials.Configurator_01
                    )
                  : materials.Configurator_01
              }
            >
              {enableDecal && isTargetMesh && textures[name] && (
                <Decal
                  position={meshSettings[name].position}
                  rotation={[
                    meshSettings[name].rotation[0] + Math.PI, // flip upside-down
                    meshSettings[name].rotation[1]+Math.PI,
                    meshSettings[name].rotation[2]
                  ]}
                  scale={meshSettings[name].scale}
                >
                  <meshStandardMaterial
                    map={textures[name]}
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
              )}
            </mesh>
          );
        }
        return null;
      })}
    </group>
  );
}

useGLTF.preload("/newbama1.glb");