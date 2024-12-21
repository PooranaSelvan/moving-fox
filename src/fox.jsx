import React, { useState, useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import FoxScene from "./Fox.glb";
import { useFrame } from "@react-three/fiber";

const Fox = ({ currentAnimation, ...props }) => {
  const foxRef = useRef();
  const { nodes, materials, animations } = useGLTF(FoxScene);
  const { actions } = useAnimations(animations, foxRef);

  // Track mouse position and dragging state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  // Handle mouse down event to start dragging
  const onMouseDown = () => {
    setDragging(true);
  };

  // Handle mouse up event to stop dragging
  const onMouseUp = () => {
    setDragging(false);
  };

  // Handle mouse move event to update position while dragging
  const onMouseMove = (event) => {
    if (dragging) {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1; // Map to -1 to 1 range
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1; // Map to -1 to 1 range
      setMousePos({ x: mouseX, y: mouseY });
    }
  };

  // Add event listeners for mouse interactions
  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging]);

  // Update animation based on currentAnimation prop
  useEffect(() => {
    if (actions && currentAnimation) {
      Object.values(actions).forEach((action) => action.stop());
      if (actions[currentAnimation]) {
        actions[currentAnimation].play();
      }
    }
  }, [actions, currentAnimation]);

  // Use useFrame to update rotation smoothly on each frame
  useFrame(() => {
    if (foxRef.current && dragging) {
      // Smoothly rotate the fox based on mouse position
      const rotationSpeed = 0.05; // Adjust speed of rotation
      foxRef.current.rotation.y = mousePos.x * Math.PI; // Rotate around y-axis based on mouse X
      foxRef.current.rotation.x = mousePos.y * Math.PI; // Rotate around x-axis based on mouse Y
    }
  });

  return (
    <group ref={foxRef} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <primitive object={nodes.GLTF_created_0_rootJoint} />
        <skinnedMesh name="Object_7" geometry={nodes.Object_7.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Object_7.skeleton}/>
        <skinnedMesh name="Object_8" geometry={nodes.Object_8.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Object_8.skeleton}/>
        <skinnedMesh name="Object_9" geometry={nodes.Object_9.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Object_9.skeleton}/>
        <skinnedMesh name="Object_10" geometry={nodes.Object_10.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Object_10.skeleton}/>
        <skinnedMesh name="Object_11" geometry={nodes.Object_11.geometry} material={materials.PaletteMaterial001} skeleton={nodes.Object_11.skeleton}/>
      </group>
    </group>
  );
};

export default Fox;
