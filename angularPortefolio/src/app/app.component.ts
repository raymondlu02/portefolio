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
      // browser code
      // -----------------------------------------------------------------------------------------
      // const width = window.innerWidth, height = window.innerHeight;
      //
      // // init
      //
      //
      // const camera = new THREE.PerspectiveCamera(70, width / height, 1, 150);
      // camera.position.z = 2;
      //
      // const scene = new THREE.Scene();
      //
      // const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      // const material = new THREE.MeshNormalMaterial();
      //
      // const mesh = new THREE.Mesh(geometry, material);
      // // scene.add( mesh );
      //
      // const renderer = new THREE.WebGLRenderer({antialias: true});
      //
      // const cssrenderer = new CSS3DRenderer();
      //
      // const controls = new OrbitControls( camera, renderer.domElement);
      //
      // renderer.setSize(width, height);
      // renderer.setClearColor( 0x000000, 0 ); // the default
      // const animate = (time: number) => {
      //
      //   mesh.rotation.x = time / 2000;
      //   mesh.rotation.y = time / 1000;
      //
      //   // camera.lookAt(0, 0, 0);
      //   renderer.render(scene, camera);
      //   cssrenderer.render(scene, camera);
      //   requestAnimationFrame(animate);
      //
      // }
      //
      // renderer.setAnimationLoop(animate);
      //
      //
      // // charge le modele 3D
      // // Texture -> faudra que je cherceh ca serrt  a quoi
      // renderer.toneMapping = THREE.ACESFilmicToneMapping;
      // renderer.toneMappingExposure = 4;
      //
      // const loader = new GLTFLoader();
      // const rgbeLoader = new RGBELoader();
      // rgbeLoader.load('./assets/MR_INT-005_WhiteNeons_NAD.hdr', function(texture){
      //
      //   texture.mapping = THREE.EquirectangularReflectionMapping;
      //   scene.environment = texture;
      //
      //   // importer un objet 3D
      //   loader.load('./assets/screen/scene.gltf', function (gltf) {
      //     // scene.add(gltf.scene); // Ajouter le modèle à la scène
      //   }, undefined, function (error) {
      //     console.error(error); // Gérer les erreurs
      //   });
      // })
      //
      // // -------------------------------------------------------------------
      //
      // // Ajout des axes (axes helper)
      // const axesHelper = new THREE.AxesHelper(5); // Longueur des axes: 5 unités
      // scene.add(axesHelper);
      //
      //
      // document.body.appendChild(renderer.domElement);
      //
      //
      // // AJOUTER les fonctions ci dessous
      //
      // addHomePage(scene, document, camera, cssrenderer);
      //
      //
      //
      // // clavier
      // keyboardEvent(camera)
      //
      // // SOURIS
      // mouseEvent(camera, controls)
      //
      // -----------------------------------------------------------------------------------------

      // const scene = new THREE.Scene();
      // let aspect = window.innerWidth/window.innerHeight;
      // let cam = new THREE.PerspectiveCamera(45, aspect,0.1, 1000);
      // cam.position.set(0,0,800);
      //
      //
      // let renderer = new CSS3DRenderer();
      // renderer.setSize(window.innerWidth, window.innerHeight);
      // document.body.appendChild(renderer.domElement);
      //
      // let el = document.createElement('div');
      // el.innerHTML = "<h1>Hello CSS3D</h1>";
      // let obj = new CSS3DObject(el);
      // obj.position.set(0,0,0);
      // scene.add(obj);
      //
      // function draw(){
      //   obj.rotation.y +=0.01;
      //   renderer.render(scene, cam);
      //   requestAnimationFrame(draw);
      // }
      //
      // draw();

      // ----------------------------------------------------------------------------------

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 0, 20);


      // 2. WebGLRenderer (for GLTF Models)
      const webGLRenderer = new THREE.WebGLRenderer();
      webGLRenderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(webGLRenderer.domElement);
      webGLRenderer.setClearColor( 0x000000, 0 ); // the default
      const controls = new OrbitControls( camera, webGLRenderer.domElement);


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
        loader.load('./assets/screen/scene.gltf', function (gltf) {
          const model = gltf.scene;
          model.scale.set(20, 21, 21);
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
      homePage.create(scene, document, camera, cssRenderer).then(
        () => animate()
      );





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
