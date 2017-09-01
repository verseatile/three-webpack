import * as THREE from 'three';
//import {cube, geometry, green, dark, light, frame} from './Materials';
//globals
import {
  WebGLRenderer,
  AmbientLight,
  PointLight,
  Scene,
  PerspectiveCamera,
  MeshBasicMaterial,
  MeshLambertMaterial,
  Geometry,
  BoxGeometry,
  Face3,
  Mesh,
  Points,
  PointsMaterial,
  Vector3,
  FogExp2
} from 'three';

// the renderer
const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
//sets color of the world
renderer.setClearColor( 0x3b3b3b );
// add renderer to browser
document.body.appendChild( renderer.domElement );

//VR
//const controls = new DeviceOrientationControls( camera )

//---------------------LIGHTS--------------------------->>>
let light = new AmbientLight( 0x404040, 0.5 );
let point = new PointLight( 0xffffff, 0.5 );


//---------------------SCENE--------------------------->>>
const scene = new Scene();

// the camera
const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.x = 0;
camera.position.z = 5;

//-------------------------------MATERIALS------------------>>>>
let green = new MeshBasicMaterial( { color: 0x00ff00 } );
let dark = new MeshBasicMaterial( { color: 0x333333 } );
let lightish = new MeshBasicMaterial( { color: 0xEEEEEE } );
let frame = new MeshBasicMaterial({
  color: 0x4F4F4F,
  transparent: true,
  wireframe: true
});
let reflect = new MeshLambertMaterial({ color: 0xF3FFE2 })

//---------------------GEOMETRY--------------------------->>>
let geometry = new BoxGeometry( 1, 1, 1 );

// Test creating a triangle
let tri = new Geometry();
tri.vertices.push(
  new Vector3(-10, 10, 0),
  new Vector3(-10, -10, 0),
  new Vector3(10, -10, 0)
)
tri.faces.push( new Face3(0, 1, 2) );


//-------------------------------MESHES------------------>>>>



let cube = new Mesh( geometry, reflect );
//let jawn = new Mesh( plane, green );

cube.position.x = -5


// --------- TEST ---->

// create the particle variables
var particleCount = 1800,
    particles = new Geometry(),
    pMaterial = new PointsMaterial({
      color: 0xFFFFFF,
      size: 0.7
    });

// now create the individual particles
for ( var p = 0; p < particleCount; p++ ) {

  // create a particle with random
  // position values, -250 -> 250
  var pX = Math.random() * 500 - 250,
      pY = Math.random() * 500 - 250,
      pZ = Math.random() * 500 - 250,
      particle = new Vector3(pX, pY, pZ);
  // add it to the geometry
  particles.vertices.push(particle);

}

// create the particle system
var particleSystem = new Points(
    particles,
    pMaterial);

// add it to the scene
scene.add( particleSystem );
// need to fix fox....currently only affecting moving object
scene.fog = new FogExp2( 0xffffff, 0.1 );


particleSystem.position.y = 400;

let cubeCount = 8;
let cubeStore = [];
// now create the individual particles
for ( var i = 0; i < cubeCount; i++ ) {

  // create a particle with random
  // position values, -250 -> 250
    let obj = new Mesh( geometry, reflect );
    cubeStore.push(obj);
    obj.position.x = Math.random() * 15 - 10;
    obj.position.y = 0;
    //add object to the scene
    scene.add(obj);
}

// -------------------SCENE ADD/PUT THANGS TOGETHER ------------------->>>>>
//add cube to the scene
scene.add( light, point );
scene.add( cube );

//start
init()

//---------------------INIT--------------------------->>>
function init() {

  render();

}


//---------------------RENDER--------------------------->>>


// function to render the scene
function render() {

  requestAnimationFrame( render );
  animate();


  //renders
  renderer.render( scene, camera );

}

// ---------- ANIMATION --->
function animate() {

  cube.rotation.x += 0.005;
  cube.rotation.y += 0.001;
  cube.position.x += 0.05;
  //cube.scale.x -= 0.03;
    //obj.position.x += 0.5;

  cubeStore.forEach(function(obj) {
    obj.position.x += 0.07;
    obj.rotation.x += 0.008;
    obj.rotation.y += 0.004;

    if ( obj.position.x >= 4.5 ) {

        obj.position.x = -5;

    }

  })

  if ( cube.position.x >= 4.5 ) {

    cube.position.x = -5;

  }

    //animate particles
  if (particleSystem.position.y > -150) {

    particleSystem.position.y -= 0.7;

  }

  else {

    particleSystem.position.y = 350;

  }


};
// WIP


// call it
//render();
