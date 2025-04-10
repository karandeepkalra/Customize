// // // import { useRef, useEffect, useState } from "react";
// // // import { useGLTF, Decal } from "@react-three/drei";
// // // import * as THREE from "three";
// // // import { useControls, folder } from "leva";
// // // export function Hoodie({ position, scale = 1, decalProps = {} }) {
// // //   const { nodes, materials, scene } = useGLTF("/newbama1.glb");
// // //   const [defaultLogoTexture, setDefaultLogoTexture] = useState(null);
// // //   const [customLogo, setCustomLogo] = useState(null);
// // //   const [selectedMesh, setSelectedMesh] = useState(null);
// // //   const modelRef = useRef();
// // //   const decalRef = useRef();
// // //   // Get all available mesh names for control panel
// // //   const [meshNames, setMeshNames] = useState([]);
// // //   // Load default logo texture
// // //   useEffect(() => {
// // //     const textureLoader = new THREE.TextureLoader();
// // //     textureLoader.load(
// // //       "/Diagonal.png", // Default IKARUS 3D logo path
// // //       (texture) => {
// // //         // Apply correct texture settings for crisp logo rendering
// // //         texture.flipY = false;
// // //         texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
// // //         texture.minFilter = THREE.LinearFilter;
// // //         texture.magFilter = THREE.LinearFilter;
// // //         texture.anisotropy = 16; // Improve texture quality
// // //         texture.needsUpdate = true;
// // //         setDefaultLogoTexture(texture);
// // //         console.log("Default logo texture loaded successfully", texture.image.width, texture.image.height);
// // //       },
// // //       undefined,
// // //       (error) => {
// // //         console.error("Failed to load default logo texture:", error);
// // //       }
// // //     );
// // //   }, []);
// // //   // Handle custom logo from props
// // //   useEffect(() => {
// // //     if (decalProps.logoTexture) {
// // //       const texture = decalProps.logoTexture;
// // //       texture.flipY = false;
// // //       texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
// // //       texture.minFilter = THREE.LinearFilter;
// // //       texture.magFilter = THREE.LinearFilter;
// // //       texture.anisotropy = 16; // Improve texture quality
// // //       texture.needsUpdate = true;
// // //       setCustomLogo(texture);
// // //       console.log("Custom logo texture applied");
// // //     }
// // //   }, [decalProps.logoTexture]);
// // //   // Select mesh and center model
// // //   useEffect(() => {
// // //     if (!scene) return;
// // //     const names = [];
// // //     scene.traverse((child) => {
// // //       if (child.isMesh) {
// // //         names.push(child.name);
// // //         if (child.name === "Main003") {
// // //           setSelectedMesh(child);
// // //           console.log("Found Main003 mesh for decal", child);
// // //         }
// // //       }
// // //     });
// // //     setMeshNames(names);
// // //     console.log("Available meshes:", names);
// // //     const box = new THREE.Box3().setFromObject(scene);
// // //     const center = box.getCenter(new THREE.Vector3());
// // //     scene.position.set(-center.x, -center.y, -center.z);
// // //     console.log("Centered model at:", center);
// // //   }, [scene]);
// // //   // Prepare the logo texture to use
// // //   const logoTexture = customLogo || defaultLogoTexture;
// // //   // Controls for the decal (using reference values from first image)
// // //   const {
// // //     posX, posY, posZ,
// // //     rotX, rotY, rotZ,
// // //     scaleX, scaleY,
// // //     debug,
// // //     roughness,
// // //     metalness,
// // //     opacity,
// // //     enableDecal
// // //   } = useControls({
// // //     "Hoodie Options": folder({
// // //       meshName: {
// // //         options: meshNames.length > 0 ? meshNames : ["Main003"],
// // //         value: "Main003",
// // //         onChange: (value) => {
// // //           scene?.traverse((child) => {
// // //             if (child.isMesh && child.name === value) {
// // //               setSelectedMesh(child);
// // //               console.log("Selected new mesh for decal:", value);
// // //             }
// // //           });
// // //         }
// // //       },
// // //       roughness: { value: 0.7, min: 0, max: 1, step: 0.01 },
// // //       metalness: { value: 0.1, min: 0, max: 1, step: 0.01 },
// // //       opacity: { value: 1, min: 0, max: 1, step: 0.01 },
// // //       textureScale: { value: 1.0, min: 0.1, max: 2, step: 0.1 },
// // //       enableDecal: { value: true, label: "Show Logo" }
// // //     }),
// // //     "Logo Position": folder({
// // //       posX: { value: 0.00, min: -2, max: 2, step: 0.01 }, // Matching first image
// // //       posY: { value: 0.17, min: -2, max: 2, step: 0.01 }, // Matching first image
// // //       posZ: { value: 0.10, min: -1, max: 1, step: 0.01 }, // From reference
// // //       rotX: { value: 0.04, min: 0, max: Math.PI * 2, step: 0.01 }, // From reference
// // //       rotY: { value: 0.01, min: 0, max: Math.PI * 2, step: 0.01 }, // From reference
// // //       rotZ: { value: 0.00, min: 0, max: Math.PI * 2, step: 0.01 }, // From reference
// // //       scaleX: { value: 0.10, min: 0.1, max: 2, step: 0.01 }, // From reference
// // //       scaleY: { value: 0.17, min: 0.1, max: 2, step: 0.01 }, // From reference
// // //       debug: { value: false }, // Set to false by default for production
// // //     }),
// // //   });
// // //   // Handle model scaling
// // //   useEffect(() => {
// // //     if (modelRef.current) {
// // //       modelRef.current.scale.set(scale, scale, scale);
// // //     }
// // //   }, [scale]);
// // //   // Debug decal positioning
// // //   useEffect(() => {
// // //     if (decalRef.current && debug) {
// // //       console.log("Decal position:", [posX, posY, posZ]);
// // //       console.log("Decal rotation:", [rotX, rotY, rotZ]);
// // //       console.log("Decal scale:", [scaleX, scaleY, 1]);
// // //     }
// // //   }, [posX, posY, posZ, rotX, rotY, rotZ, scaleX, scaleY, debug]);
// // //   if (!nodes || !materials) {
// // //     console.error("GLTF model failed to load properly");
// // //     return (
// // //       <mesh>
// // //         <boxGeometry args={[1, 1, 1]} />
// // //         <meshBasicMaterial color="red" />
// // //       </mesh>
// // //     );
// // //   }
// // //   return (
// // //     <group ref={modelRef} position={position} dispose={null}>
// // //       {/* Render all the meshes from the model */}
// // //       {Object.entries(nodes).map(([name, node]) => {
// // //         if (node.isMesh) {
// // //           return (
// // //             <mesh
// // //               key={name}
// // //               name={name}
// // //               castShadow
// // //               receiveShadow
// // //               geometry={node.geometry}
// // //               material={materials[node.material?.name] || materials.Configurator_01}
// // //             />
// // //           );
// // //         }
// // //         return null;
// // //       })}
// // //       {/* Apply decal to the selected mesh */}
// // //       {selectedMesh && enableDecal && logoTexture && (
// // //         <mesh geometry={selectedMesh.geometry}>
// // //           <Decal
// // //             ref={decalRef}
// // //             debug={debug}
// // //             position={[posX, posY, posZ]}
// // //             rotation={[rotX, rotY, rotZ]}
// // //             scale={[scaleX, scaleY, 1]}
// // //             map={logoTexture}
// // //             polygonOffset
// // //             polygonOffsetFactor={-10} // Avoid z-fighting
// // //             transparent
// // //           >
// // //             <meshStandardMaterial
// // //               map={logoTexture}
// // //               transparent
// // //               opacity={opacity}
// // //               depthTest={true}
// // //               depthWrite={false}
// // //               polygonOffset
// // //               polygonOffsetFactor={-10}
// // //               roughness={roughness}
// // //               metalness={metalness}
// // //               side={THREE.FrontSide}
// // //               toneMapped={false} // Preserve logo colors
// // //               emissive="#FFFFFF" // Slight glow to make logo pop
// // //               emissiveIntensity={0.1} // Subtle emission
// // //             />
// // //           </Decal>
// // //         </mesh>
// // //       )}
// // //       {/* Debug helpers */}
// // //       {debug && (
// // //         <>
// // //           <mesh position={[posX, posY, posZ]} scale={0.05}>
// // //             <sphereGeometry args={[1, 16, 16]} />
// // //             <meshBasicMaterial color="red" wireframe={false} />
// // //           </mesh>
// // //           <axesHelper args={[1]} position={[0, 0, 0]} />
// // //         </>
// // //       )}
// // //     </group>
// // //   );
// // // }
// // // useGLTF.preload("/newbama1.glb");




