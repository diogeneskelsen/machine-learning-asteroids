import * as THREE from "three";

class  Debug {
	scene: any;
	camera: any;
	debug: boolean;

	constructor(scene: any, camera: any, debug: boolean) {
		this.scene = scene;
		this.camera = camera;
		this.debug = debug;

		if(this.debug == true) {
			this.run();
		}
	}
	
	run(): boolean {
		// create central cube
		let geometry = new THREE.BoxGeometry(1, 1, 1);
		let material = new THREE.MeshBasicMaterial({ color: 0x84ff, visible: this.debug });
		let cube = new THREE.Mesh(geometry, material);
		this.scene.add( cube );

		return (this.debug == true) ? true : false;
	}
}

export default Debug;