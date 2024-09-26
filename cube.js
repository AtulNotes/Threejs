import * as THREE from 'three';
import GUI from 'lil-gui'; 
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// Scene
const scene = new THREE.Scene();
// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Light
// Ambient Light
const ambientLight = new THREE.AmbientLight("white", 0.5); // Create an ambient light
scene.add(ambientLight); // Add the ambient light to the scene

// Directional Light
const directionalLight = new THREE.DirectionalLight("white", 0.5); // Create a directional light
directionalLight.position.set(5, 5, 5); // Set the position of the light
scene.add(directionalLight); // Add the directional light to the scene

// Directional Light Helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1); // Create a directional light helper
scene.add(directionalLightHelper); // Add the directional light helper to the scene

// Point Light
const pointLight = new THREE.PointLight("white", 0.5); // Create a point light
pointLight.position.set(1, -1, 1); // Set the position of the light
scene.add(pointLight); // Add the point light to the scene

// Point Light Helper
const pointLightHelper = new THREE.PointLightHelper(pointLight, 1); // Create a point light helper
scene.add(pointLightHelper); // Add the point light helper to the scene

// Texture
const textureLoader = new THREE.TextureLoader(); // Create texture loader
const color = textureLoader.load('img/color.jpg'); // Load images
const roughness = textureLoader.load('img/roughness.jpg'); // Load images
const normal = textureLoader.load('img/normal.png'); // Load images

// Mesh -> Geometry, Material
const geometry = new THREE.BoxGeometry(1, 1, 1); // Create 3D Cube
// const geometry = new THREE.SphereGeometry(2, 10, 10); // Create 3D Sphere
// const geometry = new THREE.CylinderGeometry(2, 3, 2, 6, 5, true); // Create 3D Cylinder
const material = new THREE.MeshStandardMaterial({ map: color, roughnessMap: roughness, normalMap: normal}); // 3D Cube Color and Wireframe is cube show in lines and side is used to show the back side of the object
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide, wireframe: true }); // 3D Cube Color and Wireframe is cube show in lines and side is used to show the back side of the object
const cube = new THREE.Mesh(geometry, material); // Combine the geometry and material to create a mesh
scene.add(cube); // add the cube to the scene

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


// Lili GUI
const gui = new GUI();

// Material settings
const materialFolder = gui.addFolder('Material');
materialFolder.add(material, 'wireframe');
materialFolder.add(material, 'roughness', 0, 1, 0.01);
materialFolder.add(material, 'metalness', 0, 1, 0.01);
materialFolder.add(material, 'opacity', 0, 1, 0.01);
materialFolder.add(material, 'transparent');
materialFolder.close();
// Mesh settings
const meshFolder = gui.addFolder('Mesh');
meshFolder.add(cube.position, 'x', -10, 10, 5).name('x position');
meshFolder.add(cube.position, 'y', -10, 10, 0.1).name('y position');
meshFolder.add(cube.position, 'z', -10, 10, 0.1).name('z position');
meshFolder.add(cube.rotation, 'x', 0, Math.PI * 2, 0.01).name('x rotation');
meshFolder.add(cube.rotation, 'y', 0, Math.PI * 2, 0.01).name('y rotation');
meshFolder.add(cube.rotation, 'z', 0, Math.PI * 2, 0.01).name('z rotation');
meshFolder.add(cube.scale, 'x', 0.1, 5, 0.1).name('x scale');
meshFolder.add(cube.scale, 'y', 0.1, 5, 0.1).name('y scale');
meshFolder.add(cube.scale, 'z', 0.1, 5, 0.1).name('z scale');
meshFolder.close();

// Light settings
const lightFolder = gui.addFolder('Lights');

// Ambient Light
const ambientLightFolder = lightFolder.addFolder('Ambient Light');
ambientLightFolder.add(ambientLight, 'intensity', 0, 1, 0.01);
ambientLightFolder.close();

// Directional Light
const directionalLightFolder = lightFolder.addFolder('Directional Light');
directionalLightFolder.add(directionalLight, 'intensity', 0, 1, 0.01);
directionalLightFolder.add(directionalLight.position, 'x', -10, 10, 0.1).name('x position');
directionalLightFolder.add(directionalLight.position, 'y', -10, 10, 0.1).name('y position');
directionalLightFolder.add(directionalLight.position, 'z', -10, 10, 0.1).name('z position');
directionalLightFolder.close();

// Point Light
const pointLightFolder = lightFolder.addFolder('Point Light');
pointLightFolder.add(pointLight, 'intensity', 0, 1, 0.01);
pointLightFolder.add(pointLight.position, 'x', -10, 10, 0.1).name('x position');
pointLightFolder.add(pointLight.position, 'y', -10, 10, 0.1).name('y position');
pointLightFolder.add(pointLight.position, 'z', -10, 10, 0.1).name('z position');
pointLightFolder.close();


let clock = new THREE.Clock(); // create a clock object to keep track of time
const controls = new OrbitControls(camera, renderer.domElement); // create orbit controls for the camera
controls.enableDamping = true; // anable damping for smoother controls
controls.autoRotate = true; // enable auto rotation

// Animation
function animate() {
    window.requestAnimationFrame(animate); // request the next frame 
    renderer.render(scene, camera); // render the scene with the camera
    // cube.rotation.x = clock.getElapsedTime(); // set the cube's rotation on the x-axis to the elapsed time
    // cube.rotation.y = clock.getElapsedTime(); // set the cube's rotation on the x-axis to the elapsed time
    // cube.rotation.x += 0.01; // increment the cube's rotation on the x-axis by 0.01 radians
    // cube.rotation.y += 0.01; // increment the cube's rotation on the y-axis by 0.01 radians
    controls.update(); // update the controls
}
animate();