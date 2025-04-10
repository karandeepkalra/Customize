
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Suspense } from "react";
import { Leva } from "leva";

function FallbackComponent() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="gray" wireframe />
    </mesh>
  );
}

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#ECECEC" }}>
      <Leva collapsed={false} />
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 30 }}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
      >
        <Suspense fallback={<FallbackComponent />}>
          <Experience />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;