// // import { useRef, useEffect, useState } from "react";
// // import { useGLTF, Decal } from "@react-three/drei";
// // import * as THREE from "three";
// // import { useControls, folder, button } from "leva";

// // export function Hoodie({ position, scale = 1, decalProps = {} }) {
// //   const { nodes, materials, scene } = useGLTF("/newbama1.glb");
// //   const [defaultLogoTexture, setDefaultLogoTexture] = useState(null);
// //   const [customLogo, setCustomLogo] = useState(null);
// //   const [selectedMesh, setSelectedMesh] = useState(null);
// //   const [currentMeshName, setCurrentMeshName] = useState("Main003");
// //   const modelRef = useRef();
// //   const decalRef = useRef();
  
// //   // Get all available mesh names for control panel
// //   const [meshNames, setMeshNames] = useState([]);
  
// //   // Load default logo texture
// //   useEffect(() => {
// //     const textureLoader = new THREE.TextureLoader();
// //     textureLoader.load(
// //       "/Diagonal.png", // Default logo path
// //       (texture) => {
// //         // Apply correct texture settings for crisp logo rendering
// //         texture.flipY = false;
// //         texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
// //         texture.minFilter = THREE.LinearFilter;
// //         texture.magFilter = THREE.LinearFilter;
// //         texture.anisotropy = 16; // Improve texture quality
// //         texture.needsUpdate = true;
// //         setDefaultLogoTexture(texture);
// //         console.log("Default logo texture loaded successfully", texture.image.width, texture.image.height);
// //       },
// //       undefined,
// //       (error) => {
// //         console.error("Failed to load default logo texture:", error);
// //       }
// //     );
// //   }, []);
  
// //   // Handle custom logo from props
// //   useEffect(() => {
// //     if (decalProps.logoTexture) {
// //       const texture = decalProps.logoTexture;
// //       texture.flipY = false;
// //       texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
// //       texture.minFilter = THREE.LinearFilter;
// //       texture.magFilter = THREE.LinearFilter;
// //       texture.anisotropy = 16; // Improve texture quality
// //       texture.needsUpdate = true;
// //       setCustomLogo(texture);
// //       console.log("Custom logo texture applied");
// //     }
// //   }, [decalProps.logoTexture]);
  
// //   // Collect all mesh names and initialize selected mesh
// //   useEffect(() => {
// //     if (!scene) return;
    
// //     const names = [];
// //     scene.traverse((child) => {
// //       if (child.isMesh) {
// //         names.push(child.name);
// //         // If this is our default mesh, select it
// //         if (child.name === currentMeshName) {
// //           setSelectedMesh(child);
// //           console.log(`Found ${currentMeshName} mesh for decal`, child);
// //         }
// //       }
// //     });
    
// //     setMeshNames(names);
// //     console.log("Available meshes:", names);
    
// //     // Center the model
// //     const box = new THREE.Box3().setFromObject(scene);
// //     const center = box.getCenter(new THREE.Vector3());
// //     scene.position.set(-center.x, -center.y, -center.z);
// //     console.log("Centered model at:", center);
// //   }, [scene, currentMeshName]);
  
// //   // Prepare the logo texture to use
// //   const logoTexture = customLogo || defaultLogoTexture;
  
