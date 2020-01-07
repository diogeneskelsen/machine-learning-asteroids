import * as THREE from "three";

function Stars(scene)
{
	this.scene = scene;
	this.stars = [];
	
	this.run = function() 
	{
		let geometry = new THREE.BoxGeometry(1, 1, 1);
		let material = new THREE.MeshLambertMaterial({color: 0xffffff});

		for (let i = 0; i < 10000 ; i++) 
		{
			let rx = Math.random() * 2000 - 1000;
			let ry = Math.random() * 1000 - 500;
			let rz = Math.random() * 10000 - 5000;
			
			this.stars[i] = new THREE.Mesh(geometry, material);

			this.stars[i].position.x = rx;
			this.stars[i].position.y = ry;
			this.stars[i].position.z = rz;

			this.scene.add(this.stars[i]);
		}
	}

	this.run();

	return this.stars;
}

export default Stars;