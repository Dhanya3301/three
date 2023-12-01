import * as THREE from "three";
import "./style.css";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const geometry = new THREE.TorusGeometry(7, 3, 16, 200);
const material = new THREE.MeshStandardMaterial({
  color: "#fff",
  wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const light1 = new THREE.PointLight("0xffffff", 1, 100, 0.5, 100);
light1.position.set(10, 10, 10);
light1.intensity = 1.25;
scene.add(light1);
const light2 = new THREE.PointLight("0xffffff", 1, 100, 0.5, 100);
light2.position.set(10, 10, -10);
light2.intensity = 1.25;
scene.add(light2);

// const lightHelper1 = new THREE.PointLightHelper(light1, 1);
// const lightHelper2 = new THREE.PointLightHelper(light2, 1);
// scene.add(lightHelper1, lightHelper2);

// const grid = new THREE.GridHelper(200, 50);
// scene.add(grid);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight
);
camera.position.x = 3;
camera.position.y = 5;
camera.position.z = 45;

scene.add(camera);
// const cameraHelper = new THREE.CameraHelper(camera);
// scene.add(cameraHelper);

const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth / window.innerHeight);
});

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};

loop();

const tl = gsap.timeline({ defaults: { duration: 1 } });
tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
// tl.fromTo("nav", { y: "-100%" }, { y: "0%" });
// tl.fromTo(".title", { opacity: 0 }, { opacity: 1 });
// tl.fromTo(camera.position, { z: 40, x: 10, y: 20 }, { z: -40, x: 10, y: 0 });

let mouseDown = false;
let rgb = [];
window.addEventListener("mousedown", () => {
  mouseDown = true;
});
window.addEventListener("mouseup", () => {
  mouseDown = false;
});

window.addEventListener("mousemove", (e) => {
  if (mouseDown) {
    rgb = [
      Math.round((e.pageX / window.innerWidth) * 255),
      Math.round((e.pageY / window.innerHeight) * 255),
      150,
    ];
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
    gsap.to(mesh.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,
    });
  }
});