// //   // Create controls with the available mesh names
// //   const [controlValues, setControlValues] = useControls(() => ({
// //     "Hoodie Options": folder({
// //       meshName: {
// //         options: meshNames.length > 0 ? meshNames.reduce((acc, name) => {
// //           acc[name] = name;
// //           return acc;
// //         }, {}) : { "Main003": "Main003" },
// //         value: currentMeshName,
// //         onChange: (value) => {
// //           setCurrentMeshName(value);
// //           scene?.traverse((child) => {
// //             if (child.isMesh && child.name === value) {
// //               setSelectedMesh(child);
// //               console.log("Selected new mesh for decal:", value);
// //             }
// //           });
// //         }
// //       },
// //       refreshMeshes: button(() => {
// //         const names = [];
// //         scene?.traverse((child) => {
// //           if (child.isMesh) {
// //             names.push(child.name);
// //           }
// //         });
// //         setMeshNames(names);
// //         console.log("Refreshed mesh list:", names);
// //       }),
// //       roughness: { value: 0.7, min: 0, max: 1, step: 0.01 },
// //       metalness: { value: 0.1, min: 0, max: 1, step: 0.01 },
// //       opacity: { value: 1, min: 0, max: 1, step: 0.01 },
// //       textureScale: { value: 1.0, min: 0.1, max: 2, step: 0.1 },
// //       enableDecal: { value: true, label: "Show Logo" }
// //     }),
// //     "Logo Position": folder({
// //       posX: { value: 0.00, min: -2, max: 2, step: 0.01 },
// //       posY: { value: 0.17, min: -2, max: 2, step: 0.01 },
// //       posZ: { value: 0.10, min: -1, max: 1, step: 0.01 },
// //       rotX: { value: 0.04, min: 0, max: Math.PI * 2, step: 0.01 },
// //       rotY: { value: 0.01, min: 0, max: Math.PI * 2, step: 0.01 },
// //       rotZ: { value: 0.00, min: 0, max: Math.PI * 2, step: 0.01 },
// //       scaleX: { value: 0.10, min: 0.1, max: 2, step: 0.01 },
// //       scaleY: { value: 0.17, min: 0.1, max: 2, step: 0.01 },
// //       debug: { value: false }, // Set to false by default for production
// //     }),
// //   }), [meshNames]);
  
// //   // Extract control values
// //   const {
// //     roughness,
// //     metalness,
// //     opacity,
// //     enableDecal,
// //     posX, posY, posZ,
// //     rotX, rotY, rotZ,
// //     scaleX, scaleY,
// //     debug
// //   } = controlValues;
  
// //   // Handle model scaling
// //   useEffect(() => {
// //     if (modelRef.current) {
// //       modelRef.current.scale.set(scale, scale, scale);
// //     }
// //   }, [scale]);
  
// //   // Debug decal positioning
// //   useEffect(() => {
// //     if (decalRef.current && debug) {
// //       console.log("Decal position:", [posX, posY, posZ]);
// //       console.log("Decal rotation:", [rotX, rotY, rotZ]);
// //       console.log("Decal scale:", [scaleX, scaleY, 1]);
// //     }
// //   }, [posX, posY, posZ, rotX, rotY, rotZ, scaleX, scaleY, debug]);
  
// //   if (!nodes || !materials) {
// //     console.error("GLTF model failed to load properly");
// //     return (
// //       <mesh>
// //         <boxGeometry args={[1, 1, 1]} />
// //         <meshBasicMaterial color="red" />
// //       </mesh>
// //     );
// //   }
  
// //   return (
// //     <group ref={modelRef} position={position} dispose={null}>
// //       {/* Render all the meshes from the model */}
// //       {Object.entries(nodes).map(([name, node]) => {
// //         if (node.isMesh) {
// //           return (
// //             <mesh
// //               key={name}
// //               name={name}
// //               castShadow
// //               receiveShadow
// //               geometry={node.geometry}
// //               material={materials[node.material?.name] || materials.Configurator_01}
// //             />
// //           );
// //         }
// //         return null;
// //       })}
      
// //       {/* Apply decal to the selected mesh */}
// //       {selectedMesh && enableDecal && logoTexture && (
// //         <mesh geometry={selectedMesh.geometry}>
// //           <Decal
// //             ref={decalRef}
// //             debug={debug}
// //             position={[posX, posY, posZ]}
// //             rotation={[rotX, rotY, rotZ]}
// //             scale={[scaleX, scaleY, 1]}
// //             map={logoTexture}
// //             polygonOffset
// //             polygonOffsetFactor={-10} // Avoid z-fighting
// //             transparent
// //           >
// //             <meshStandardMaterial
// //               map={logoTexture}
// //               transparent
// //               opacity={opacity}
// //               depthTest={true}
// //               depthWrite={false}
// //               polygonOffset
// //               polygonOffsetFactor={-10}
// //               roughness={roughness}
// //               metalness={metalness}
// //               side={THREE.FrontSide}
// //               toneMapped={false} // Preserve logo colors
// //               emissive="#FFFFFF" // Slight glow to make logo pop
// //               emissiveIntensity={0.1} // Subtle emission
// //             />
// //           </Decal>
// //         </mesh>
// //       )}
      
// //       {/* Debug helpers */}
// //       {debug && (
// //         <>
// //           <mesh position={[posX, posY, posZ]} scale={0.05}>
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


// // import { useRef, useEffect, useState } from "react";
// // import { useGLTF, Decal } from "@react-three/drei";
// // import * as THREE from "three";
// // import { useControls, folder, button } from "leva";

// // export function Hoodie({ position, scale = 1, decalProps = {} }) {
// //   const { nodes, materials, scene } = useGLTF("/newbama1.glb");
// //   const [defaultLogoTexture, setDefaultLogoTexture] = useState(null);
// //   const [customLogo, setCustomLogo] = useState(null);
// //   const [selectedMesh, setSelectedMesh] = useState(null);
// //   const [currentMeshName, setCurrentMeshName] = useState("Main003");
// //   const modelRef = useRef();
// //   const decalRef = useRef();
  
// //   // Get all available mesh names for control panel
// //   const [meshNames, setMeshNames] = useState([]);
  
// //   // Load default logo texture
// //   useEffect(() => {
// //     const textureLoader = new THREE.TextureLoader();
// //     textureLoader.load(
// //       "/Diagonal.png", // Default logo path
// //       (texture) => {
// //         // Apply correct texture settings for crisp logo rendering
// //         texture.flipY = false;
// //         texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
// //         texture.minFilter = THREE.LinearFilter;
// //         texture.magFilter = THREE.LinearFilter;
// //         texture.anisotropy = 16; // Improve texture quality
// //         texture.needsUpdate = true;
// //         setDefaultLogoTexture(texture);
// //         console.log("Default logo texture loaded successfully", texture.image.width, texture.image.height);
// //       },
// //       undefined,
// //       (error) => {
// //         console.error("Failed to load default logo texture:", error);
// //       }
// //     );
// //   }, []);
  
