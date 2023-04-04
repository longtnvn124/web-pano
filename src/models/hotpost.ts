import * as THREE from "three";
import TweenLite from "gsap";

export class Panocontrol {
  image: string = '';
  points: any = {};
  scene = new THREE.Scene();
  sprites: any = [];
  sphere: any = [];
  camera: any = [];
  point: any = [];
  constructor(image, camera) {
    this.image = image;
    this.points = [];
    this.sprites = [];
    this.scene = null;
    this.camera = camera;
  }


  createScene = (scene) => {
    this.scene = scene;
    const geometry = new THREE.SphereGeometry(50, 32, 32);
    const texture = new THREE.TextureLoader().load(this.image);
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.x = -1;
    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
    // material.transparent = true;
    this.sphere = new THREE.Mesh(geometry, material);
    scene.add(this.sphere);
    this.points.forEach((f) => {

      this.addTooltip(f)

    });
  }

  addPoint(point) {
    this.points.push(point)
  }

  addTooltip(point) {
    // console.log(point);
    let spriteMap = new THREE.TextureLoader().load('../assets/image/info.png');
    let spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap });
    let sprite = new THREE.Sprite(spriteMaterial);
    sprite.name = point.name;
    sprite.position.copy((point.position.clone().normalize().multiplyScalar(30)));
    sprite.scale.multiplyScalar(2)
    this.scene.add(sprite);
    this.sprites.push(sprite);
    sprite["onClick"] = () => {
      this.destroy();
      point.scene.createScene(this.scene);
      point.scene.appear();
    }
  }

  destroy() {
    TweenLite.to(this.camera, 0.5, {
      zoom: 2,
      onUpdate: () => {
        this.camera.updateProjectionMatrix();
      }

    }).delay(0.5)
    TweenLite.to(this.sphere.material, 1, {
      opacity: 0,
      onComplete: () => {
        this.scene.remove(this.sphere)
      }
    })
    this.sprites.forEach((sprite) => {
      TweenLite.to(sprite.scale, 1, {
        x: 0,
        y: 0,
        z: 0,
        onComplete: () => {
          this.scene.remove(sprite)
        }
      })
    });
  }

  appear() {
    this.camera.zoom =2;
    TweenLite.to(this.camera, 1, {
      zoom: 1,
      onUpdate: () => {
        this.camera.updateProjectionMatrix();
      }

    })
    this.sphere.material.opacity = 0;
    TweenLite.to(this.sphere.material, 1, {
      opacity: 1,

    })
    this.sprites.forEach((sprite) => {
      sprite.scale.set(0, 0, 0)
      TweenLite.to(sprite.scale, 1, {
        x: 2,
        y: 2,
        z: 3,

      })
    });
  }


}
