import * as THREE from "three";

function Light(scene)
{
	this.scene = scene;
	
	this.run = function() 
	{
		let directionalLight = new THREE.DirectionalLight(0xffffff, 3);
			directionalLight.position.set(7, 5, 5);
		
		this.scene.add(directionalLight);
	}

	this.run();

	return true;
}

export default Light;