// //   // Handle custom logo from props
// //   useEffect(() => {
// //     if (decalProps.logoTexture) {
// //       const texture = decalProps.logoTexture;
// //       texture.flipY = false;
// //       texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
// //       texture.minFilter = THREE.LinearFilter;
// //       texture.magFilter = THREE.LinearFilter;
// //       texture.anisotropy = 16; // Improve texture quality
// //       texture.needsUpdate = true;
// //       setCustomLogo(texture);
// //       console.log("Custom logo texture applied");
// //     }
// //   }, [decalProps.logoTexture]);
  
// //   // Collect all mesh names when scene loads
// //   useEffect(() => {
// //     if (!scene) return;
    
// //     const names = [];
// //     scene.traverse((child) => {
// //       if (child.isMesh) {
// //         names.push(child.name);
// //       }
// //     });
    
// //     setMeshNames(names);
// //     console.log("Available meshes:", names);
    
// //     // Center the model
// //     const box = new THREE.Box3().setFromObject(scene);
// //     const center = box.getCenter(new THREE.Vector3());
// //     scene.position.set(-center.x, -center.y, -center.z);
// //     console.log("Centered model at:", center);
// //   }, [scene]);
  
// //   // Update selected mesh whenever currentMeshName changes
// //   useEffect(() => {
// //     if (!scene) return;
    
// //     let found = false;
// //     scene.traverse((child) => {
// //       if (child.isMesh && child.name === currentMeshName) {
// //         setSelectedMesh(child);
// //         found = true;
// //         console.log(`Selected mesh changed to: ${currentMeshName}`, child);
// //       }
// //     });
    
// //     if (!found) {
// //       console.warn(`Mesh named "${currentMeshName}" not found in the model`);
// //     }
// //   }, [scene, currentMeshName]);
  
// //   // Prepare the logo texture to use
// //   const logoTexture = customLogo || defaultLogoTexture;
  
// //   // Create controls with the available mesh names
// //   const [controlValues, setControlValues] = useControls(() => ({
// //     "Hoodie Options": folder({
// //       meshName: {
// //         options: meshNames.length > 0 ? meshNames.reduce((acc, name) => {
// //           acc[name] = name;
// //           return acc;
// //         }, {}) : { "Main003": "Main003" },
// //         value: currentMeshName,
// //         onChange: (value) => {
// //           console.log("Mesh selection changed to:", value);
// //           setCurrentMeshName(value);
// //         }
// //       },
// //       refreshMeshes: button(() => {
// //         const names = [];
// //         scene?.traverse((child) => {
// //           if (child.isMesh) {
// //             names.push(child.name);
// //           }
// //         });
// //         setMeshNames(names);
// //         console.log("Refreshed mesh list:", names);
// //       }),
// //       roughness: { value: 0.7, min: 0, max: 1, step: 0.01 },
// //       metalness: { value: 0.1, min: 0, max: 1, step: 0.01 },
// //       opacity: { value: 1, min: 0, max: 1, step: 0.01 },
// //       textureScale: { value: 1.0, min: 0.1, max: 2, step: 0.1 },
// //       enableDecal: { value: true, label: "Show Logo" }
// //     }),
// //     "Logo Position": folder({
// //       posX: { value: 0.00, min: -2, max: 2, step: 0.01 },
// //       posY: { value: 0.17, min: -2, max: 2, step: 0.01 },
// //       posZ: { value: 0.10, min: -1, max: 1, step: 0.01 },
// //       rotX: { value: 0.04, min: 0, max: Math.PI * 2, step: 0.01 },
// //       rotY: { value: 0.01, min: 0, max: Math.PI * 2, step: 0.01 },
// //       rotZ: { value: 0.00, min: 0, max: Math.PI * 2, step: 0.01 },
// //       scaleX: { value: 0.10, min: 0.1, max: 2, step: 0.01 },
// //       scaleY: { value: 0.17, min: 0.1, max: 2, step: 0.01 },
// //       debug: { value: false }, // Set to false by default for production
// //     }),
// //   }), [meshNames]);
  
// //   // Extract control values
// //   const {
// //     roughness,
// //     metalness,
// //     opacity,
// //     enableDecal,
// //     posX, posY, posZ,
// //     rotX, rotY, rotZ,
// //     scaleX, scaleY,
// //     debug
// //   } = controlValues;
  
// //   // Handle model scaling
// //   useEffect(() => {
// //     if (modelRef.current) {
// //       modelRef.current.scale.set(scale, scale, scale);
// //     }
// //   }, [scale]);
  
// //   // Debug decal positioning
// //   useEffect(() => {
// //     if (decalRef.current && debug) {
// //       console.log("Decal position:", [posX, posY, posZ]);
// //       console.log("Decal rotation:", [rotX, rotY, rotZ]);
// //       console.log("Decal scale:", [scaleX, scaleY, 1]);
// //       console.log("Current selected mesh:", selectedMesh?.name);
// //     }
// //   }, [posX, posY, posZ, rotX, rotY, rotZ, scaleX, scaleY, debug, selectedMesh]);
  
// //   if (!nodes || !materials) {
// //     console.error("GLTF model failed to load properly");
// //     return (
// //       <mesh>
// //         <boxGeometry args={[1, 1, 1]} />
// //         <meshBasicMaterial color="red" />
// //       </mesh>
// //     );
// //   }
  
// //   return (
// //     <group ref={modelRef} position={position} dispose={null}>
// //       {/* Render all the meshes from the model */}
// //       {Object.entries(nodes).map(([name, node]) => {
// //         if (node.isMesh) {
// //           return (
// //             <mesh
// //               key={name}
// //               name={name}
// //               castShadow
// //               receiveShadow
// //               geometry={node.geometry}
// //               material={node.material ? 
// //                 new THREE.MeshStandardMaterial().copy(materials[node.material.name] || materials.Configurator_01) : 
// //                 materials.Configurator_01}
// //             />
// //           );
// //         }
// //         return null;
// //       })}
      
