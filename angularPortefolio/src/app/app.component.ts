import {AfterViewInit, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {mouseEvent} from "./eventListener/MouseEvent";
import {keyboardEvent} from "./eventListener/KeyboardEvent";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {

  ngAfterViewInit() {
    if (typeof window!=="undefined") {
      // browser code

      const width = window.innerWidth, height = window.innerHeight;

      // init

      const camera = new THREE.PerspectiveCamera(70, width / height, 1, 150);
      camera.position.z = 2;

      const scene = new THREE.Scene();

      const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      const material = new THREE.MeshNormalMaterial();

      const mesh = new THREE.Mesh(geometry, material);
      // scene.add( mesh );

      const renderer = new THREE.WebGLRenderer({antialias: true});
      const controls = new OrbitControls( camera, renderer.domElement );

      renderer.setSize(width, height);

      const animate = (time: number) => {

        mesh.rotation.x = time / 2000;
        mesh.rotation.y = time / 1000;

        // camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
        requestAnimationFrame(animate);

      }


      const loader = new GLTFLoader();
      loader.load('./assets/screen/scene.gltf', function (gltf) {
        scene.add(gltf.scene); // Ajouter le modèle à la scène
      }, undefined, function (error) {
        console.error(error); // Gérer les erreurs
      });

      renderer.setClearColor(0xFFFFF, 0);
      renderer.setAnimationLoop(animate);
      renderer.render(scene, camera);
      document.body.appendChild(renderer.domElement);


      // clavier
      keyboardEvent(camera)

      // SOURIS
      mouseEvent(camera, controls)

    }

  }


}
