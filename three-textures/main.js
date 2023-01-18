import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'


const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = () => {
  console.log('onStart')
}
loadingManager.onLoad = () => {
  console.log('onLoad')
}
loadingManager.onProgress = () => {
  console.log('onProgress')
}
loadingManager.onError = () => {
  console.log('onError')
}

const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load('./static/textures/minecraft.png')
const alphaTexture = textureLoader.load('./static/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('./static/textures/door/height.jpg')
const normalTexture = textureLoader.load('./static/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('./static/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('./static/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('./static/textures/door/roughness.jpg')

// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.wrapS = THREE.MirroredRepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping

// colorTexture.offset.x = 0.5
// colorTexture.offset.Y = 0.5

// colorTexture.rotation = Math.PI / 4
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5

colorTexture.generateMipmaps = false
colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter


const canvas = document.querySelector('canvas.webgl')
const SIZES = {
  width: window.innerWidth,
  height: window.innerHeight
}
const aspectRatio = SIZES.width / SIZES.height
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75,aspectRatio,0.1,1000)
camera.position.z = 3
scene.add(camera)


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true



const geometry = new THREE.BoxGeometry(3,3,1)
const material = new THREE.MeshBasicMaterial({map: colorTexture})
const mesh = new THREE.Mesh(geometry,material)
colorTexture.repeat.x = 3
colorTexture.repeat.y = 3
colorTexture.wrapS = THREE.RepeatWrapping
colorTexture.wrapT = THREE.RepeatWrapping
scene.add(mesh)
// const mesh1 = new THREE.Mesh(geometry,material)
// mesh1.position.x = -1
// const mesh2 = new THREE.Mesh(geometry,material)
// mesh2.position.x = 1
// const mesh3 = new THREE.Mesh(geometry,material)
// mesh3.position.y = 1
// const mesh4 = new THREE.Mesh(geometry,material)
// mesh4.position.y = -1
// const mesh5 = new THREE.Mesh(geometry,material)
// mesh5.position.y = -1
// mesh5.position.x = -1
// const mesh6 = new THREE.Mesh(geometry,material)
// mesh6.position.y = -1
// mesh6.position.x = 1
// const mesh7 = new THREE.Mesh(geometry,material)
// mesh7.position.y = 1
// mesh7.position.x = 1
// const mesh8 = new THREE.Mesh(geometry,material)
// mesh8.position.y = 1
// mesh8.position.x = -1
// scene.add(mesh,mesh1,mesh2,mesh3,mesh4,mesh5,mesh6,mesh7,mesh8)

const renderer = new THREE.WebGLRenderer({
  canvas:canvas
})
renderer.setPixelRatio(Math.min(window.devicePixelRatio,1))
renderer.setSize(SIZES.width,SIZES.height)

window.addEventListener('resize', () => {
  SIZES.width = window.innerWidth
  SIZES.height = window.innerHeight

  camera.aspect = SIZES.width / SIZES.height
  camera.updateProjectionMatrix()


  renderer.setPixelRatio(Math.min(window.devicePixelRatio,1))
  renderer.setSize(SIZES.width,SIZES.height)
})

const animation = () => {
  renderer.render(scene,camera)
  controls.update()
  requestAnimationFrame(animation)
}
requestAnimationFrame(animation)

