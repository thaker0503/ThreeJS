import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import Stats from 'three/addons/libs/stats.module.js';

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
 * Objects
 */
const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object1.position.x = - 2

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)

const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object3.position.x = 2

scene.add(object1, object2, object3)


/**
 * Raycaster
 */

let mouse = {}

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX / sizes.width * 2 - 1
    mouse.y = - (e.clientY / sizes.height * 2 - 1) 

})

const raycaster = new THREE.Raycaster()



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
camera.position.z = 3
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

// const stats = new Stats()


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // const rayOrigin = new THREE.Vector3(-3,0,0)
    // const rayDirection = new THREE.Vector3(1,0,0)
    // rayDirection.normalize()

    // raycaster.set(rayOrigin,rayDirection)

    object1.position.y = Math.sin(elapsedTime * 0.3)
    object2.position.y = Math.sin(elapsedTime * 0.7)
    object3.position.y = Math.sin(elapsedTime * 1.2)

    raycaster.setFromCamera( mouse, camera );

    const objects = [object1,object2,object3]

    const intersects = raycaster.intersectObjects(objects)

    for (const obj of objects) {
        obj.material.color.set(0xff0000)
    }

    if(intersects.length){
        intersects[0].object.material.color.set(0x0000ff)
    }
    // for (const obj of intersects) {
    // }
    
    

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()