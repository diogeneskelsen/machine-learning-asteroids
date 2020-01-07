// Required imports
import React, { Component } from "react";
import * as THREE from "three";
import GLTFLoader from 'three-gltf-loader';

// Custom imports and components
import Debug from './Debug';
import DebugDisplay from './DebugDisplay';
import Stars from './Stars';
import Light from './Light';

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
        let _light = new Light(scene);

        // Set default camera view
        camera.position.z = 20;
        camera.position.x = 0;
        camera.position.y = 0;

        // Initialize stars
        let _stars = new Stars(scene);

        // Initialize main animation
        let _universeAnimation = function() {
            requestAnimationFrame(_universeAnimation);

            // Update camera position
            camera.position.z -= 1;

            // Animation on debug mode
            if(_debug['debug'] === true) 
            {
                let _debugdisplay = new DebugDisplay(_debug);
            }
            
            // Stars animation
            for(let i = 0; i < _stars.length; i++){
                _stars[i].rotation.x += 0.05; 
                _stars[i].rotation.y += 0.05;
            }

            renderer.render(scene, camera);
        };

        _universeAnimation();

        // Main player
        loader.load('/ioz-501_starship/scene.gltf', 
            ( gltf ) => {
                // called when the resource is loaded
                scene.add(gltf.scene);

                // Initial positions
                gltf.scene.position.z = 0; // remove from the screen
                gltf.scene.position.x = 0;
                gltf.scene.position.y = 0;
                gltf.scene.rotation.y = 1.58;
                gltf.scene.rotation.x = 0.3;
                
                // Initialize main animation
                let _playerAnimation = function() {
                    requestAnimationFrame(_playerAnimation);

                    var stabilization = false;

                    if(gltf.scene.position.z > -100) { // distance from the camera
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

                    var zSpeed = 0.009;
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
                            zSpeed += 0.001;
                        }
                        if(event.key === 's'){
                            gltf.scene.position.z += zSpeed;
                            zSpeed += 0.001;
                        }
                    });

                    document.addEventListener('keyup', event => {
                        if(event.key === 'ArrowUp')
                        {
                            ySpeed = 0.9;
                        }
                        if(event.key === 'ArrowLeft')
                        {
                            gltf.scene.rotation.y = 1.58;
                        }
                        if(event.key === 'ArrowRight')
                        {
                            gltf.scene.rotation.y = 1.58;
                        }
                        if(event.key === 'ArrowDown')
                        {
                            ySpeed = 0.9;
                        }
                        if(event.key === 'w')
                        {
                            zSpeed = 0.009;
                        }
                        if(event.key === 's')
                        {
                            zSpeed = 0.009;
                        }
                    });

                    renderer.render(scene, camera);
                };

                _playerAnimation();
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
    }

    // Renderize React component
    render() {
        return <div ref={ref => (this.mount = ref)} />;
    }
}

export default App;
