import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xfffff)

// Object

// Cube
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
// // mesh.position.set(0.7,-0.6,0.7)
// // mesh.scale.set(1,2,1)
// // mesh.position.normalize()
// scene.add(mesh)

// Sphere
// const mesh = new THREE.Mesh(
//     new THREE.SphereGeometry(10, 10, 10),
//     new THREE.MeshBasicMaterial({ color: 0xcc00 })
// )

const mesh = new THREE.Mesh(
    new THREE.TorusGeometry( 5, 1, 16, 100 ),
    new THREE.MeshBasicMaterial( { color: 0xffff00 } )
)
scene.add(mesh)


// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

// Sizes
const sizes = {
    width: innerWidth,
    height: innerHeight
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 20
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
    mesh.rotation.y = elapsedTime * (Math.PI * 0.3)
    mesh.position.y = Math.sin(elapsedTime)
    // mesh.position.x = Math.cos(elapsedTime)
    // camera.position.x = Math.sin(elapsedTime)
    // camera.position.z = Math.cos(elapsedTime)
    // camera.lookAt(mesh.position)
    // console.log(elapsedTime)

    renderer.render(scene, camera)
    window.requestAnimationFrame(animation)
}

animation()



// Using GSAP

// const animation = (time) => {
//     gsap.to(mesh.position, {duration: 1, delay: 1, x: 2})
//     gsap.to(mesh.position, {duration: 1, delay: 2, x: 0})
//     gsap.to(mesh.position, {duration: 1, delay: 3, x: -2, y: 1})
//     gsap.to(mesh.position, {duration: 1, delay: 4, x: 0, y: 0})
// // }

// // const clock = new THREE.Clock()
// const animate = () => {
//     renderer.render(scene,camera)
//     // animation(clock.getElapsedTime())
//     requestAnimationFrame(animate)
// }
// animate()