// Required imports
import React, { Component } from "react";
import * as THREE from "three";
import GLTFLoader from 'three-gltf-loader';
import TWEEN from '@tweenjs/tween.js';

// Custom imports and components
import Debug from './Debug';
import DebugDisplay from './DebugDisplay';
import Stars from './Stars';
import Asteroids from './Asteroids';
import SpaceShip from './SpaceShip';
import Collision from './Collision';

// Custom style
import './App.css';

class App extends Component {

    componentDidMount() {

        // Initialize scene + camera and renderize them!
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        
        var renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);

        this.mount.appendChild(renderer.domElement);

        // Initialize 3D objects loader
        var loader = new GLTFLoader();

        // Initialize debug mode
        let _debug = new Debug(scene, camera, false);

        // Initialize light
        let _light = new THREE.DirectionalLight(0xffffff, 3);
            _light.position.set(7, 5, 5);
        
        scene.add(_light);

        // Set default camera view
        camera.position.z = 0;
        camera.position.x = 0;
        camera.position.y = 0;

        // Initialize stars
        let _stars = new Stars(scene);

        // Initialize asteroids
        let _asteroids = new Asteroids(scene, loader, TWEEN);

        // Main player
        let _spaceship = new SpaceShip(scene, loader, TWEEN);
            _spaceship.add();
        
        // Initialize main animation
        let _mainAnimation = function() {
            requestAnimationFrame(_mainAnimation);

            // Update camera position
            camera.position.z -= 0.035; //comment to stop screen moving

            // Animation on debug mode
            if(_debug['debug'] === true) 
            {
                let _debugdisplay = new DebugDisplay(_debug);
            }

            // Add asteroids
            _asteroids.spawner(camera);

            // Stars animation
            for(let i = 0; i < _stars.length; i++){
                _stars[i].rotation.x += 0.05; 
                _stars[i].rotation.y += 0.05;
            }

            // Tween library method to update animations
            TWEEN.update();

            renderer.render(scene, camera);
        };

        _mainAnimation();
    }

    // Renderize React component
    render() {
        return <div ref={ref => (this.mount = ref)} />;
    }
}

export default App;
