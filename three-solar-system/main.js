import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {MeshSurfaceSampler} from "three/examples/jsm/math/MeshSurfaceSampler"

const loading = document.getElementById('loader')

const scene = new THREE.Scene();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height,0.1,10000);
camera.position.z = 600;
camera.position.y = 10
scene.add(camera);

const geometry = new THREE.SphereGeometry(10, 200, 30);
const mercuryTexture = new THREE.TextureLoader().load('./8k_mercury.jpg')
const earthTexture = new THREE.TextureLoader().load('./8k_earth_daymap.jpg')

const sunTexture = new THREE.TextureLoader().load('./8k_sun.jpg')
const moonTexture = new THREE.TextureLoader().load('./8k_moon.jpg')
const background = new THREE.TextureLoader().load('./8k_stars_milky_way.jpg')
const venusTexture = new THREE.TextureLoader().load('./8k_venus_surface.jpg')
const marsTexture = new THREE.TextureLoader().load('./8k_mars.jpg')
const jupiterTexture = new THREE.TextureLoader().load('./8k_jupiter.jpg')
const saturnTexture = new THREE.TextureLoader().load('./8k_saturn.jpg')
const uranusTexture = new THREE.TextureLoader().load('./2k_uranus.jpg')
const neptuneTexture = new THREE.TextureLoader().load('./2k_neptune.jpg')
const saturnRingTexture = new THREE.TextureLoader().load('./8k_saturn_ring_alpha.png')
scene.background = background
const material = new THREE.MeshBasicMaterial({
  // color: 0xed6013,
  // wireframe: true,
  map: earthTexture,
});
const earth = new THREE.Mesh(geometry, material);
// earth.position.x = 
scene.add(earth);

const g2 = new THREE.SphereGeometry(3,200,20)
const material2 = new THREE.MeshBasicMaterial({
  map: moonTexture
})
const moon = new THREE.Mesh(g2,material2)
moon.position.set(20,0,0)
scene.add(moon)
const earthGroup = new THREE.Group()
earthGroup.position.x = 205
earthGroup.add(earth,moon)
scene.add(earthGroup)
const sunGeo = new THREE.SphereGeometry(50,200,50)
const sunMat = new THREE.MeshBasicMaterial({
  // color: 0xed6013,
  // wireframe: true,
  map: sunTexture,
})
const sun = new THREE.Mesh(sunGeo,sunMat)
scene.add(sun)

const mercuGeo = new THREE.SphereGeometry(6,200,30)
const mercuMat = new THREE.MeshBasicMaterial({
  map: mercuryTexture
})
const mercury = new THREE.Mesh(mercuGeo,mercuMat)
scene.add(mercury)
mercury.position.x = 100

const venusGeo = new THREE.SphereGeometry(8,200,30)
const venusMat = new THREE.MeshBasicMaterial({
  map: venusTexture
})
const venus = new THREE.Mesh(venusGeo,venusMat)
venus.position.x = 150
scene.add(venus)

const marsGeo = new THREE.SphereGeometry(13,200,30)
const marsMat = new THREE.MeshBasicMaterial({
  map: marsTexture
})
const mars = new THREE.Mesh(marsGeo,marsMat)
mars.position.x = 280
scene.add(mars)

const jupiterGeo = new THREE.SphereGeometry(15,200,30)
const jupiterMat = new THREE.MeshBasicMaterial({
  map: jupiterTexture
})
const jupiter = new THREE.Mesh(jupiterGeo,jupiterMat)
jupiter.position.x = 365
scene.add(jupiter)

const uranusGeo = new THREE.SphereGeometry(10.78,200,30)
const uranusMat = new THREE.MeshBasicMaterial({
  map: uranusTexture
})
const uranus = new THREE.Mesh(uranusGeo,uranusMat)
uranus.position.x = 495
scene.add(uranus)

const neptuneGeo = new THREE.SphereGeometry(10.78,200,30)
const neptuneMat = new THREE.MeshBasicMaterial({
  map: neptuneTexture
})
const neptune = new THREE.Mesh(neptuneGeo,neptuneMat)
neptune.position.x = 545
scene.add(neptune)

