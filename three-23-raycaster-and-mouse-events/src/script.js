import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

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

// Mouse Click Event
window.addEventListener('click', () => {
    if(currentIntersect){
        switch (currentIntersect.object) {
            case object1:
                console.log("Object 1");
                break;
            case object2:
                console.log("Object 2");
                break;
            case object3:
                console.log("Object 3");
                break;
        
            default:
                break;
        }
    }
})




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

// Model Import
let model = null
const gltfLoader = new GLTFLoader()
gltfLoader.load(
    './models/Duck/glTF-Binary/Duck.glb',
    (gltf) => {
        model = gltf.scene
        model.position.y = -1.2

        scene.add(model)
    }
)

// AmbientLight
const ambientLight = new THREE.AmbientLight(0xffffff,0.3)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff,0.7)
directionalLight.position.set(1,2,3)
scene.add(directionalLight)


/**
 * Animate
 */
const clock = new THREE.Clock()

let currentIntersect = null 

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    const raycaster = new THREE.Raycaster()

    // const rayOrigin = new THREE.Vector3(-3,0,0)
    // const rayDirection = new THREE.Vector3(1,0,0)
    // rayDirection.normalize()

    // raycaster.set(rayOrigin,rayDirection)

    object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5
    object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5
    object3.position.y = Math.sin(elapsedTime * 1.4) * 1.5

    raycaster.setFromCamera( mouse, camera );

    const objects = [object1,object2,object3]

    const intersects = raycaster.intersectObjects(objects)

    for (const obj of objects) {
        obj.material.color.set(0xff0000)
    }
    
    for (const intersect of intersects) {
        intersect.object.material.color.set(0x0000ff)
    }
    
    if(intersects.length){
        if(!currentIntersect){
            console.log("mouse enter");
        }
        currentIntersect = intersects[0]
    } else {
        // console.log('Nothing being hovered');
        if(currentIntersect){
            console.log("mouse leave");
        }
        currentIntersect = null
    }

    if(model){
        const modelIntersects = raycaster.intersectObject(model)
        if(modelIntersects.length){
            model.scale.set(1.2,1.2,1.2)
        }else{
            model.scale.set(1,1,1)
        }
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()