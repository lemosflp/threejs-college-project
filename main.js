import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

// Camera setup
const cam = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
cam.position.set(10, 10, 10);
cam.lookAt(0, 0, 0);

// Renderer initialization
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambient = new THREE.AmbientLight(0xffffff, 0.5); // Soft global light
scene.add(ambient);

const directional = new THREE.DirectionalLight(0xffffff, 1); // Main light source
directional.position.set(5, 10, 7.5);
scene.add(directional);

// Ground plane
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({ color: 0x00ffff })
);
ground.rotation.x = -Math.PI / 2; // Rotate to lie flat
ground.position.y = -1;
scene.add(ground);

// Green cube on the right
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshStandardMaterial({ color: 0x00ff00 })
);
cube.position.set(2, 0, 0);
scene.add(cube);

// Blue sphere at the center
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 10, 32),
  new THREE.MeshStandardMaterial({ color: 0x0000ff })
);
scene.add(sphere);

// Orange cylinder on the left
const cylinder = new THREE.Mesh(
  new THREE.CylinderGeometry(0.5, 0.5, 1, 32),
  new THREE.MeshStandardMaterial({ color: 0xff9900 })
);
cylinder.position.x = -2;
scene.add(cylinder);

// Orbit camera controls
const controls = new OrbitControls(cam, renderer.domElement);
controls.enableDamping = true; // Smooth camera movement
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 1;
controls.maxDistance = 50;
controls.maxPolarAngle = Math.PI / 2; // Limit vertical rotation

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.y += 0.01;      // Rotate cube
  sphere.rotation.y += 0.01;    // Rotate sphere
  cylinder.rotation.x += 0.01;  // Rotate cylinder on X
  cylinder.rotation.z += 0.01;  // and Z axes

  renderer.render(scene, cam);
}
animate();

// Responsive resize handling
window.addEventListener('resize', () => {
  cam.aspect = window.innerWidth / window.innerHeight;
  cam.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
