class Space {
    scene: any;
    loader: any;
    TWEEN: any;

    constructor(scene: any, loader: any, TWEEN: any) {
        this.scene = scene;
        this.loader = loader;
        this.TWEEN = TWEEN;
    }

	add(): void {
        this.loader.load('/need_some_space/scene.gltf', 
            ( gltf: any ) => {
                // called when the resource is loaded
                this.scene.add(gltf.scene);

                // Initial positions
                gltf.scene.position.z = -50; // 0 to remove from the screen
                gltf.scene.position.x = -100;
                gltf.scene.position.y = -50;
                //gltf.scene.rotation.y = 0.58;
                //gltf.scene.rotation.x = 0.1;

                // Keep the space moving
                let space_moving = new this.TWEEN.Tween(gltf.scene.position);
                    space_moving.to({ z: "-1.65" }, 1000);
                    space_moving.repeat(Infinity);
                    space_moving.start();
            },
            ( xhr: any ) => {
                // called while loading is progressing
                console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded` );
            },
            ( error: any ) => {
                // called when loading has errors
                console.error( 'An error happened', error );
            },
        );
	}
}

export default Space;