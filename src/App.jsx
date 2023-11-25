import {
  useGLTF,
  useTexture,
  Sparkles,
  Html,
  CameraControls,
  Text,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import { useRef, useState } from "react";
import { DoubleSide } from "three";

export default function App() {
  const [explore, setExplore] = useState(true);
  const cameraControlRef = useRef();
  const exterior = useRef();
  const interior = useRef();
  const tableStuff = useRef();
  
  const yurtRef = useRef();
  const { camera } = useThree();
  
  const { nodes } = useGLTF("./model/merged.glb");
  const texture = useTexture("./model/newOne.jpg");
  texture.flipY = false;

  const secondTexture = useTexture("./model/secondOne.jpg");
  secondTexture.flipY = false;

  const thirdTexture = useTexture("./model/chessTableStuff.jpg");
  thirdTexture.flipY = false;



  // const yurtaAll = useControls({
  //   position: {
  //     value: { x: -1.2, y: -0.82, z: -2.13 },
  //     step: 0.01,
  //     disabled: true 
  //   },
  //   rotation: {
  //     value: { x: -0.08, y: -3.52, z: 0.08 },
  //     step: 0.01,
  //     disabled: true 
  //   },

  // });

  const moveToYurt = () => {
    cameraControlRef.current.enabled = true;
    setExplore(false);

    cameraControlRef.current?.setLookAt(
      camera.position.x,
      camera.position.y,
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
     {/* <Perf position='top-left' /> */}
      <color args={["black"]} attach="background" />
      <CameraControls ref={cameraControlRef} enabled={false} />

      {/* <OrbitControls enabled={false} makeDefault/> */}

      <group
        ref={yurtRef}
        rotation={[
          // yurtaAll.rotation.x,
          // yurtaAll.rotation.y,
          // yurtaAll.rotation.z,
          -0.08,
          -3.52,
          0.08
        ]}
        scale={0.5}
        position={[
          // yurtaAll.position.x,
          // yurtaAll.position.y,
          // yurtaAll.position.z,
          -1.2,
          -0.82,
          -2.13
        ]}
      >
        <mesh ref={exterior} geometry={nodes.mergedSecond.geometry}>
          <meshBasicMaterial map={texture} side={DoubleSide} />
        </mesh>
        
        <mesh ref={interior} geometry={nodes.mergedThree.geometry}>
          <meshBasicMaterial map={secondTexture} side={DoubleSide} />
        </mesh>

        <mesh ref={tableStuff} geometry={nodes.mergedTableAndChess.geometry}>
          <meshBasicMaterial map={thirdTexture} side={DoubleSide} />
        </mesh>

        <mesh geometry={nodes.kurut.geometry}>
          <meshBasicMaterial map={thirdTexture} side={DoubleSide} />
          {/* <Html
          wrapperClass="kurut"
          position={[-0.1,0.55,-0.1]}
          occlude={[]}
          >
            <div>
              s
            </div>
          </Html> */}
        </mesh>


        <Sparkles
          scale={[2, 2, 2]}
          size={5}
          speed={0.6}
          position={[0, 4, 0]}
          count={15}
        />
      </group>

      {explore ? (
        <Html
          wrapperClass="explore"
          position={[1.6, 0.4, 0]}
          rotation={[1, 2, 3]}
        >
          <div>
            <p>Kyrgyz Yurt</p>
            <button onClick={moveToYurt}>Explore</button>
          </div>
        </Html>
      ) : null}
    </>
  );
}
