import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 40;
scene.add(camera);

const geometry = new THREE.SphereGeometry(20, 200, 30);
const sunTexture = new THREE.TextureLoader().load('./8k_sun.jpg')
const moonTexture = new THREE.TextureLoader().load('./8k_moon.jpg')
const background = new THREE.TextureLoader().load('./8k_stars_milky_way.jpg')
scene.background = background
const material = new THREE.MeshBasicMaterial({
  color: 0xed6013,
  // wireframe: true,
  map: sunTexture,
});
const sun = new THREE.Mesh(geometry, material);
scene.add(sun);

const g2 = new THREE.SphereGeometry(5,200,20)
const material2 = new THREE.MeshBasicMaterial({
  map: moonTexture
})
const moon = new THREE.Mesh(g2,material2)
moon.position.set(50,0,0)
scene.add(moon)




const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas#app"),
  alpha: true
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2);
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(
  camera,
  document.querySelector("canvas#app")
);
controls.enableDamping = true;

const pointLight = new THREE.PointLight(0xffffff,500)
// pointLight.position.set(12,1,1)
scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(ambientLight)

// const pointLightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(pointLightHelper,gridHelper);


const addStar = () => {
  const geometry = new THREE.SphereGeometry(0.15);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloat(50,100));

  star.position.set(x, y, z);
  scene.add(star);
};

Array(100).fill().forEach(addStar);




window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;

  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2);
});

const animate = () => {
  renderer.render(scene, camera);
  controls.update();
  requestAnimationFrame(animate);
};

requestAnimationFrame(animate);
