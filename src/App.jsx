


// import { Canvas } from "@react-three/fiber";
// import { Experience } from "./components/Experience";
// import { ImageUploader } from "./components/ImageUploader";
// import { Suspense, useState, useEffect } from "react";
// import { Leva } from "leva";
// import * as THREE from "three";

// function FallbackComponent() {
//   return (
//     <mesh>
//       <boxGeometry args={[1, 1, 1]} />
//       <meshBasicMaterial color="gray" wireframe />
//     </mesh>
//   );
// }

// function App() {
//   const [availableMeshes] = useState(["Main003", "Main004", "Arms002"]);
//   const [customTextures, setCustomTextures] = useState({
//     Main003: null,
//     Main004: null,
//     Arms002: null
//   });

//   // Handle uploading custom images
//   const handleImageUpload = (meshName, imageDataUrl) => {
//     const img = new Image();
//     img.src = imageDataUrl;
    
//     // When the image loads
//     img.onload = () => {
//       // Create a canvas to convert the image
//       const canvas = document.createElement('canvas');
//       const ctx = canvas.getContext('2d');
//       canvas.width = img.width;
//       canvas.height = img.height;
      
//       // Draw the image to the canvas
//       ctx.drawImage(img, 0, 0);
      
//       // Create a texture from the canvas
//       const texture = new THREE.CanvasTexture(canvas);
//       texture.flipY = false;
//       texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
//       texture.minFilter = THREE.LinearFilter;
//       texture.magFilter = THREE.LinearFilter;
//       texture.anisotropy = 16;
//       texture.needsUpdate = true;
      
//       // Update the custom textures state
//       setCustomTextures(prev => ({
//         ...prev,
//         [meshName]: texture
//       }));
//     };
//   };

//   // Load default textures on mount
//   useEffect(() => {
//     const textureLoader = new THREE.TextureLoader();
    
//     // Load different textures for each mesh
//     const texturePaths = {
//       Main003: "/logoPrint.jpeg",
//       Main004: "/Decal.webp",
//       Arms002: "/Diagonal.png"
//     };
    
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
//     <div style={{ width: "100vw", height: "100vh", background: "#ECECEC", position: "relative" }}>
//       {/* Image uploader UI - placed OUTSIDE the Canvas */}
//       <ImageUploader 
//         onImageUpload={handleImageUpload} 
//         meshOptions={availableMeshes}
//       />
      
//       <Leva collapsed={false} />
      
//       <Canvas
//         shadows
//         camera={{ position: [0, 0, 5], fov: 30 }}
//         gl={{ preserveDrawingBuffer: true, antialias: true }}
//       >
//         <Suspense fallback={<FallbackComponent />}>
//           <Experience customTextures={customTextures} />
//         </Suspense>
//       </Canvas>
//     </div>
//   );
// }

// export default App;


// import { Canvas } from "@react-three/fiber";
// import { Experience } from "./components/Experience";
// import { ImageUploader } from "./components/ImageUploader";
// import { Suspense, useState, useEffect } from "react";
// import { Leva } from "leva";
// import * as THREE from "three";

// function FallbackComponent() {
//   return (
//     <mesh>
//       <boxGeometry args={[1, 1, 1]} />
//       <meshBasicMaterial color="gray" wireframe />
//     </mesh>
//   );
// }

// function App() {
//   const [availableMeshes] = useState(["Main003", "Main004", "Arms002"]);
//   const [customTextures, setCustomTextures] = useState({
//     Main003: null,
//     Main004: null,
//     Arms002: null
//   });
//   const [customScales, setCustomScales] = useState({
//     Main003: { x: 0.1, y: 0.1 },
//     Main004: { x: 0.1, y: 0.1 },
//     Arms002: { x: 0.1, y: 0.1 }
//   });

//   // Handle uploading custom images
//   const handleImageUpload = (meshName, imageDataUrl) => {
//     const img = new Image();
//     img.src = imageDataUrl;
   
//     // When the image loads
//     img.onload = () => {
//       // Create a canvas to convert the image
//       const canvas = document.createElement('canvas');
//       const ctx = canvas.getContext('2d');
//       canvas.width = img.width;
//       canvas.height = img.height;
     
//       // Draw the image to the canvas
//       ctx.drawImage(img, 0, 0);
     
//       // Create a texture from the canvas
//       const texture = new THREE.CanvasTexture(canvas);
//       texture.flipY = false;
//       texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
//       texture.minFilter = THREE.LinearFilter;
//       texture.magFilter = THREE.LinearFilter;
//       texture.anisotropy = 16;
//       texture.needsUpdate = true;
     
//       // Update the custom textures state
//       setCustomTextures(prev => ({
//         ...prev,
//         [meshName]: texture
//       }));
//     };
//   };