const saturnGeo = new THREE.SphereGeometry(13,200,30)
const saturnMat = new THREE.MeshBasicMaterial({
  map: saturnTexture
})
const saturnSphere = new THREE.Mesh(saturnGeo,saturnMat)
// scene.add(saturn)

const saturnRingGeo = new THREE.TorusGeometry(15,1,2,100)
const saturnRingMat = new THREE.MeshBasicMaterial({map: saturnRingTexture})
const saturnRing = new THREE.Mesh(saturnRingGeo,saturnRingMat)

const saturn = new THREE.Group()
saturn.add(saturnSphere,saturnRing)
saturn.position.x = 430
scene.add(saturn)


const aestGeo = new THREE.RingGeometry( 310, 320, 360);
const aestMat = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide, wireframe:true} );
const aesteroids = new THREE.Mesh( aestGeo, aestMat );
aesteroids.rotation.x = 300
// scene.add( aesteroids );






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
    .map(() => THREE.MathUtils.randFloat(-100,100));

  star.position.set(x, y, z);
  scene.add(star);
};

// const addAestoroids = () => {
//   const geometry = new THREE.SphereGeometry(0.15);
//   const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
//   const star = new THREE.Mesh(geometry, material);

//   const [x, y, z] = Array(3)
//     .fill()
//     .map((a,i) => i===0 || i===2 ? THREE.MathUtils.randFloat(310,320) : 0 );

//   star.position.set(x, y, z);
//   scene.add(star);
// };

// Array(15000).fill().forEach(addAestoroids);


document.addEventListener("dblclick", () => {
  enterFullScreen(document.querySelector('canvas#app'))
})

function enterFullScreen(element) {
  if(!document.fullscreenElement){
    if(element.requestFullscreen) {
      element.requestFullscreen();
    }else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();     // Firefox
    }else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();  // Safari
    }else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();      // IE/Edge
    }
  } else {
    document.exitFullscreen()
  }
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;

  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio), 2);
});

const clock = new THREE.Clock()

const animate = () => {
  renderer.render(scene, camera);
  const elapsedTime = clock.getElapsedTime()
  let date = Date.now() * 0.0001;
  moon.rotation.y += 0.01
  moon.position.set(
    Math.cos(date*2) * 20,
    0,
    Math.sin(date*2) * 20
  )
  mercury.position.set(
    Math.cos(date*3) * 80, // x-axis
    0,
    Math.sin(date*3) * 80 // y-axis
  )
  venus.position.set(
    Math.cos(date*2) * 150,
    0,
    Math.sin(date*2) * 150
  )
  earthGroup.position.set(
    Math.cos(date/2) * 200,
    0,
    Math.sin(date/2) * 200
  )
  mars.position.set(
    Math.cos(date*2) * 250,
    0,
    Math.sin(date*2) * 250
  )
  jupiter.position.set(
    Math.cos(date*0.78) * 365,
    0,
    Math.sin(date*0.78) * 365
  )
  saturn.position.set(
    Math.cos(date*0.658) * 430,
    0,
    Math.sin(date*0.658) * 430
  )
  uranus.position.set(
    Math.cos(date*0.2) * 495,
    0,
    Math.sin(date*0.2) * 495
  )
  neptune.position.set(
    Math.cos(date*0.5) * 545,
    0,
    Math.sin(date*0.5) * 545
  )
  sun.rotation.y += 0.0005
  earth.rotation.y -= 0.001
  earth.rotation.x -= 0.001
  mercury.rotation.y += 0.01
  mercury.rotation.x += 0.01
  venus.rotation.y -= 0.01
  venus.rotation.x -= 0.01
  mars.rotation.y += 0.005
  // jupiter.rotation.x -= 0.1
  jupiter.rotation.x -= 0.05
  saturn.rotation.x += 0.05
  saturn.rotation.y += 0.05
  // jupiter.rotation.z = 5
  // mars.rotation.x += 0.1
  
  // moon.position.y += 1
  controls.update();
  requestAnimationFrame(animate);
};

requestAnimationFrame(animate);
