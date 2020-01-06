import React, { Component } from "react";
import './App.css';
import * as THREE from "three";

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

    camera.position.z = 50;

    //var innerRadius = 21.9;
    //var outerRadius = 22;
    //var segments = 100;
    var geometry3, material3, circle;


for (var i = 2; i < 22; i++) {
      geometry3 = new THREE.RingBufferGeometry((i-0.1), i, 100);
      material3 = new THREE.MeshBasicMaterial( { color: 0x42ff00 } );
      circle = new THREE.Mesh( geometry3, material3 );
      scene.add(circle);
      i = i + 2;
}

    //for (var i = 10; i <= 22; (i+2)) {
      //console.log(i);
      /**/
    //}

    var animate = function() {
      requestAnimationFrame(animate);

      //cube.rotation.x += 0.01;
      //cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();
  }

  render() {
    return <div ref={ref => (this.mount = ref)} />;
  }
}

export default App;
