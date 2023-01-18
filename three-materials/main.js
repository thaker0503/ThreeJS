import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'


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