// //       {/* Apply decal only to the selected mesh */}
// //       {selectedMesh && enableDecal && logoTexture && (
// //         <mesh 
// //           key={`decal-${currentMeshName}`} // Force re-render when mesh changes
// //           geometry={selectedMesh.geometry}
// //         >
// //           <Decal
// //             ref={decalRef}
// //             debug={debug}
// //             position={[posX, posY, posZ]}
// //             rotation={[rotX, rotY, rotZ]}
// //             scale={[scaleX, scaleY, 1]}
// //             map={logoTexture}
// //             polygonOffset
// //             polygonOffsetFactor={-10} // Avoid z-fighting
// //             transparent
// //           >
// //             <meshStandardMaterial
// //               map={logoTexture}
// //               transparent
// //               opacity={opacity}
// //               depthTest={true}
// //               depthWrite={false}
// //               polygonOffset
// //               polygonOffsetFactor={-10}
// //               roughness={roughness}
// //               metalness={metalness}
// //               side={THREE.FrontSide}
// //               toneMapped={false} // Preserve logo colors
// //               emissive="#FFFFFF" // Slight glow to make logo pop
// //               emissiveIntensity={0.1} // Subtle emission
// //             />
// //           </Decal>
// //         </mesh>
// //       )}
      
// //       {/* Debug helpers */}
// //       {debug && (
// //         <>
// //           <mesh position={[posX, posY, posZ]} scale={0.05}>
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


// import { useRef, useEffect, useState } from "react";
// import { useGLTF, Decal } from "@react-three/drei";
// import * as THREE from "three";
// import { useControls, folder, button } from "leva";

// export function Hoodie({ position, scale = 1, decalProps = {} }) {
//   const { nodes, materials, scene } = useGLTF("/newbama1.glb");
//   const [defaultLogoTexture, setDefaultLogoTexture] = useState(null);
//   const [customLogo, setCustomLogo] = useState(null);
//   const [selectedMesh, setSelectedMesh] = useState(null);
//   const [currentMeshName, setCurrentMeshName] = useState("Main003");
//   const modelRef = useRef();
//   const decalRef = useRef();
  
//   // Get all available mesh names for control panel
//   const [meshNames, setMeshNames] = useState([]);
  
//   // Store decal settings per mesh
//   const [meshSettings, setMeshSettings] = useState({
//     "Main003": {
//       position: [0.00, 0.17, 0.10],
//       rotation: [0.04, 0.01, 0.00],
//       scale: [0.10, 0.17, 1],
//     }
//     // Other mesh settings will be added dynamically
//   });
  
//   // Load default logo texture
//   useEffect(() => {
//     const textureLoader = new THREE.TextureLoader();
//     textureLoader.load(
//       "/Diagonal.png", // Default logo path
//       (texture) => {
//         texture.flipY = false;
//         texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
//         texture.minFilter = THREE.LinearFilter;
//         texture.magFilter = THREE.LinearFilter;
//         texture.anisotropy = 16;
//         texture.needsUpdate = true;
//         setDefaultLogoTexture(texture);
//         console.log("Default logo texture loaded successfully");
//       },
//       undefined,
//       (error) => {
//         console.error("Failed to load default logo texture:", error);
//       }
//     );
//   }, []);
  
//   // Handle custom logo from props
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
//       console.log("Custom logo texture applied");
//     }
//   }, [decalProps.logoTexture]);
  
//   // Collect all mesh names when scene loads
//   useEffect(() => {
//     if (!scene) return;
    
//     const names = [];
//     scene.traverse((child) => {
//       if (child.isMesh) {
//         names.push(child.name);
        
//         // Initialize settings for each mesh if not already set
//         if (!meshSettings[child.name]) {
//           setMeshSettings(prev => ({
//             ...prev,
//             [child.name]: {
//               position: [0.00, 0.00, 0.00], // Default neutral position
//               rotation: [0.00, 0.00, 0.00],
//               scale: [0.10, 0.10, 1],
//             }
//           }));
//         }
//       }
//     });
    
//     setMeshNames(names);
//     console.log("Available meshes:", names);
    
//     // Center the model
//     const box = new THREE.Box3().setFromObject(scene);
//     const center = box.getCenter(new THREE.Vector3());
//     scene.position.set(-center.x, -center.y, -center.z);
//   }, [scene]);
  
//   // Update selected mesh whenever currentMeshName changes
//   useEffect(() => {
//     if (!scene) return;
    
//     let found = false;
//     scene.traverse((child) => {
//       if (child.isMesh && child.name === currentMeshName) {
//         setSelectedMesh(child);
//         found = true;
//         console.log(`Selected mesh changed to: ${currentMeshName}`, child);
//       }
//     });
    
//     if (!found) {
//       console.warn(`Mesh named "${currentMeshName}" not found in the model`);
//     }
//   }, [scene, currentMeshName]);
  
//   // Get current mesh settings
//   const currentSettings = meshSettings[currentMeshName] || {
//     position: [0, 0, 0],
//     rotation: [0, 0, 0],
//     scale: [0.1, 0.1, 1]
//   };
  
//   // Prepare the logo texture to use
//   const logoTexture = customLogo || defaultLogoTexture;
  
