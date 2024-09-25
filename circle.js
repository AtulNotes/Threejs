import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// Scene
const scene = new THREE.Scene(); 
// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Mesh -> Geometry, Material
const geometry = new THREE.SphereGeometry(1, 10, 10); // Create 3D Circle
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true}); // 3D Circle Color and Wireframe is Circle show in lines
const Circle = new THREE.Mesh(geometry, material); // Combine the geometry and material to create a mesh
scene.add(Circle); // add the Circle to the scene

camera.position.z = 5; // set the camera position to z = 5

// Renderer
const canvas = document.querySelector('canvas'); // get the canvas element
const renderer = new THREE.WebGLRenderer({ canvas }); // create a renderer with the canvas element
renderer.setSize(window.innerWidth, window.innerHeight); // set the size of the renderer to the window size

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight); // resize the renderer when the window is resized
    camera.aspect = window.innerWidth / window.innerHeight; // update the camera aspect ratio
    camera.updateProjectionMatrix(); // update the camera's projection matrix
});

let clock = new THREE.Clock(); // create a clock object to keep track of time
const controls = new OrbitControls(camera, renderer.domElement); // create orbit controls for the camera
controls.enableDamping = true; // anable damping for smoother controls
controls.autoRotate = true; // enable auto rotation

// Animation
function animate() {
    window.requestAnimationFrame(animate); // request the next frame 
    renderer.render(scene, camera); // render the scene with the camera
    // Circle.rotation.x = clock.getElapsedTime(); // set the Circle's rotation on the x-axis to the elapsed time
    // Circle.rotation.y = clock.getElapsedTime(); // set the Circle's rotation on the x-axis to the elapsed time
    // Circle.rotation.x += 0.01; // increment the Circle's rotation on the x-axis by 0.01 radians
    // Circle.rotation.y += 0.01; // increment the Circle's rotation on the y-axis by 0.01 radians
    controls.update(); // update the controls
}
animate();