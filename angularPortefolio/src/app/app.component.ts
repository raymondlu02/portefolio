import {AfterViewInit, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js';

import {mouseEvent} from "./eventListener/MouseEvent";
import {keyboardEvent} from "./eventListener/KeyboardEvent";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {CSS3DRenderer} from "three/examples/jsm/renderers/CSS3DRenderer";
import {HomePageComponent} from "./components/home-page/home-page.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HomePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {

  ngAfterViewInit() {
    if (typeof window!=="undefined") {

      // ----------------------------------------------------------------------------------

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(80, 130, 0);


      // 2. WebGLRenderer (for GLTF Models)
      const webGLRenderer = new THREE.WebGLRenderer();
      webGLRenderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(webGLRenderer.domElement);
      webGLRenderer.setClearColor( 0x000000, 0 ); // the default
      const controls = new OrbitControls( camera, webGLRenderer.domElement);
      controls.target.set(0,100,0);


      // 3. CSS3DRenderer (for HTML Elements)
      const cssRenderer = new CSS3DRenderer();


      // 4. Load GLTF Model
      // Texture -> faudra que je cherceh ca serrt  a quoi
      webGLRenderer.toneMapping = THREE.ACESFilmicToneMapping;
      webGLRenderer.toneMappingExposure = 4;

      const rgbeLoader = new RGBELoader();
      rgbeLoader.load('./assets/MR_INT-005_WhiteNeons_NAD.hdr', function(texture) {

        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
        const loader = new GLTFLoader();
        loader.load('./assets/deskLow/scene.gltf', function (gltf) {
          const model = gltf.scene;
          model.scale.set(0.5, 0.5, 0.5);
          scene.add(model);
        });
      });

// 6. Animation Loop
      const animate= () => {
        requestAnimationFrame(animate);

        // Render WebGL (GLTF model)
        webGLRenderer.render(scene, camera);

        // Render CSS3D (HTML element)
        cssRenderer.render(scene, camera);
      }

      const homePage = new HomePageComponent();
      homePage.create(scene, document, camera, cssRenderer)
      animate();





      // 7. Handle window resize
      window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        webGLRenderer.setSize(window.innerWidth, window.innerHeight);
        cssRenderer.setSize(window.innerWidth, window.innerHeight);
      });


      // clavier
      keyboardEvent(camera)

      // SOURIS
      mouseEvent(camera, controls)

    }

  }
}