//   // Create controls with the available mesh names
//   const [controlValues, setControlValues] = useControls(() => ({
//     "Hoodie Options": folder({
//       meshName: {
//         options: meshNames.length > 0 ? meshNames.reduce((acc, name) => {
//           acc[name] = name;
//           return acc;
//         }, {}) : { "Main003": "Main003" },
//         value: currentMeshName,
//         onChange: (value) => {
//           console.log("Mesh selection changed to:", value);
//           setCurrentMeshName(value);
//         }
//       },
//       refreshMeshes: button(() => {
//         const names = [];
//         scene?.traverse((child) => {
//           if (child.isMesh) {
//             names.push(child.name);
//           }
//         });
//         setMeshNames(names);
//         console.log("Refreshed mesh list:", names);
//       }),
//       roughness: { value: 0.7, min: 0, max: 1, step: 0.01 },
//       metalness: { value: 0.1, min: 0, max: 1, step: 0.01 },
//       opacity: { value: 1, min: 0, max: 1, step: 0.01 },
//       enableDecal: { value: true, label: "Show Logo" }
//     }),
//     "Logo Position": folder({
//       posX: { 
//         value: currentSettings.position[0], 
//         min: -2, max: 2, step: 0.01,
//         onChange: (v) => updateMeshSetting('position', 0, v)
//       },
//       posY: { 
//         value: currentSettings.position[1], 
//         min: -2, max: 2, step: 0.01,
//         onChange: (v) => updateMeshSetting('position', 1, v) 
//       },
//       posZ: { 
//         value: currentSettings.position[2], 
//         min: -1, max: 1, step: 0.01,
//         onChange: (v) => updateMeshSetting('position', 2, v)
//       },
//       rotX: { 
//         value: currentSettings.rotation[0], 
//         min: 0, max: Math.PI * 2, step: 0.01,
//         onChange: (v) => updateMeshSetting('rotation', 0, v)
//       },
//       rotY: { 
//         value: currentSettings.rotation[1], 
//         min: 0, max: Math.PI * 2, step: 0.01,
//         onChange: (v) => updateMeshSetting('rotation', 1, v)
//       },
//       rotZ: { 
//         value: currentSettings.rotation[2], 
//         min: 0, max: Math.PI * 2, step: 0.01,
//         onChange: (v) => updateMeshSetting('rotation', 2, v)
//       },
//       scaleX: { 
//         value: currentSettings.scale[0], 
//         min: 0.1, max: 2, step: 0.01,
//         onChange: (v) => updateMeshSetting('scale', 0, v)
//       },
//       scaleY: { 
//         value: currentSettings.scale[1], 
//         min: 0.1, max: 2, step: 0.01,
//         onChange: (v) => updateMeshSetting('scale', 1, v)
//       },
//       resetPosition: button(() => {
//         // Reset position for current mesh
//         setMeshSettings(prev => ({
//           ...prev,
//           [currentMeshName]: {
//             position: [0.00, 0.00, 0.00],
//             rotation: [0.00, 0.00, 0.00],
//             scale: [0.10, 0.10, 1],
//           }
//         }));
//       }),
//       debug: { value: false },
//     }),
//   }), [meshNames, currentMeshName, currentSettings]);
  
//   // Function to update mesh-specific settings
//   function updateMeshSetting(property, index, value) {
//     setMeshSettings(prev => {
//       const newSettings = { ...prev };
//       if (!newSettings[currentMeshName]) {
//         newSettings[currentMeshName] = {
//           position: [0, 0, 0],
//           rotation: [0, 0, 0],
//           scale: [0.1, 0.1, 1]
//         };
//       }
      
//       const settingsCopy = { ...newSettings[currentMeshName] };
//       settingsCopy[property] = [...settingsCopy[property]];
//       settingsCopy[property][index] = value;
      
//       newSettings[currentMeshName] = settingsCopy;
//       return newSettings;
//     });
//   }
  
//   // Extract control values
//   const {
//     roughness,
//     metalness,
//     opacity,
//     enableDecal,
//     debug
//   } = controlValues;
  
//   // Handle model scaling
//   useEffect(() => {
//     if (modelRef.current) {
//       modelRef.current.scale.set(scale, scale, scale);
//     }
//   }, [scale]);
  
//   if (!nodes || !materials) {
//     console.error("GLTF model failed to load properly");
//     return (
//       <mesh>
//         <boxGeometry args={[1, 1, 1]} />
//         <meshBasicMaterial color="red" />
//       </mesh>
//     );
//   }
  
//   return (
//     <group ref={modelRef} position={position} dispose={null}>
//       {/* Render all the meshes from the model */}
//       {Object.entries(nodes).map(([name, node]) => {
//         if (node.isMesh) {
//           return (
//             <mesh
//               key={name}
//               name={name}
//               castShadow
//               receiveShadow
//               geometry={node.geometry}
//               material={node.material ? 
//                 new THREE.MeshStandardMaterial().copy(materials[node.material.name] || materials.Configurator_01) : 
//                 materials.Configurator_01}
//             />
//           );
//         }
//         return null;
//       })}
      
//       {/* Apply decal only to the selected mesh with mesh-specific settings */}
//       {selectedMesh && enableDecal && logoTexture && (
//         <mesh 
//           key={`decal-${currentMeshName}`} // Force re-render when mesh changes
//           geometry={selectedMesh.geometry}
//         >
//           <Decal
//             ref={decalRef}
//             debug={debug}
//             position={currentSettings.position}
//             rotation={currentSettings.rotation}
//             scale={currentSettings.scale}
//             map={logoTexture}
//             polygonOffset
//             polygonOffsetFactor={-10} // Avoid z-fighting
//             transparent
//           >
//             <meshStandardMaterial
//               map={logoTexture}
//               transparent
//               opacity={opacity}
//               depthTest={true}
//               depthWrite={false}
//               polygonOffset
//               polygonOffsetFactor={-10}
//               roughness={roughness}
//               metalness={metalness}
//               side={THREE.FrontSide}
//               toneMapped={false} // Preserve logo colors
//               emissive="#FFFFFF" // Slight glow to make logo pop
//               emissiveIntensity={0.1} // Subtle emission
//             />
//           </Decal>
//         </mesh>
//       )}
      
//       {/* Debug helpers */}
//       {debug && (
//         <>
//           <mesh position={currentSettings.position} scale={0.05}>
//             <sphereGeometry args={[1, 16, 16]} />
//             <meshBasicMaterial color="red" wireframe={false} />
//           </mesh>
//           <axesHelper args={[1]} position={[0, 0, 0]} />
//         </>
//       )}
//     </group>
//   );
// }

// useGLTF.preload("/newbama1.glb");


import { useRef, useEffect, useState,useMemo } from "react";
import { useGLTF, Decal } from "@react-three/drei";
import * as THREE from "three";
import { useControls, folder, button } from "leva";

// export function Hoodie({ position, scale = 1, decalProps = {} }) {
//   const { nodes, materials, scene } = useGLTF("/newbama1.glb");
//   const [defaultLogoTexture, setDefaultLogoTexture] = useState(null);
//   const [customLogo, setCustomLogo] = useState(null);
//   const [selectedMesh, setSelectedMesh] = useState(null);
//   const [currentMeshName, setCurrentMeshName] = useState("Main003");
//   const modelRef = useRef();
//   const decalRef = useRef();
  
//   // Define allowed mesh names
//   const allowedMeshNames = ["Main003", "Main004", "Arms002"];
  
