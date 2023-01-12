import './style.css'
import * as THREE from 'three'


// There are 4 properties for transforming objects
// position (to move the object)
// scale (to resize the object)
// rotation (to rotate the object)
// quaternion (to also rotate the object; more about that later)

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */

const group = new THREE.Group()
group.scale.y = 1.5
group.rotation.y = 1
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
group.add(cube1)
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)
cube2.position.x = -1.5
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
)
cube3.position.x = 1.5
group.add(cube3)



// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

// // Position Objects
// // mesh.position.x = 0.7
// // mesh.position.y = -0.6
// // mesh.position.z = 1
// mesh.position.set(0.7,-0.6,1)
// // mesh.position.normalize()


// // Scaling Objects
// mesh.scale.x = 0.5
// mesh.scale.y = 0.5
// mesh.scale.z = 0.5
// // mesh.scale.set(2,.5,.5)


// // Rotating Objects : use rotation or quaternion property
// mesh.rotation.y = 0


// Axes Helper
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)


/**
 * Sizes
*/
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
*/
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// camera.position.z = 3
camera.position.set(0, 0, 3)
scene.add(camera)
// camera.lookAt(mesh.position)
// console.log(mesh.position.distanceTo(camera.position))

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)