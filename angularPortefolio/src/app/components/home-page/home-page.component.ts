import { Component } from '@angular/core';
import * as THREE from "three";
import {CSS3DObject, CSS3DRenderer} from "three/examples/jsm/renderers/CSS3DRenderer";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {



  create(scene : THREE.Scene, document: Document, camera : THREE.PerspectiveCamera, cssRenderer : CSS3DRenderer){

    const html :string = "<div [className]='content-center' id='hello-css3d' style='color: white;'>Hello css3D</div>"
    const html2 :string = "<div [className]='content-center' id='hello-css3d' style='color: white;'>Hello css3D v222</div>"

    // 1. renderer
    cssRenderer.setSize(window.innerWidth, window.innerHeight);
    cssRenderer.domElement.style.display ='grid';
    cssRenderer.domElement.style.justifyContent ='center';


    document.body.appendChild(cssRenderer.domElement);

    // 2. Page html
    const element = document.createElement('div');
    element.style.width = '76px';
    element.style.height = '40px';
    element.style.backgroundColor = 'rgba(0, 0, 0, 1)';
    element.style.color = 'rgba(0, 0, 0, 1)';
    element.style.fontSize = '10px'; // Changer la taille du texte ici
    element.style.position = 'absolute'; // Changer la taille du texte ici
    element.innerHTML = `
      <div style={ color: 'white'}>Hello, CSS3D!</div>
      <p>This is a CSS3D Renderer example with React.</p>
      <button class="btn btn-primary">Bootstrap Button</button>
    `;
    element.style.paddingTop = '2px'
    document.body.appendChild(element);

    // On click
    const innerDiv = document.getElementById('hello-css3d');
    innerDiv?.addEventListener('click', function() {
      element.innerHTML = html2;
    });


    const cssObject = new CSS3DObject(element);
    cssObject.position.set(-28, 138, 8);  // Position the HTML element in the 3D space
    cssObject.rotation.y = THREE.MathUtils.degToRad(90);
    scene.add(cssObject);
  }





}


