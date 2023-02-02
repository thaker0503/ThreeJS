import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { RectAreaLight } from 'three'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)
gui.add(ambientLight,"intensity").min(0).max(1).step(0.01).name("Ambient Light")

const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.5)
scene.add(directionalLight)
directionalLight.position.set(1,0.25,0)
gui.add(directionalLight,"intensity").min(0).max(1).step(0.01).name("Directional Light")

const hemisphereLight = new THREE.HemisphereLight(0xff0000,0x0000ff, 0.5)
scene.add(hemisphereLight)
gui.add(hemisphereLight,"intensity").min(0).max(1).step(0.01).name("Hemisphere Light")


const pointLight = new THREE.PointLight(0xff9000, 0.5)
pointLight.position.set(1,-0.5,1)
scene.add(pointLight)
gui.add(pointLight,"intensity").min(0).max(1).step(0.01).name("Point Light")

const rectLight = new THREE.RectAreaLight(0x4e00ff, 2,1,1)
rectLight.position.set(-1.5,0,1.5)
rectLight.lookAt(new THREE.Vector3())
scene.add(rectLight)
gui.add(rectLight,"intensity").min(0).max(10).step(0.01).name("Rect Light")
gui.add(rectLight,"width").min(1).max(10).step(1).name("Rect Light Width")
gui.add(rectLight,"height").min(1).max(10).step(1).name("Rect Light Height")

const spotLight = new THREE.SpotLight(0x78ff00,0.5,6,Math.PI * 0.1,0.25,1)
spotLight.position.set(0,2,3)
scene.add(spotLight)
gui.add(spotLight,"intensity").min(0).max(10).step(0.01).name("spotLight intensity")
gui.add(spotLight,"distance").min(1).max(100).step(1).name("spotLight distance")
gui.add(spotLight,"angle").min(Math.PI * 0.1).max(Math.PI * 1).step(Math.PI * 0.1).name("spotLight angle")
scene.add(spotLight.target) // The spotlight looks at this object
spotLight.target.position.x = -0.75
// gui.add(rectLight,"width").min(1).max(10).step(1).name("Rect Light Width")
// gui.add(rectLight,"height").min(1).max(10).step(1).name("Rect Light Height")

document.addEventListener("", () => {
    rectLight.intensity = 0
    pointLight.intensity = 0
    hemisphereLight.intensity = 0
    directionalLight.intensity = 0
    spotLight.intensity = 1.4
    spotLight.distance = 6
})

document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    rectLight.intensity = 0
    pointLight.intensity = 0
    hemisphereLight.intensity = 0
    directionalLight.intensity = 0
    spotLight.intensity = 0
    ambientLight.intensity = 0
})

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4
gui.add(material,"roughness").min(0).max(1).step(0.001).name("Material Roughness")
gui.add(material,"metalness").min(0).max(1).step(0.001).name("Material Metalness")

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()