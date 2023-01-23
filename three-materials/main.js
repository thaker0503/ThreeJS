import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'

const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg')
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('./textures/matcaps/3.png')
const gradientTexture = textureLoader.load('./textures/gradients/3.jpg')

const environmentMapTexture = cubeTextureLoader.load([
  './textures/environmentMaps/0/px.jpg',
  './textures/environmentMaps/0/nx.jpg',
  './textures/environmentMaps/0/py.jpg',
  './textures/environmentMaps/0/ny.jpg',
  './textures/environmentMaps/0/pz.jpg',
  './textures/environmentMaps/0/nz.jpg'
])


const canvas = document.querySelector('canvas.webgl')

// DAt Debug
const gui = new dat.GUI()

const SIZES = {
  width: window.innerWidth,
  height: window.innerHeight
}
const aspectRatio = SIZES.width / SIZES.height
const scene = new THREE.Scene()


const ambienLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambienLight)

const pointLight = new THREE.PointLight(0xffffff,0.5)
pointLight.position.set(2,3,4)
scene.add(pointLight)

// const pointLightHelper = new THREE.PointLightHelper(pointLight)
// scene.add(pointLightHelper)

const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000)
camera.position.z = 3
scene.add(camera)


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


// Material
// const material = new THREE.MeshBasicMaterial()
// material.map = doorColorTexture
// material.color = new THREE.Color('yellow')
// material.wireframe = true
// material.transparent = true
// material.opacity = 0.5
// material.alphaMap = doorAlphaTexture
// material.side = THREE.DoubleSide


// const material = new THREE.MeshNormalMaterial()
// material.side = THREE.DoubleSide
// material.wireframe = true


// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture


// const material = new THREE.MeshDepthMaterial()


// const material = new THREE.MeshLambertMaterial()


// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff)

// const material = new THREE.MeshToonMaterial()
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false

// material.gradientMap = gradientTexture


const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.envMap = environmentMapTexture

gui.add(material, 'metalness', 0, 1,0.0001)
gui.add(material, 'roughness', 0, 1,0.0001)



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

  pointLight.position.set(
    0,
    Math.cos(elapsedTime* 1),
    Math.sin(elapsedTime* 1),
  )

  controls.update()

  renderer.render(scene, camera)
  
  requestAnimationFrame(animation)
}

requestAnimationFrame(animation)

 