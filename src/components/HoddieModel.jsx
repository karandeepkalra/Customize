// import { useRef, useEffect, useState } from "react";
// import { useGLTF, Decal } from "@react-three/drei";
// import * as THREE from "three";
// import { useControls, folder } from "leva";

// export function Hoodie({ position, scale = 1, decalProps = {}, onMeshCentersCalculated }) {
//   const { nodes, materials, scene } = useGLTF("/newbama1.glb");
//   const [textures, setTextures] = useState({
//     Main003: null,
//     Main004: null,
//     Arms002: null
//   });
  
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
//         const box = new THREE.Box3().setFromObject(foundMesh);
//         const center = new THREE.Vector3();
//         box.getCenter(center);
        
//         centers[meshName] = [center.x, center.y, center.z + 0.01];
        
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
    
//     // Pass the mesh centers to parent component
//     if (onMeshCentersCalculated) {
//       onMeshCentersCalculated(centers);
//     }
//   }, [scene, onMeshCentersCalculated]);

//   // Load default textures for each mesh
//   useEffect(() => {
//     const textureLoader = new THREE.TextureLoader();
//     const defaultTextures = {
//       Main003: "/logoPrint.jpeg",
//       Main004: "/Decal.webp",
//       Arms002: "/Diagonal.png" 
//     };
    
//     Object.entries(defaultTextures).forEach(([meshName, texturePath]) => {
//       textureLoader.load(
//         texturePath,
//         (texture) => {
//           texture.flipY = false;
//           texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
//           texture.minFilter = THREE.LinearFilter;
//           texture.magFilter = THREE.LinearFilter;
//           texture.anisotropy = 16;
          
//           const aspectRatio = texture.image.width / texture.image.height;
          
//           setMeshSettings(prev => ({
//             ...prev,
//             [meshName]: { 
//               ...prev[meshName], 
//               scale: [0.1 * aspectRatio, 0.1, 1] 
//             },
//           }));
          
//           texture.needsUpdate = true;
          
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

//   // Handle custom uploaded textures from props
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
          
//           const aspectRatio = texture.image ? texture.image.width / texture.image.height : 1;
          
//           setTextures(prev => ({
//             ...prev,
//             [meshName]: texture
//           }));
          
//           setMeshSettings(prev => ({
//             ...prev,
//             [meshName]: { 
//               ...prev[meshName], 
//               scale: [0.1 * aspectRatio, 0.1, 1] 
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

//   // Leva controls
//   const [controlValues] = useControls(() => ({
//     "Hoodie Options": folder({
//       roughness: { value: 0.7, min: 0, max: 1, step: 0.01 },
//       metalness: { value: 0.1, min: 0, max: 1, step: 0.01 },
//       opacity: { value: 1, min: 0, max: 1, step: 0.01 },
//       enableDecal: { value: true, label: "Show Images" },
//       modelScale: { value: modelScale, min: 0.5, max: 2, step: 0.1, onChange: (v) => setModelScale(v) },
//     }),
//   }), [modelScale]);

//   const { roughness, metalness, opacity, enableDecal } = controlValues;

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
//           const isTargetMesh = ["Main003", "Main004", "Arms002"].includes(name);
          
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
//                   ? new THREE.MeshStandardMaterial().copy(
//                       materials[node.material.name] || materials.Configurator_01
//                     )
//                   : materials.Configurator_01
//               }
//             >
//               {enableDecal && isTargetMesh && textures[name] && (
//                 <Decal
                
//                   position={meshSettings[name].position}
//                   rotation={[
//                     meshSettings[name].rotation[0] + Math.PI, // flip upside-down
//                     meshSettings[name].rotation[1] + Math.PI,
//                     meshSettings[name].rotation[2]
//                   ]}
//                   scale={meshSettings[name].scale}
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
//     </group>
//   );
// }

// useGLTF.preload("/newbama1.glb");



// import { useRef, useEffect, useState } from "react";
// import { useGLTF, Decal } from "@react-three/drei";
// import * as THREE from "three";
// import { useControls, folder } from "leva";

// export function Hoodie({ position, scale = 1, decalProps = {}, onMeshCentersCalculated }) {
//   const { nodes, materials, scene } = useGLTF("/newbama1.glb");
//   const [textures, setTextures] = useState({
//     Main003: null,
//     Main004: null,
//     Arms002: null
//   });
  
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
//         const box = new THREE.Box3().setFromObject(foundMesh);
//         const center = new THREE.Vector3();
//         box.getCenter(center);
        
//         centers[meshName] = [center.x, center.y, center.z + 0.01];
        
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
    
//     // Pass the mesh centers to parent component
//     if (onMeshCentersCalculated) {
//       onMeshCentersCalculated(centers);
//     }
//   }, [scene, onMeshCentersCalculated]);

//   // Load default textures for each mesh
//   useEffect(() => {
//     const textureLoader = new THREE.TextureLoader();
//     const defaultTextures = {
//       Main003: "/logoPrint.jpeg",
//       Main004: "/Decal.webp",
//       Arms002: "/Diagonal.png" 
//     };
    
//     Object.entries(defaultTextures).forEach(([meshName, texturePath]) => {
//       textureLoader.load(
//         texturePath,
//         (texture) => {
//           texture.flipY = false;
//           texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
//           texture.minFilter = THREE.LinearFilter;
//           texture.magFilter = THREE.LinearFilter;
//           texture.anisotropy = 16;
          
