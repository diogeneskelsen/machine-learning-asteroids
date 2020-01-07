import React, { Component } from "react";
import './App.css';
import * as THREE from "three";

class App extends Component {
  
  componentDidMount() {
    
    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
    
    this.mount.appendChild(renderer.domElement);

    camera.position.z = 50;

    /*var geometry3, material3, circle;

    for (var i = 2; i < 50; i++) {
          geometry3 = new THREE.RingBufferGeometry((i-0.1), i, 100);
          material3 = new THREE.MeshBasicMaterial( { color: 0x42ff00 } );
          circle = new THREE.Mesh( geometry3, material3 );
          //scene.add(circle);
          i = i + 2;
    }*/

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x84ff } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

var directionalLight = new THREE.DirectionalLight(0xffffff,1);
directionalLight.position.set(7,5,-5);
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

      //cube.rotation.x += 0.01;
      //cube.rotation.y += 0.01;
      
      function timeout() {
          setTimeout(function () {
              // Do Something Here
              // Then recall the parent function to
              // create a recursive loop.

              //cube.position.set((cube.position.x+0.001), (cube.position.y+0.001), (cube.position.z+0.001));
              
              timeout();
          }, 10);
      }

      timeout();

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



    animate();
  }

  render() {
    return <div ref={ref => (this.mount = ref)} />;
  }
}

export default App;
