import * as THREE from "three"

const scene = new THREE.Scene()
// Scene is like a container 
// We put objects, models, lights, etc.
// We need to render this scene

// Objects
// Primitive geometries
// Imported models
// Particles
// lights

// A MESH is a combination of a geometry(the shape) and a material(how it works)


// Cube
const cubeGeometry = new THREE.BoxGeometry(15,15,15)
// BoxGeometry(width : Float, height : Float, depth : Float, widthSegments : Integer, heightSegments : Integer, depthSegments : Integer)
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const cube = new THREE.Mesh(cubeGeometry,cubeMaterial)
const cube2 = cube.clone()
cube2.position.x = 30
scene.add(cube)
scene.add(cube2)

// Capsule
const capsuleGeometry = new THREE.CapsuleGeometry(5,5,10,20)
// CapsuleGeometry(radius : Float, length : Float, capSubdivisions : Integer, radialSegments : Integer)
const capsuleMaterial = new THREE.MeshBasicMaterial({ color: 0x00e0ff})
const capsule = new THREE.Mesh(capsuleGeometry,capsuleMaterial)
capsule.position.y = 20
scene.add(capsule)

// Circle 
const circleGeometry = new THREE.CircleGeometry(10,36)
// CircleGeometry(radius : Float, segments : Integer, thetaStart : Float, thetaLength : Float)
const circleMaterial = new THREE.MeshBasicMaterial({color: 0xeeeeee})
const circle = new THREE.Mesh(circleGeometry,circleMaterial)
circle.position.y = -10
circle.position.x = -20
scene.add(circle)

// Cone
const coneGeometry = new THREE.ConeGeometry(5,10,36,1,false,0,8)
// ConeGeometry(radius : Float, height : Float, radialSegments : Integer, heightSegments : Integer, openEnded : Boolean, thetaStart : Float, thetaLength : Float)
const coneMaterial = new THREE.MeshBasicMaterial({color: 0xcccccc})
const cone = new THREE.Mesh(coneGeometry,coneMaterial)
cone.position.x = 50
scene.add(cone)

// Cylinder
const cylinderGeometry = new THREE.CylinderGeometry(5,5,20,32,1,true)
// CylinderGeometry(radiusTop : Float, radiusBottom : Float, height : Float, radialSegments : Integer, heightSegments : Integer, openEnded : Boolean, thetaStart : Float, thetaLength : Float)
const cylinderMaterial = new THREE.MeshBasicMaterial({color: 0xffffff})
const cylinder = new THREE.Mesh(cylinderGeometry,cylinderMaterial)
cylinder.position.x = 50
cylinder.position.y = 20
cylinder.rotateX(40)
scene.add(cylinder)


// Wirefraame Geometry
const geometry = new THREE.SphereGeometry( 100, 100, 100 );

const wireframe = new THREE.WireframeGeometry( geometry );

const line = new THREE.LineSegments( wireframe );
line.material.depthTest = false;
line.material.opacity = 0.25;
line.material.transparent = trueDefault;

scene.add( line );



// Camera
const sizes ={
  width: 800,
  height: 600
}
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.x = 15
camera.position.y = 10
camera.position.z = 50
scene.add(camera)

// Renderer 
// rendering our scene from the camera POV
// rendered inside a canvas
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
  // alpha: true,
  canvas: canvas
})
renderer.setSize(sizes.width,sizes.height)
renderer.setClearColor( 0xbbbbbb, 1);


renderer.render(scene,camera)