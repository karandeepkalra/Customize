import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { useState, useEffect } from "react";
import { Hoodie } from "./HoddieModel";
import * as THREE from "three";

export const Experience = () => {
  const [logoTexture, setLogoTexture] = useState(null);

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
        setLogoTexture(texture);
      },
      undefined,
      (error) => console.error("Error loading logo texture:", error)
    );
  }, []);

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
        decalProps={{ logoTexture }}
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