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



  async create(scene : THREE.Scene, document: Document, camera : THREE.PerspectiveCamera, cssRenderer : CSS3DRenderer){

    // 1. renderer
    cssRenderer.setSize(window.innerWidth, window.innerHeight);
    cssRenderer.domElement.style.display ='grid';
    cssRenderer.domElement.style.justifyContent ='center';


    document.body.appendChild(cssRenderer.domElement);

    // 2. Page html
    const element = document.createElement('div');
    element.style.width = '22px';
    element.style.height = '13px';
    element.style.backgroundColor = 'rgba(0, 0, 0, 1)';
    element.style.color = 'rgba(0, 0, 0, 1)';
    element.style.fontSize = '1px'; // Changer la taille du texte ici
    element.style.position = 'absolute'; // Changer la taille du texte ici
    element.innerHTML = "<div id='hello-css3d' style='color: white;'>Hello css3D</div>";

    document.body.appendChild(element);

    // On click
    const innerDiv = document.getElementById('hello-css3d');
    innerDiv?.addEventListener('click', function() {
      element.style.backgroundColor = 'rgba(255, 0, 0, 1)'; // Changes to red
    });

    const cssObject = new CSS3DObject(element);
    cssObject.position.set(0, 0, 0.8);  // Position the HTML element in the 3D space
    scene.add(cssObject);
  }





}


