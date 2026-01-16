import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

interface CADViewerProps {
  stlData: string | null;
}

export function CADViewer({ stlData }: CADViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(50, 50, 50);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight1.position.set(1, 1, 1);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight2.position.set(-1, -1, -1);
    scene.add(directionalLight2);

    const gridHelper = new THREE.GridHelper(100, 20, 0x444444, 0x222222);
    scene.add(gridHelper);

    const axesHelper = new THREE.AxesHelper(30);
    scene.add(axesHelper);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      controls.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    if (!stlData || !sceneRef.current) return;

    if (modelRef.current) {
      sceneRef.current.remove(modelRef.current);
      modelRef.current.geometry.dispose();
      if (Array.isArray(modelRef.current.material)) {
        modelRef.current.material.forEach(m => m.dispose());
      } else {
        modelRef.current.material.dispose();
      }
    }

    const loader = new STLLoader();

    const binaryString = atob(stlData);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const geometry = loader.parse(bytes.buffer);
    geometry.computeVertexNormals();

    const material = new THREE.MeshPhongMaterial({
      color: 0x4a90e2,
      specular: 0x111111,
      shininess: 200,
      side: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(geometry, material);

    geometry.computeBoundingBox();
    const boundingBox = geometry.boundingBox!;
    const center = new THREE.Vector3();
    boundingBox.getCenter(center);
    mesh.position.sub(center);

    sceneRef.current.add(mesh);
    modelRef.current = mesh;

    const size = new THREE.Vector3();
    boundingBox.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = cameraRef.current!.fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
    cameraZ *= 2;

    cameraRef.current!.position.set(cameraZ, cameraZ, cameraZ);
    cameraRef.current!.lookAt(0, 0, 0);
    controlsRef.current!.target.set(0, 0, 0);
    controlsRef.current!.update();

  }, [stlData]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative'
      }}
    />
  );
}
