// Required imports
import React, { Component } from "react";
import * as THREE from "three";
import GLTFLoader from 'three-gltf-loader';
import TWEEN from '@tweenjs/tween.js';

// Custom imports and components
import Debug from './Debug';
import DebugDisplay from './DebugDisplay';
import Stars from './Stars';
import Light from './Light';
import Asteroids from './Asteroids';

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
        camera.position.z = 0;
        camera.position.x = 0;
        camera.position.y = 0;

        // Initialize stars
        let _stars = new Stars(scene);

        // Initialize asteroids
        setTimeout(() => {
          let _asteroids = new Asteroids(scene, loader, TWEEN);
          console.log("more 10 asteroids were added");
        }, 10000);
        
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



            TWEEN.update();

            // Stars animation
            for(let i = 0; i < _stars.length; i++){
                _stars[i].rotation.x += 0.05; 
                _stars[i].rotation.y += 0.05;
            }

            renderer.render(scene, camera);
        };

        _mainAnimation();

        // Main player
        loader.load('/ioz-501_starship/scene.gltf', 
            ( gltf ) => {
                // called when the resource is loaded
                scene.add(gltf.scene);

                // Initial positions
                gltf.scene.position.z = 0; // 0 to remove from the screen
                gltf.scene.position.x = 0;
                gltf.scene.position.y = 0;
                gltf.scene.rotation.y = 1.58;
                gltf.scene.rotation.x = 0.3;

                // Initialize main character animation
                var _p1_intro = new TWEEN.Tween(gltf.scene.position);
                    _p1_intro.to({ z: -75 }, 5000)
                    _p1_intro.start();
                    _p1_intro.onComplete(function(object) {
                        
                        // Keep the spaceship flying
                        var _p1_move = new TWEEN.Tween(gltf.scene.position);
                            _p1_move.to({ z: "-1.75" }, 1000);
                            _p1_move.repeat(Infinity);
                            _p1_move.start();

                        // Keep the spaceship doing an stabilization effect
                        var _p1_stabilizationUp = new TWEEN.Tween(gltf.scene.position);
                            _p1_stabilizationUp.to({ y: 1 }, 5000);
                            _p1_stabilizationUp.start();

                        var _p1_stabilizationDown = new TWEEN.Tween(gltf.scene.position);
                            _p1_stabilizationDown.to({ y: 0 }, 5000);

                        _p1_stabilizationUp.chain(_p1_stabilizationDown);
                        _p1_stabilizationDown.chain(_p1_stabilizationUp);
                    });

                /*var xPosition = 0.9;
                var xSpeed = 0;
                var direction = "stop";

                let _updateAnimation = function() {
                    requestAnimationFrame(_updateAnimation);
                    switch(direction)
                    {
                        case "left":
                            if(gltf.scene.position.x > -25) {
                                gltf.scene.position.x -= 0.5;
                                gltf.scene.position.y -= 0.5;
                            }
                            else 
                            {
                                xSpeed = 0;
                                gltf.scene.position.x = -25;
                            }
                        break;
                        case "right":
                            if(gltf.scene.position.x < 25) {
                                gltf.scene.position.x += 0.5;
                                gltf.scene.position.y += 0.5;
                            }
                            else 
                            {
                                xSpeed = 0;
                                gltf.scene.position.x = 25;
                            }
                        break;
                        default:
                            //stop
                        break;
                    }

                    renderer.render(scene, camera);
                };

                    var zSpeed = 0.009;
                    var ySpeed = 0.9;*/

                    /*document.addEventListener('keydown', event => {
                        if(event.key === 'ArrowUp'){
                            gltf.scene.position.y += ySpeed;
                            ySpeed += 0.055;
                        }
                        if(event.key === 'ArrowLeft'){
                            //console.log(gltf.scene.position.x);
                            //console.log(gltf.scene);
                            //xSpeed += 0.1;
                            //direction = "left";
                            //_updateAnimation();

                            var tween = new TWEEN.Tween(gltf.scene.position)
                                    .to({ x: 100, y: 100, z: 100 }, 10000)
                                    .start();

                            //gltf.scene.position.x -= 5;

                            if(gltf.scene.rotation.y < 1.78) {
                                gltf.scene.rotation.y += 0.005;
                            }

                            gltf.scene.position.x -= xSpeed;
                            xSpeed += 0.055;
                        }
                        if(event.key === 'ArrowRight'){
                            //xSpeed += 0.1;
                            direction = "right";
                            _updateAnimation();

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
                    });*/

                    /*document.addEventListener('keyup', event => {
                        
                        //direction = "stop";
                        //_updateAnimation();

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
                    });*/                
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