//   // Store decal settings per mesh
//   const [meshSettings, setMeshSettings] = useState({
//     "Main003": {
//       position: [0.00, 0.17, 0.10],
//       rotation: [0.04, 0.01, 0.00],
//       scale: [0.10, 0.17, 1],
//     },
//     "Main004": {
//       position: [0.00, 0.17, 0.10],
//       rotation: [0.04, 0.01, 0.00],
//       scale: [0.10, 0.17, 1],
//     },
//     "Arms002": {
//       position: [0.00, 0.17, 0.10],
//       rotation: [0.04, 0.01, 0.00],
//       scale: [0.10, 0.17, 1],
//     }
//   });
  
//   // Load default logo texture
//   useEffect(() => {
//     const textureLoader = new THREE.TextureLoader();
//     textureLoader.load(
//       "/Diagonal.png",
//       (texture) => {
//         texture.flipY = false;
//         texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
//         texture.minFilter = THREE.LinearFilter;
//         texture.magFilter = THREE.LinearFilter;
//         texture.anisotropy = 16;
//         texture.needsUpdate = true;
//         setDefaultLogoTexture(texture);
//       },
//       undefined,
//       (error) => {
//         console.error("Failed to load default logo texture:", error);
//       }
//     );
//   }, []);
  
//   // Handle custom logo from props
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
//   useEffect(() => {
//     if (!scene) return;
//     scene.traverse((child) => {
//       if (child.isMesh) {
//         console.log(`Found mesh: ${child.name}`);
//       }
//     });
//   }, [scene]);
//   // Update selected mesh whenever currentMeshName changes
//   useEffect(() => {
//     if (!scene) return;
    
//     scene.traverse((child) => {
//       if (child.isMesh && child.name === currentMeshName) {
        
//         console.log(`Selected mesh: ${child.name} for currentMeshName: ${currentMeshName}`);
//         setSelectedMesh(child);
//       }
//     });
//   }, [scene, currentMeshName]);
  
//   // Get current mesh settings
//   const currentSettings = meshSettings[currentMeshName] || {
//     position: [0, 0, 0],
//     rotation: [0, 0, 0],
//     scale: [0.1, 0.1, 1]
//   };
  
//   const logoTexture = customLogo || defaultLogoTexture;
  
//   // Create controls with only specified mesh names
//   const [controlValues, setControlValues] = useControls(() => ({
//     "Hoodie Options": folder({
//       meshName: {
//         options: {
//           "Main003": "Main003",
//           "Main004": "Main004",
//           "Arms002": "Arms002"
//         },
//         value: currentMeshName,
//         onChange: (value) => {
//           console.log(`Mesh name changed to: ${value}`);
//           setCurrentMeshName(value);
//         }
//       },
//       roughness: { value: 0.7, min: 0, max: 1, step: 0.01 },
//       metalness: { value: 0.1, min: 0, max: 1, step: 0.01 },
//       opacity: { value: 1, min: 0, max: 1, step: 0.01 },
//       enableDecal: { value: true, label: "Show Logo" }
//     }),
//     "Logo Position": folder({
//       posX: { 
//         value: currentSettings.position[0], 
//         min: -2, max: 2, step: 0.01,
//         onChange: (v) => updateMeshSetting('position', 0, v)
//       },
//       posY: { 
//         value: currentSettings.position[1], 
//         min: -2, max: 2, step: 0.01,
//         onChange: (v) => updateMeshSetting('position', 1, v) 
//       },
//       posZ: { 
//         value: currentSettings.position[2], 
//         min: -1, max: 1, step: 0.01,
//         onChange: (v) => updateMeshSetting('position', 2, v)
//       },
//       rotX: { 
//         value: currentSettings.rotation[0], 
//         min: 0, max: Math.PI * 2, step: 0.01,
//         onChange: (v) => updateMeshSetting('rotation', 0, v)
//       },
//       rotY: { 
//         value: currentSettings.rotation[1], 
//         min: 0, max: Math.PI * 2, step: 0.01,
//         onChange: (v) => updateMeshSetting('rotation', 1, v)
//       },
//       rotZ: { 
//         value: currentSettings.rotation[2], 
//         min: 0, max: Math.PI * 2, step: 0.01,
//         onChange: (v) => updateMeshSetting('rotation', 2, v)
//       },
//       scaleX: { 
//         value: currentSettings.scale[0], 
//         min: 0.1, max: 2, step: 0.01,
//         onChange: (v) => updateMeshSetting('scale', 0, v)
//       },
//       scaleY: { 
//         value: currentSettings.scale[1], 
//         min: 0.1, max: 2, step: 0.01,
//         onChange: (v) => updateMeshSetting('scale', 1, v)
//       },
//       resetPosition: button(() => {
//         setMeshSettings(prev => ({
//           ...prev,
//           [currentMeshName]: {
//             position: [0.00, 0.00, 0.00],
//             rotation: [0.00, 0.00, 0.00],
//             scale: [0.10, 0.10, 1],
//           }
//         }));
//       }),
//       debug: { value: false },
//     }),
//   }), [currentMeshName, currentSettings]);
  
//   function updateMeshSetting(property, index, value) {
//     setMeshSettings(prev => {
//       const newSettings = { ...prev };
//       const settingsCopy = { ...newSettings[currentMeshName] };
//       settingsCopy[property] = [...settingsCopy[property]];
//       settingsCopy[property][index] = value;
//       newSettings[currentMeshName] = settingsCopy;
//       return newSettings;
//     });
//   }
  
//   const {
//     roughness,
//     metalness,
//     opacity,
//     enableDecal,
//     debug
//   } = controlValues;
  
//   useEffect(() => {
//     if (modelRef.current) {
//       modelRef.current.scale.set(scale, scale, scale);
//     }
//   }, [scale]);
  
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
//       {Object.entries(nodes).map(([name, node]) => {
//         if (node.isMesh) {
//           return (
//             <mesh
//               key={name}
//               name={name}
//               castShadow
//               receiveShadow
//               geometry={node.geometry}
//               material={node.material ? 
//                 new THREE.MeshStandardMaterial().copy(materials[node.material.name] || materials.Configurator_01) : 
//                 materials.Configurator_01}
//             />
//           );
//         }
//         return null;
//       })}
      
