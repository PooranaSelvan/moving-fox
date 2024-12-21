import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Fox from "./fox";

function RotatingFox({ currentAnimation, ...props }) {
  const ref = useRef();

  // Rotate the fox based on the mouse position
  useFrame((state) => {
    if (ref.current) {
      const { x, y } = state.mouse; // Get normalized mouse position
      ref.current.rotation.y = x * Math.PI; // Rotate around the y-axis
      ref.current.rotation.x = y * Math.PI * 0.1; // Slight tilt on the x-axis
    }
  });

  return <Fox ref={ref} currentAnimation={currentAnimation} {...props} />;
}

export default RotatingFox;
