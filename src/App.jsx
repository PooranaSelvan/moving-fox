import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Fox from "./fox";

function App() {

  return (
    <>

      {/* Setting Camera's position of the fox. */}
      <Canvas camera={{ position: [0, 1, 5], fov: 75, near: 0.5, far: 100 }} style={{ width: "100vw", height: "100vh" }} className="flex flex-wrap justify-evenly items-center">
          {/* Lights to visible fox. */}
          <directionalLight intensity={2.5} position={[2, 2, 2]} />
          <ambientLight intensity={0.5} />

          {/* DraggableFox component to make fox draggable. */}
          {/* Passing animation mode - "idle" */}
          <DraggableFox currentAnimation={"walk"} />
          {/* <DraggableFox currentAnimation={"idle"} /> */}
      </Canvas>
    </>
  );
}


const DraggableFox = ({ currentAnimation }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState(null);
  const [rotation, setRotation] = useState([0, 0, 0]);

  const handlePointerDown = (event) => {
    setIsDragging(true);
    setLastMousePosition([event.clientX, event.clientY]);
  };

  const handlePointerMove = (event) => {
    if (isDragging && lastMousePosition) {
      const deltaX = event.clientX - lastMousePosition[0];
      const deltaY = event.clientY - lastMousePosition[1];

      setRotation(([x, y, z]) => [
        x + deltaY * 0.01, // Adjust sensitivity for up/down
        y + deltaX * 0.01, // Adjust sensitivity for left/right
        z,
      ]);

      setLastMousePosition([event.clientX, event.clientY]);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    setLastMousePosition(null);
  };

  return (

    // Storing the fox in a group to make it draggable.
    // stops dragging when pointer leaves the fox.
    <group onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerLeave={handlePointerUp}>
      <Fox currentAnimation={currentAnimation} position={[0, 0, 0]} rotation={rotation} scale={[0.5, 0.5, 0.5]}/>
    </group>
  );
};

export default App;
