import * as THREE from "three";

function Debug(scene, camera, debug)
{
	this.scene = scene;
	this.camera = camera;
	this.debug = debug;
	this.response = [];
	
	this.run = function() 
	{
		// create central cube
		let geometry = new THREE.BoxGeometry(1, 1, 1);
		let material = new THREE.MeshBasicMaterial({ color: 0x84ff, visible: this.debug });
		let cube = new THREE.Mesh(geometry, material);
		this.scene.add( cube );

		// Generate response
		this.response['debug'] = this.debug;
		this.response['cube'] = cube;

		return this.response;
	}

	if(debug === true)
	{
		return this.run();
	}

	return true;
}

export default Debug;