// Required imports
import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import TWEEN from '@tweenjs/tween.js';

// Custom imports
import Debug from './component/Debug.ts';
import DebugDisplay from './component/DebugDisplay.ts';
import Space from './component/Space.ts';
import Asteroids from './component/Asteroids.ts';
import SpaceShip from './component/SpaceShip.ts';
import Collision from './component/Collision.ts';

// Custom style
import './App.css';

class App extends Component {

    componentDidMount() {

        // Initialize scene + camera and renderize them!
        // Set default camera view
        var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 0;
            camera.position.x = 0;
            camera.position.y = 0;

        var renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);

        var controls = new OrbitControls( camera, renderer.domElement );
            controls.update();
        
        // Initialize light
        var _light = new THREE.DirectionalLight(0xffffff, 3);
            _light.position.set(7, 5, 5);
        
        var scene = new THREE.Scene();
            scene.add(_light);

        // Initialize 3D objects loader
        var loader = new GLTFLoader();

        // Collision
        var _collision = new Collision();

        // Initialize debug mode
        let _debug = new Debug(scene, camera, false);

        // Initialize space
        let _space = new Space(scene, loader, TWEEN);
            _space.add();

        // Initialize asteroids
        let _asteroids = new Asteroids(scene, loader, TWEEN, _collision);

        // Main player
        let _spaceship = new SpaceShip(scene, loader, TWEEN, _collision, controls);
            _spaceship.add();
            
        this.mount.appendChild(renderer.domElement);
        
        // Initialize main animation
        let _mainAnimation = function() {
            requestAnimationFrame(_mainAnimation);

            // Animation on debug mode
            if(_debug['debug'] === true) 
            {
                let _debugdisplay = new DebugDisplay(_debug);
            }

            // Update camera position
            // comment to stop screen moving
            camera.position.z -= 0.035; 
            controls.update();

            // Add asteroids
            _asteroids.spawner(camera);

            // Tween library method to update animations
            TWEEN.update();

            _collision.data();

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
