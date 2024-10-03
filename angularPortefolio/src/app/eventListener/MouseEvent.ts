import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function mouseEvent(camera: THREE.PerspectiveCamera, controls :OrbitControls) {

  document.addEventListener("mousemove", (event) => {
      controls.update();
  }, false);

  document.addEventListener('wheel', (event) => {
    camera.position.z += event.deltaY / 100;
  });

}