//   // Handle scale changes for decals
//   const handleScaleChange = (meshName, xScale, yScale) => {
//     setCustomScales(prev => ({
//       ...prev,
//       [meshName]: { x: xScale, y: yScale }
//     }));
//   };

//   // Load default textures on mount
//   useEffect(() => {
//     const textureLoader = new THREE.TextureLoader();
   
//     // Load different textures for each mesh
//     const texturePaths = {
//       Main003: "/logoPrint.jpeg",
//       Main004: "/Decal.webp",
//       Arms002: "/Diagonal.png"
//     };
   
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
//     <div style={{ width: "100vw", height: "100vh", background: "#ECECEC", position: "relative" }}>
//       {/* Image uploader UI - placed OUTSIDE the Canvas */}
//       <ImageUploader
//         onImageUpload={handleImageUpload}
//         meshOptions={availableMeshes}
//         onScaleChange={handleScaleChange}
//       />
     
//       <Leva collapsed={false} />
     
//       <Canvas
//         shadows
//         camera={{ position: [0, 0, 5], fov: 30 }}
//         gl={{ preserveDrawingBuffer: true, antialias: true }}
//       >
//         <Suspense fallback={<FallbackComponent />}>
//           <Experience 
//             customTextures={customTextures} 
//             customScales={customScales}
//           />
//         </Suspense>
//       </Canvas>
//     </div>
//   );
// }

// export default App;



import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { ImageUploader } from "./components/ImageUploader";
import { Suspense, useState, useEffect } from "react";
import { Leva } from "leva";
import * as THREE from "three";

function FallbackComponent() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="gray" wireframe />
    </mesh>
  );
}

function App() {
  const [availableMeshes] = useState(["Main003", "Main004", "Arms002"]);
  const [customTextures, setCustomTextures] = useState({
    Main003: null,
    Main004: null,
    Arms002: null
  });
  const [customScales, setCustomScales] = useState({
    Main003: { x: 0.1, y: 0.1, aspectRatio: 1 },
    Main004: { x: 0.1, y: 0.1, aspectRatio: 1 },
    Arms002: { x: 0.1, y: 0.1, aspectRatio: 1 }
  });

  // Handle uploading custom images
  const handleImageUpload = (meshName, imageDataUrl) => {
    const img = new Image();
    img.src = imageDataUrl;
   
    // When the image loads
    img.onload = () => {
      // Calculate aspect ratio
      const aspectRatio = img.width / img.height;
      
      // Create a canvas to convert the image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
     
      // Draw the image to the canvas
      ctx.drawImage(img, 0, 0);
     
      // Create a texture from the canvas
      const texture = new THREE.CanvasTexture(canvas);
      texture.flipY = false;
      texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = 16;
      texture.needsUpdate = true;
     
      // Update the custom textures state
      setCustomTextures(prev => ({
        ...prev,
        [meshName]: texture
      }));
      
      // Update scale with aspect ratio
      setCustomScales(prev => ({
        ...prev,
        [meshName]: { 
          ...prev[meshName],
          aspectRatio: aspectRatio 
        }
      }));
    };
  };

  // Handle scale changes for decals
  const handleScaleChange = (meshName, xScale, yScale, aspectRatio) => {
    setCustomScales(prev => ({
      ...prev,
      [meshName]: { 
        x: xScale, 
        y: yScale,
        aspectRatio: aspectRatio
      }
    }));
  };

  // Load default textures on mount
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
   
    // Load different textures for each mesh
    const texturePaths = {
      Main003: "/logoPrint.jpeg",
      Main004: "/Decal.webp",
      Arms002: "/Diagonal.png"
    };
   
    // Load each texture
    Object.entries(texturePaths).forEach(([meshName, path]) => {
      textureLoader.load(
        path,
        (texture) => {
          texture.flipY = false;
          texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.anisotropy = 16;
          texture.needsUpdate = true;
          
          // Calculate aspect ratio
          const aspectRatio = texture.image.width / texture.image.height;
          
          // Update scales with aspect ratio
          setCustomScales(prev => ({
            ...prev,
            [meshName]: { 
              ...prev[meshName],
              aspectRatio: aspectRatio 
            }
          }));
         
          // Update the textures state with this new texture
          setCustomTextures(prev => ({
            ...prev,
            [meshName]: texture
          }));
        },
        undefined,
        (error) => console.error(`Error loading texture for ${meshName}:`, error)
      );
    });
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#ECECEC", position: "relative" }}>
      {/* Image uploader UI - placed OUTSIDE the Canvas */}
      <ImageUploader
        onImageUpload={handleImageUpload}
        meshOptions={availableMeshes}
        onScaleChange={handleScaleChange}
      />
     
      <Leva collapsed={false} />
     
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 30 }}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
      >
        <Suspense fallback={<FallbackComponent />}>
          <Experience
            customTextures={customTextures}
            customScales={customScales}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;