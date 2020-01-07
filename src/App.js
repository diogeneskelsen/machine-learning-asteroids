import React, { Component } from "react";
import './App.css';

import * as THREE from "three";
import GLTFLoader from 'three-gltf-loader';

class App extends Component {
  
  componentDidMount() {
    
    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
    
    this.mount.appendChild(renderer.domElement);

    //camera.position.z = 50;

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x84ff, visible: false } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    var directionalLight = new THREE.DirectionalLight(0xffffff,3);
    directionalLight.position.set(7,5,5);
    scene.add(directionalLight);

    camera.position.z = 20;
    camera.position.x = 0;
    camera.position.y = 0;

    var stars = [];
    var geometry5 = new THREE.BoxGeometry(1,1,1);
    var material5 = new THREE.MeshLambertMaterial({color: 0xffffff});

    for (var i = 0; i < 10000 ; i++) {
     var rx = Math.random()*2000-1000;
     var ry = Math.random()*1000-500;
     var rz = Math.random()*10000-5000;
     stars[i] = new THREE.Mesh(geometry5,material5);

     stars[i].position.x = rx;
     stars[i].position.y = ry;
     stars[i].position.z = rz;
     scene.add(stars[i]);
    };

    var animate = function() {
      requestAnimationFrame(animate);

      camera.position.z -= 1;
      cube.position.z -= 1; // same speed

      cube.rotation.x += 0.05;
      cube.rotation.y += 0.05;

      
      for(var i = 0; i < stars.length; i++){
        stars[i].rotation.x += 0.05; 
        stars[i].rotation.y += 0.05;
      }

      renderer.render(scene, camera);
    };

    const loader = new GLTFLoader();

    loader.load(
        '/ioz-501_starship/scene.gltf',
        ( gltf ) => {
            // called when the resource is loaded
            scene.add( gltf.scene );

            gltf.scene.position.z = 0; // remove from the screen

            gltf.scene.position.x = 0;
            gltf.scene.position.y = 0;

            gltf.scene.rotation.y = 1.58;
            gltf.scene.rotation.x = 0.3;

            var stabilization = false;

            var animate2 = function() {
              requestAnimationFrame(animate2);
              if(gltf.scene.position.z > -300) { // distance from the camera
                gltf.scene.position.z -= 1.5;
              } else {
                gltf.scene.position.z -= 1;
              }

              if(stabilization === false) {
                gltf.scene.position.y += 0.01;
              } 

              if(gltf.scene.position.y > 1.00) {
                stabilization = true;
              }

              if(stabilization === true) {
                gltf.scene.position.y -= 0.01;
              }

              if(gltf.scene.position.y < 0.00) {
                stabilization = false;
              }

              renderer.render(scene, camera);
            };

            console.log("loading done!");

            var zSpeed = 0.9;
            var xSpeed = 0.9;
            var ySpeed = 0.9;

            document.addEventListener('keydown', event => {
                if(event.key === 'ArrowUp'){
                  gltf.scene.position.y += ySpeed;
                  ySpeed += 0.055;
                }
                if(event.key === 'ArrowLeft'){
                  if(gltf.scene.rotation.y < 1.78) {
                    gltf.scene.rotation.y += 0.005;
                  }

                  gltf.scene.position.x -= xSpeed;
                  
                  xSpeed += 0.055;
                }
                if(event.key === 'ArrowRight'){
                  if(gltf.scene.rotation.y > 1.38) {
                    gltf.scene.rotation.y -= 0.005;
                  }

                  gltf.scene.position.x += xSpeed;

                  xSpeed += 0.055;
                }
                if(event.key === 'ArrowDown'){
                  gltf.scene.position.y -= ySpeed;
                  ySpeed += 0.055;
                }
                if(event.key === 'w'){
                  gltf.scene.position.z -= zSpeed;
                  zSpeed += 0.055;
                }
                if(event.key === 's'){
                  gltf.scene.position.z += zSpeed;
                  zSpeed += 0.055;
                }
            })

            document.addEventListener('keyup', event => {
                if(event.key === 'ArrowUp'){
                  ySpeed = 0.9;
                }
                if(event.key === 'ArrowLeft'){
                  gltf.scene.rotation.y = 1.58;
                }
                if(event.key === 'ArrowRight'){
                  gltf.scene.rotation.y = 1.58;
                }
                if(event.key === 'ArrowDown'){
                  ySpeed = 0.9;
                }
                if(event.key === 'w'){
                  zSpeed = 0.9;
                }
                if(event.key === 's'){
                  zSpeed = 0.9;
                }
            })

            animate2();
        },
        ( xhr ) => {
            // called while loading is progressing
            console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded` );
        },
        ( error ) => {
            // called when loading has errors
            console.error( 'An error happened', error );
        },
    );


    animate();
  }

  render() {
    return <div ref={ref => (this.mount = ref)} />;
  }
}

export default App;
