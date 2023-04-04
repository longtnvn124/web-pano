import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OrbitControls } from '@three-ts/orbit-controls';
import { Panocontrol } from 'src/models/hotpost';
import * as THREE from 'three';

@Component({
  selector: 'app-xuly-anh',
  templateUrl: './xuly-anh.component.html',
  styleUrls: ['./xuly-anh.component.css']
})
export class XulyAnhComponent implements OnInit {
  @ViewChild('tootip', { static: true }) tooltip: ElementRef;
  @ViewChild('pano', { static: true }) pano: ElementRef;

  // khai báo biến
  public texture: any;
  // tạo 1 biến render cửa sổ
  public renderer = new THREE.WebGLRenderer();
  // tạo 1 màn hình để render ra giao diện
  // scene = new THREE.Scene();
  public scene = new THREE.Scene();
  // tạo 1 khung nhìn camera với ...
  public camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
  // tạo 1 control để điêu khoeenr cảmera
  public controls = new OrbitControls(this.camera);
  // tạo 1 khối với hình 3 kích thức toạ độ x y z
  // geometry = new THREE.BoxGeometry(50,50, 30);
  public geometry = new THREE.SphereGeometry(50, 32, 32);
  // tạo màu cho khối
  // material = new THREE.MeshBasicMaterial({ map:this.texture, side: THREE.DoubleSide });
  // sphere = new THREE.Mesh(this.geometry, this.material);
  // bieenn taoj 1 anhr ddeer thay thees hih
  textureLoader = new THREE.TextureLoader();
  // container = document.body;
  // container:HTMLElement = this.panocheck.nativeElement;
  // container:HTMLElement;
  sphere: any;
  material: any;


  constructor() {

  }
  ngOnInit(): void {
    this.loaddata();
  }

  loaddata() {
    const container = this.pano.nativeElement;
    //Scene and Controls

    this.camera.position.set(-1,0, -20);
    this.controls.rotateSpeed = -0.2;
    this.controls.maxDistance = 40;
    this.controls.minDistance = 0.9;
    this.controls.enableZoom = true;
    this.controls.enablePan = false;
    // this.controls.enableDamping = true;
    // this.controls.dampingFactor = 0.3;
    // this.controls.autoRotate = true;
    this.scene = new THREE.Scene();
    this.controls.update();
    // this.camera.position.z = 10;

    // Sphere

    let s = new Panocontrol('../assets/image/anh4.jpg', this.camera);
    let s2 = new Panocontrol('../assets/image/image1.jpg', this.camera);
    s.addPoint({ position: new THREE.Vector3(49.40178862892124, -2.8353191676005745, 4.659501822024657), name: "TP Thái nguyên", scene: s2 });
    s.addPoint({ position: new THREE.Vector3(17.602207163870595, 4.481469731273407, 46.429732937959294), name: "TP Bắc Ninh", scene: s2 });
    s2.addPoint({ position: new THREE.Vector3(0.5520833333333333, 0.04065040650406504, 0.08130081300813008), name: "TP Nam Định", scene: s });
    s.createScene(this.scene);
    s.appear();

    // render
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(this.renderer.domElement);
    // thay doi suwj kienj
    const animate = () => {
      requestAnimationFrame(animate);
      this.renderer.render(this.scene, this.camera);
    }
    animate();
    let onResize = () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    }

    // this.addTooltip(new THREE.Vector3(0.5520833333333333, 0.04065040650406504, 0.08130081300813008), 'TP Thái Nguyên')
    container.addEventListener('resize', onResize);

    container.addEventListener("click", this.onClick);
    container.addEventListener("mousemove", this.onMouseMove);

  }

  rayCaster = new THREE.Raycaster();;

  onClick = (e: any) => {

    const mouse = new THREE.Vector2(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1,
    );
    this.rayCaster.setFromCamera(mouse, this.camera);
    let intersects = this.rayCaster.intersectObjects(this.scene.children);
    intersects.forEach((intersect: any)=>{
      if (intersect.object.type === "Sprite") {
        intersect.object.onClick();
      }
    });
  }
  spriteActive: any;
  onMouseMove = (e: any) => {
    const mouse = new THREE.Vector2(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1,
    );
    this.rayCaster.setFromCamera(mouse, this.camera);
    let foundSprite = false;
    let intersects = this.rayCaster.intersectObjects(this.scene.children);

    const tooltip: HTMLElement = this.tooltip.nativeElement;
    intersects.forEach((intersect: any) => {
      if (intersect.object.type === "Sprite") {
        let p = intersect.object.position.clone().project(this.camera);
        tooltip.style.top = ((-1 * p.y + 0.85) * window.innerHeight / 2) + 'px';
        tooltip.style.left = ((p.x + 1) * window.innerWidth / 2) + 'px';
        tooltip.classList.add('is-active');
        tooltip.innerHTML = intersect.object.name;
        this.spriteActive = intersect.object;
        foundSprite = true;

      }
    });
    if (foundSprite === false && this.spriteActive) {
      tooltip.classList.remove('is-active');
      this.spriteActive = false;
    }
  }



}



