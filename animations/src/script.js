import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xfffff)

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
mesh.position.set(0.7,-0.6,0.7)
// mesh.scale.set(1,2,1)
// mesh.position.normalize()
scene.add(mesh)



// Sizes
const sizes = {
    width: innerWidth,
    height: innerHeight
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
// camera.position.normalize()
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
// renderer.render(scene, camera)

/*
Animate
*/

// Using current time


// let time = Date.now()
// const animation = () => {
//     const currentTime = Date.now()
//     const diff = currentTime - time
//     time = currentTime
//     mesh.rotation.y += 0.001 * diff
//     renderer.render(scene, camera)
//     window.requestAnimationFrame(animation)
// }

// Using the built in CLOCK 

const clock = new THREE.Clock()

const animation = () => {
    const elapsedTime = clock.getElapsedTime()
    // mesh.rotation.y = elapsedTime * Math.PI * 2
    mesh.position.x = Math.cos(elapsedTime)
    // console.log(elapsedTime)
    renderer.render(scene, camera)
    window.requestAnimationFrame(animation)
}

animation()
