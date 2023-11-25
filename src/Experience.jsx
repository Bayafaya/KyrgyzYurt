import {
  useGLTF,
  useTexture,
  OrbitControls,
  Sparkles,
  Html,
  CameraControls,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef, useState } from "react";
import { DoubleSide } from "three";

export default function Experience() {
  const [explore, setExplore] = useState(true);
  const cameraControlRef = useRef();
  const yurtRef = useRef();
  const { camera } = useThree();

  const skeleton = useGLTF("./model/skeleton.glb");
  const texture = useTexture("./model/skeleton.jpg");
  texture.flipY = false;

  const mantle = useGLTF("./model/mantle.glb");
  const mantleTexture = useTexture("./model/mantle.jpg");
  mantleTexture.flipY = false;

  const metalFrame = useGLTF("./model/metalFrame.glb");
  const metalFrameTexture = useTexture("./model/metalFrame.jpg");
  metalFrameTexture.flipY = false;

  const veil = useGLTF("./model/veil.glb");
  const veilTexture = useTexture("./model/veil.jpg");
  veilTexture.flipY = false;

  const floorAndBelts = useGLTF("./model/newFloor.glb");
  const floorAndBeltsTexture = useTexture("./model/floorAndBelts.jpg");
  floorAndBeltsTexture.flipY = false;

  const tableAndChest = useGLTF("./model/tableAndChest.glb");
  const tableAndChestTexture = useTexture("./model/tableAndChest.jpg");
  tableAndChestTexture.flipY = false;

  const yurtaAll = useControls({
    position: {
      value: { x: -1.2, y: -0.82, z: -2.13 },
      step: 0.01,
    },
    rotation: {
      value: { x: -0.08, y: -3.52, z: 0.08 },
      step: 0.01,
    },
  });

 

  const moveToYurt = () => {

     cameraControlRef.current.enabled = true;
      setExplore(false)
   
      cameraControlRef.current?.setLookAt(
        camera.position.x,
        camera.position.y ,
        camera.position.z - 1.5,
        yurtRef.current.position.x,
        yurtRef.current.position.y,
        yurtRef.current.position.z,
        true
      );
  
      yurtRef.current.rotation.x = 0;
      yurtRef.current.rotation.z = 0;
  };

  return (
    <>
      <color args={["black"]} attach="background" />
      <CameraControls ref={cameraControlRef} enabled={false} />

      {/* <OrbitControls enabled={false} makeDefault/> */}

      <group
        ref={yurtRef}
        rotation={[
          yurtaAll.rotation.x,
          yurtaAll.rotation.y,
          yurtaAll.rotation.z,
        ]}
        scale={0.5}
        position={[
          yurtaAll.position.x,
          yurtaAll.position.y,
          yurtaAll.position.z,
        ]}
      >
        <mesh geometry={skeleton.nodes.YurtaExterior008.geometry}>
          <meshBasicMaterial map={texture} />
        </mesh>

        <mesh geometry={mantle.nodes.YurtaExterior003.geometry}>
          <meshBasicMaterial map={mantleTexture} side={DoubleSide} />
        </mesh>

        <mesh geometry={mantle.nodes.YurtaExterior004.geometry}>
          <meshBasicMaterial map={mantleTexture} />
        </mesh>

        <mesh geometry={mantle.nodes.YurtaExterior005.geometry}>
          <meshBasicMaterial map={mantleTexture} />
        </mesh>

        <mesh geometry={mantle.nodes.YurtaExterior012.geometry}>
          <meshBasicMaterial map={mantleTexture} />
        </mesh>

        <mesh geometry={metalFrame.nodes.YurtaExterior007.geometry}>
          <meshBasicMaterial map={metalFrameTexture} />
        </mesh>

        <mesh geometry={veil.nodes.YurtaExterior002.geometry}>
          <meshBasicMaterial map={veilTexture} />
        </mesh>

        <mesh geometry={floorAndBelts.nodes.Yurtainterior031.geometry}>
          <meshBasicMaterial map={floorAndBeltsTexture} />
        </mesh>

        <mesh geometry={tableAndChest.nodes.Yurtainterior030.geometry}>
          <meshBasicMaterial map={tableAndChestTexture} />
        </mesh>

        <Sparkles
          scale={[2.6, 3, 2]}
          size={5}
          speed={0.6}
          position={[0, 3.5, 0]}
          count={20}
        />
      </group>

        {explore
        ? <Html
        wrapperClass="explore"
        position={[1.6, 0.4, 0]}
        rotation={[1, 2, 3]}
      >
        <div>
          <p>Kyrgyz Yurt</p>
          <button onClick={moveToYurt}>Explore</button>
        </div>
          </Html>
        : null
        }
     
    </>
  );
}


useGLTF.preload("./model/skeleton.glb");
useGLTF.preload("./model/mantle.glb");
useGLTF.preload("./model/metalFrame.glb");
useGLTF.preload("./model/veil.glb");
useGLTF.preload("./model/newFloor.glb");
useGLTF.preload("./model/tableAndChest.glb");
