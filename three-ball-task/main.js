import "./style.css";
import * as THREE from "three";
// import gsap from "gsap";
// import dat from "dat.gui";

const canvas = document.querySelector("canvas.webgl");
const SIZES = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const aspectRatio = SIZES.width / SIZES.height;

// const textureLoader = new THREE.TextureLoader();

const scene = new THREE.Scene();
// scene.background = textureLoader.load("./wallpaper.jpg");

const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.01, 10);
camera.position.z = 8;
// var horizontalFov = 90;
// camera.fov = (Math.atan(Math.tan(((horizontalFov / 2) * Math.PI) / 180) / camera.aspect) * 2 * 180) / Math.PI;
scene.add(camera);

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1, 20, 20),
  new THREE.MeshBasicMaterial({
    // color: 0xff0000,
    wireframe: true,
  })
);
// sphere.position.set(-(SIZES.width/100),SIZES.height/100,0)
// camera.lookAt(sphere.position)
scene.add(sphere);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
renderer.setSize(SIZES.width, SIZES.height);

const clock = new THREE.Clock();

const animation = () => {
  const elapsedTime = clock.getElapsedTime();
  // sphere.rotation.x += 0.01;
  // sphere.rotation.y += 0.01;
  

  renderer.render(scene, camera);
  requestAnimationFrame(animation);
};
requestAnimationFrame(animation);

// const sphereAnimation = () => {
//   console.log("Sphere Animation");
//   const fovInRadians = (camera.fov * Math.PI) / 180;
//   const height = Math.abs(camera.position.z * Math.tan(fovInRadians / 2) * 2);
//   const width = (height * SIZES.width) / SIZES.height;
//   // console.log(SIZES.width/SIZES.height)
//   sphere.position.x = -(width / 2 - 1);
//   sphere.position.y = height / 2 - 1;
//   // camera.lookAt(sphere.position)
// };

window.addEventListener("scroll", () => {
  console.log("Scrolling");
  // const scrollY = window.scrollY;

  // sphere.position.x = -Math.sin(scrollY) * 2;
  // sphere.position.y -= scrollY * 0.001;
});

window.addEventListener("resize", () => {
  SIZES.width = window.innerWidth;
  SIZES.height = window.innerHeight;

  camera.aspect = SIZES.width / SIZES.height;
  camera.updateProjectionMatrix();

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
  renderer.setSize(SIZES.width, SIZES.height);
});
