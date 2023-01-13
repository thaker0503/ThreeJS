import './style.css'
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

const cursor = {
  x: 0,
  y: 0
}
window.addEventListener("mousemove", (ev) => {
  cursor.x = (ev.clientX / sizes.width) - 0.5
  cursor.y = -((ev.clientY / sizes.height) - 0.5)
})
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()

const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100)
camera.position.set(0, 0, 3)
camera.lookAt(mesh.position)
scene.add(camera)

const controls = new OrbitControls(camera,canvas)
// controls.target.y = -1
controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)


// const clock = new THREE.Clock()

const animate = () => {
  // const elapsedTime = clock.getElapsedTime()
  // mesh.rotation.y = elapsedTime
  // camera.position.set(
  //   (Math.sin(cursor.x * Math.PI * 2)) * 3,
  //   cursor.y * 5,
  //   (Math.cos(cursor.x * Math.PI * 2)) * 3)
  // camera.lookAt(mesh.position)
  controls.update()

  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}
requestAnimationFrame(animate)