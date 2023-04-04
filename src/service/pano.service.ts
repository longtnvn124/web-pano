// import { Injectable } from '@angular/core';
// @Injectable({
//   providedIn: 'root'
// })
import * as THREE from "three";
export class PanoService {
  image: string;
  points: any = [];
  scene = new THREE.Scene();
  sprites: any = [];
  constructor() {
    this.image = image;
    this.points = [];
  }

  createScene(scene) {
    this.scene = scene;
    const geometry = new THREE.SphereGeometry(50, 32, 32);
    const texture = new THREE.TextureLoader().load(this.image);
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.x = -1;
    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
    material.transparent = true;
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
  }

  addTooltip = (pos: any, name: string) => {
    let spriteMap = new THREE.TextureLoader().load('../assets/image/info.png');
    let spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap });
    let sprite = new THREE.Sprite(spriteMaterial);
    sprite.name = name;
    sprite.position.copy(pos.clone().normalize().multiplyScalar(30));
    sprite.scale.multiplyScalar(2)
    this.scene.add(sprite);
    this.sprites.push(sprite);
  }

  addpoints = (point) => {
    this.points = point;
  }
}



