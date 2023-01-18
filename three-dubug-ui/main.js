import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import * as dat from 'dat.gui'

// console.log(dat)
/*
* Debug
*/
const gui = new dat.GUI()


const canvas = document.querySelector('canvas.webgl')
const SIZES = {
  width: window.innerWidth,
  height: window.innerHeight
}

const ASPECT_RATIO = SIZES.width / SIZES.height



const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, ASPECT_RATIO)
camera.position.z = 3
scene.add(camera)



// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const params = {
  color: 0xff0000,
  spin: () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
  }

}
const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: params.color }))
scene.add(mesh)
// Debug Mesh
gui.add(mesh.position, 'y', -3, 3, 0.01)
gui.add(mesh.material, 'visible')
gui.add(mesh.material, 'wireframe')
gui.addColor(params, 'color').onChange(() => mesh.material.color.set(params.color))
gui.add(params,'spin')

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1))
renderer.setSize(SIZES.width, SIZES.height)

const animation = () => {
  requestAnimationFrame(animation)
  controls.update()
  renderer.render(scene, camera)
}
requestAnimationFrame(animation)

window.addEventListener('resize', () => {
  // Update sizes
  SIZES.width = window.innerWidth
  SIZES.height = window.innerHeight

  // Update camera
  camera.aspect = SIZES.width / SIZES.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(SIZES.width, SIZES.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1))
})
