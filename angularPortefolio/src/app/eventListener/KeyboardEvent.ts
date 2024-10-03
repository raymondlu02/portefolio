import * as THREE from 'three';

export function keyboardEvent(camera: THREE.PerspectiveCamera) {

  // CLAVIER

  document.addEventListener("keydown", (event) => {

    const keyCode = event.key;
    switch (keyCode) {
      case 'z':
      {
        camera.position.y += 0.1;
        break
      }
      case 'q':
      {
        camera.position.x += -0.1;
        break;
      }
      case 's':
      {
        camera.position.y += -0.1;
        break;
      }
      case 'd':
      {
        camera.position.x += 0.1;
        break;
      }
    }
  }, false);

}