//       {selectedMesh && enableDecal && logoTexture && (
//         <mesh key={`decal-${currentMeshName}-${selectedMesh.name}`} geometry={selectedMesh.geometry}>
//           <Decal
//             ref={decalRef}
//             debug={debug}
//             position={currentSettings.position}
//             rotation={currentSettings.rotation}
//             scale={currentSettings.scale}
//             map={logoTexture}
//             polygonOffset
//             polygonOffsetFactor={-10}
//             transparent
//           >
//             <meshStandardMaterial
//               map={logoTexture}
//               transparent
//               opacity={opacity}
//               depthTest={true}
//               depthWrite={false}
//               polygonOffset
//               polygonOffsetFactor={-10}
//               roughness={roughness}
//               metalness={metalness}
//               side={THREE.FrontSide}
//               toneMapped={false}
//               emissive="#FFFFFF"
//               emissiveIntensity={0.1}
//             />
//           </Decal>
//         </mesh>
//       )}
      
//       {debug && (
//         <>
//           <mesh position={currentSettings.position} scale={0.05}>
//             <sphereGeometry args={[1, 16, 16]} />
//             <meshBasicMaterial color="red" wireframe={false} />
//           </mesh>
//           <axesHelper args={[1]} position={[0, 0, 0]} />
//         </>
//       )}
//     </group>
//   );
// }

// useGLTF.preload("/newbama1.glb");


export function Hoodie({ position, scale = 1, decalProps = {} }) {
  const { nodes, materials, scene } = useGLTF("/newbama1.glb");
  const [defaultLogoTexture, setDefaultLogoTexture] = useState(null);
  const [customLogo, setCustomLogo] = useState(null);
  const [meshSettings, setMeshSettings] = useState({
    "Main003": { position: [0.00, 0.17, 0.10], rotation: [0.04, 0.01, 0.00], scale: [0.10, 0.17, 1] },
    "Main004": { position: [0.00, 0.17, 0.10], rotation: [0.04, 0.01, 0.00], scale: [0.10, 0.17, 1] },
    "Arms002": { position: [0.00, 0.17, 0.10], rotation: [0.04, 0.01, 0.00], scale: [0.10, 0.17, 1] },
  });
  const modelRef = useRef();
  const decalRef = useRef();
  const [currentMeshName, setCurrentMeshName] = useState("Main003");

  // Load default logo texture
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
        texture.needsUpdate = true;
        setDefaultLogoTexture(texture);
      },
      undefined,
      (error) => console.error("Failed to load default logo texture:", error)
    );
  }, []);

  // Handle custom logo
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

  // Compute selected mesh synchronously
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

  const currentSettings = meshSettings[currentMeshName] || {
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [0.1, 0.1, 1],
  };
  const logoTexture = customLogo || defaultLogoTexture;

  const [controlValues, setControlValues] = useControls(() => ({
    "Hoodie Options": folder({
      meshName: {
        options: { "Main003": "Main003", "Main004": "Main004", "Arms002": "Arms002" },
        value: currentMeshName,
        onChange: (value) => setCurrentMeshName(value),
      },
      roughness: { value: 0.7, min: 0, max: 1, step: 0.01 },
      metalness: { value: 0.1, min: 0, max: 1, step: 0.01 },
      opacity: { value: 1, min: 0, max: 1, step: 0.01 },
      enableDecal: { value: true, label: "Show Logo" },
    }),
    "Logo Position": folder({
      posX: { value: currentSettings.position[0], min: -2, max: 2, step: 0.01, onChange: (v) => updateMeshSetting("position", 0, v) },
      posY: { value: currentSettings.position[1], min: -2, max: 2, step: 0.01, onChange: (v) => updateMeshSetting("position", 1, v) },
      posZ: { value: currentSettings.position[2], min: -1, max: 1, step: 0.01, onChange: (v) => updateMeshSetting("position", 2, v) },
      rotX: { value: currentSettings.rotation[0], min: 0, max: Math.PI * 2, step: 0.01, onChange: (v) => updateMeshSetting("rotation", 0, v) },
      rotY: { value: currentSettings.rotation[1], min: 0, max: Math.PI * 2, step: 0.01, onChange: (v) => updateMeshSetting("rotation", 1, v) },
      rotZ: { value: currentSettings.rotation[2], min: 0, max: Math.PI * 2, step: 0.01, onChange: (v) => updateMeshSetting("rotation", 2, v) },
      scaleX: { value: currentSettings.scale[0], min: 0.1, max: 2, step: 0.01, onChange: (v) => updateMeshSetting("scale", 0, v) },
      scaleY: { value: currentSettings.scale[1], min: 0.1, max: 2, step: 0.01, onChange: (v) => updateMeshSetting("scale", 1, v) },
      resetPosition: button(() => {
        setMeshSettings((prev) => ({
          ...prev,
          [currentMeshName]: { position: [0.00, 0.00, 0.00], rotation: [0.00, 0.00, 0.00], scale: [0.10, 0.10, 1] },
        }));
      }),
      debug: { value: false },
    }),
  }), [currentMeshName, currentSettings]);

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

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.scale.set(scale, scale, scale);
    }
  }, [scale]);

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
          return (
            <mesh
              key={name}
              name={name}
              castShadow
              receiveShadow
              geometry={node.geometry}
              material={
                node.material
                  ? new THREE.MeshStandardMaterial().copy(materials[node.material.name] || materials.Configurator_01)
                  : materials.Configurator_01
              }
            />
          );
        }
        return null;
      })}

      {selectedMesh && enableDecal && logoTexture && (
        <mesh key={`decal-${currentMeshName}-${selectedMesh.name}`} geometry={selectedMesh.geometry}>
          <Decal
            ref={decalRef}
            debug={debug}
            position={currentSettings.position}
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
              side={THREE.FrontSide}
              toneMapped={false}
              emissive="#FFFFFF"
              emissiveIntensity={0.1}
            />
          </Decal>
        </mesh>
      )}

      {debug && (
        <>
          <mesh position={currentSettings.position} scale={0.05}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial color="red" wireframe={false} />
          </mesh>
          <axesHelper args={[1]} position={[0, 0, 0]} />
        </>
      )}
    </group>
  );
}

useGLTF.preload("/newbama1.glb");