import { Panocontrol } from './../models/hotpost';
import TweenLite from "gsap";
import * as THREE from 'three/src/Three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { OrbitControls } from '@three-ts/orbit-controls';
import { ElementRef } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor() { }
  ngAfterViewInit(): void { }



  ngOnInit(): void {
  }


}
