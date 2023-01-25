import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const loader = new GLTFLoader(); 

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load("/textures/particles/snow.png");

// Particles
// const particlesGeometry = new THREE.SphereGeometry(1, 32, 32)
const particlesGeometry = new THREE.BufferGeometry();
const count = 1000;

const positions = new Float32Array(count * 3);
// const colors = new Float32Array(count * 3);


for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
  // colors[i] = Math.random();
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

// particlesGeometry.setAttribute(
//   "color",
//   new THREE.BufferAttribute(colors, 3)
// );


const particlesMaterial = new THREE.PointsMaterial({
  size: 0.1,
  // color: '#ff88cc',
  sizeAttenuation: true,
  transparent: true,
  alphaMap: particleTexture,
  // alphaTest: 0.001,
  // depthTest: false,
  depthWrite: false,
  // blending: THREE.AdditiveBlending,
  // vertexColors: true
});
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);
particles.position.y = particles.position.y / 2 + 1

/**
 * Test cube
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({color: "#00feee"})
// )
// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 10;
// camera.position.y = 1;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  // antialias: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
// renderer.outputEncoding = THREE.sRGBEncoding;

loader.load( 
  './leletoja.glb', 
  function ( gltf ) { 
    // gltf.scene.scale.set(2,2,2)
    console.log(gltf.scene)
    gltf.scene.children[0].material = new THREE.MeshBasicMaterial({color: 0xefef0f})
    scene.add( gltf.scene ); 
    renderer.render( scene, camera );
  });

  

/**
 * Animate
 */
const clock = new THREE.Clock();


const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // particles.position.z = Math.sin(elapsedTime)
  // particles.position.x = Math.cos(elapsedTime)
  // particles.rotation.y = elapsedTime * 0.2

  // for (let i = 0; i < count; i++) {
  //   const i3 = i * 3
    
  //   const x = particlesGeometry.attributes.position.array[i3] 
  //   particlesGeometry.attributes.position.array[i3+1] =  Math.sin(elapsedTime + x)

    
  // }
  // particlesGeometry.attributes.position.needsUpdate = true

  // Update controls
  controls.update();


  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();