//           const aspectRatio = texture.image.width / texture.image.height;
          
//           setMeshSettings(prev => ({
//             ...prev,
//             [meshName]: { 
//               ...prev[meshName], 
//               scale: [0.1 * aspectRatio, 0.1, 1] 
//             },
//           }));
          
//           texture.needsUpdate = true;
          
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

//   // Handle custom uploaded textures from props
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
          
//           // Only update if we don't have custom scale values
//           if (!decalProps.customScales || !decalProps.customScales[meshName]) {
//             const aspectRatio = texture.image ? texture.image.width / texture.image.height : 1;
            
//             setMeshSettings(prev => ({
//               ...prev,
//               [meshName]: { 
//                 ...prev[meshName], 
//                 scale: [0.1 * aspectRatio, 0.1, 1] 
//               },
//             }));
//           }
          
//           setTextures(prev => ({
//             ...prev,
//             [meshName]: texture
//           }));
//         }
//       });
//     }
//   }, [decalProps.customTextures]);

//   // Handle custom scale settings
//   useEffect(() => {
//     if (decalProps.customScales) {
//       Object.entries(decalProps.customScales).forEach(([meshName, scaleValues]) => {
//         if (scaleValues && scaleValues.x && scaleValues.y) {
//           setMeshSettings(prev => ({
//             ...prev,
//             [meshName]: {
//               ...prev[meshName],
//               scale: [scaleValues.x, scaleValues.y, 1]
//             }
//           }));
//         }
//       });
//     }
//   }, [decalProps.customScales]);

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

//   // Leva controls
//   const [controlValues] = useControls(() => ({
//     "Hoodie Options": folder({
//       roughness: { value: 0.7, min: 0, max: 1, step: 0.01 },
//       metalness: { value: 0.1, min: 0, max: 1, step: 0.01 },
//       opacity: { value: 1, min: 0, max: 1, step: 0.01 },
//       enableDecal: { value: true, label: "Show Images" },
//       modelScale: { value: modelScale, min: 0.5, max: 2, step: 0.1, onChange: (v) => setModelScale(v) },
//     }),
//   }), [modelScale]);

//   const { roughness, metalness, opacity, enableDecal } = controlValues;

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
//           const isTargetMesh = ["Main003", "Main004", "Arms002"].includes(name);
          
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
//                   ? new THREE.MeshStandardMaterial().copy(
//                       materials[node.material.name] || materials.Configurator_01
//                     )
//                   : materials.Configurator_01
//               }
//             >
//               {enableDecal && isTargetMesh && textures[name] && (
//                 <Decal
//                   position={meshSettings[name].position}
//                   rotation={[
//                     meshSettings[name].rotation[0] + Math.PI, // flip upside-down
//                     meshSettings[name].rotation[1] + Math.PI,
//                     meshSettings[name].rotation[2]
//                   ]}
//                   scale={meshSettings[name].scale}
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
//     </group>
//   );
// }

// useGLTF.preload("/newbama1.glb");



import { useRef, useEffect, useState } from "react";
import { useGLTF, Decal } from "@react-three/drei";
import * as THREE from "three";
import { useControls, folder } from "leva";

export function Hoodie({ position, scale = 1, decalProps = {}, onMeshCentersCalculated }) {
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
  // Store aspect ratios for each texture
  const [textureAspectRatios, setTextureAspectRatios] = useState({
    Main003: 1,
    Main004: 1,
    Arms002: 1
  });

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
    
    // Pass the mesh centers to parent component
    if (onMeshCentersCalculated) {
      onMeshCentersCalculated(centers);
    }
  }, [scene, onMeshCentersCalculated]);

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
          
          // Store the aspect ratio for this texture
          setTextureAspectRatios(prev => ({
            ...prev,
            [meshName]: aspectRatio
          }));
          
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

  // Handle custom uploaded textures from props
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
          
          // Calculate and store aspect ratio
          const aspectRatio = texture.image ? texture.image.width / texture.image.height : 1;
          setTextureAspectRatios(prev => ({
            ...prev,
            [meshName]: aspectRatio
          }));
          
          // Only update if we don't have custom scale values
          if (!decalProps.customScales || !decalProps.customScales[meshName]) {
            setMeshSettings(prev => ({
              ...prev,
              [meshName]: { 
                ...prev[meshName], 
                scale: [0.1 * aspectRatio, 0.1, 1] 
              },
            }));
          }
          
          setTextures(prev => ({
            ...prev,
            [meshName]: texture
          }));
        }
      });
    }
  }, [decalProps.customTextures]);

  // Handle custom scale settings while preserving aspect ratio
  useEffect(() => {
    if (decalProps.customScales) {
      Object.entries(decalProps.customScales).forEach(([meshName, scaleValues]) => {
        if (scaleValues && scaleValues.x !== undefined && scaleValues.y !== undefined) {
          // Use the aspect ratio if provided, otherwise use the stored one
          const aspectRatio = scaleValues.aspectRatio || textureAspectRatios[meshName] || 1;
          
          setMeshSettings(prev => ({
            ...prev,
            [meshName]: {
              ...prev[meshName],
              scale: [scaleValues.x, scaleValues.y, 1]
            }
          }));
        }
      });
    }
  }, [decalProps.customScales, textureAspectRatios]);

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

  // Leva controls
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
                    meshSettings[name].rotation[1] + Math.PI,
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