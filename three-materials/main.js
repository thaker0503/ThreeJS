import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg')
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('./textures/matcaps/1.png')
const gradientTexture = textureLoader.load('./textures/gradients/3.jpg')

const canvas = document.querySelector('canvas.webgl')
const SIZES = {
  width: window.innerWidth,
  height: window.innerHeight
}
const aspectRatio = SIZES.width / SIZES.height
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000)
camera.position.z = 3
scene.add(camera)


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


// Material
const material = new THREE.MeshBasicMaterial()
// material.map = doorColorTexture
// material.color = new THREE.Color('yellow')
// material.wireframe = true
material.opacity = 0.5
material.transparent = true

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  material
)
sphere.position.x = -1.5

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1),
  material
)

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  material
)

torus.position.x = 1.5

scene.add(sphere, plane, torus)




const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1))
renderer.setSize(SIZES.width, SIZES.height)

window.addEventListener('resize', () => {
  SIZES.width = window.innerWidth
  SIZES.height = window.innerHeight

  camera.aspect = SIZES.width / SIZES.height
  camera.updateProjectionMatrix()


  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1))
  renderer.setSize(SIZES.width, SIZES.height)
})

const clock = new THREE.Clock()

const animation = () => {
  const elapsedTime = clock.getElapsedTime()

  sphere.rotation.y = 0.1 * elapsedTime
  plane.rotation.y = 0.1 * elapsedTime
  torus.rotation.y = 0.1 * elapsedTime
  
  sphere.rotation.x = 0.15 * elapsedTime
  plane.rotation.x = 0.15 * elapsedTime
  torus.rotation.x = 0.15 * elapsedTime

  controls.update()

  renderer.render(scene, camera)
  
  requestAnimationFrame(animation)
}

requestAnimationFrame(animation)

