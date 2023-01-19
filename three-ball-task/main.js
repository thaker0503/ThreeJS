import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import dat from 'dat.gui'

const canvas = document.querySelector('canvas.webgl')
const SIZES = {
  width: window.innerWidth,
  height: window.innerHeight
}
const aspectRatio = SIZES.width / SIZES.height


const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.01, 10)
camera.position.z = 3
// var horizontalFov = 90;
// camera.fov = (Math.atan(Math.tan(((horizontalFov / 2) * Math.PI) / 180) / camera.aspect) * 2 * 180) / Math.PI;
scene.add(camera)

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1, 20, 20),
  new THREE.MeshBasicMaterial({
    // color: 0xff0000,
    wireframe: true
  }
  ))
// sphere.position.set(-(SIZES.width/100),SIZES.height/100,0) 
camera.lookAt(sphere.position)
scene.add(sphere)

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
})
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1))
renderer.setSize(SIZES.width, SIZES.height)


const clock = new THREE.Clock()


const animation = () => {
  const elapsedTime = clock.getElapsedTime()
  sphereAnimation()
  renderer.render(scene, camera)
  requestAnimationFrame(animation)
}
requestAnimationFrame(animation)

const sphereAnimation = () => {
  const endPoint = new THREE.Vector3(SIZES.width/2,0,0)
  // if(sphere.position.x == )
}




window.addEventListener('resize', () => {
  SIZES.width = window.innerWidth
  SIZES.height = window.innerHeight

  camera.aspect = SIZES.width / SIZES.height
  camera.updateProjectionMatrix()


  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1))
  renderer.setSize(SIZES.width, SIZES.height)
})