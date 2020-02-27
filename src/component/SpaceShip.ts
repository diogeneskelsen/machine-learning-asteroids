class SpaceShip {

    _p1_intro: any;
    _p1_move: any;

    scene: any;
    loader: any;
    TWEEN: any;
    collision: any;
    controls: any;

    constructor(scene: any, loader: any, TWEEN: any, collision: any, controls: any) {
        this.scene = scene;
        this.loader = loader;
        this.TWEEN = TWEEN;
        this.collision = collision;
        this.controls = controls;
    }

	add(): void {
        this.loader.load('/ioz-501_starship/scene.gltf',
            ( gltf: any ) => {
                // called when the resource is loaded
                this.scene.add(gltf.scene);

                // Initial positions
                gltf.scene.position.z = 0; // 0 to remove from the screen
                gltf.scene.position.x = 0;
                gltf.scene.position.y = 0;
                gltf.scene.rotation.y = 1.58;
                gltf.scene.rotation.x = 0.3;
                this.controls.target = gltf.scene.position;

                // Initialize main character animation
                this._p1_intro = new this.TWEEN.Tween(gltf.scene.position);
                this._p1_intro.to({ z: -75 }, 5000)
                this._p1_intro.start();
                this._p1_intro.onComplete((object: any) => {
                        
                    // Keep the spaceship flying
                    this._p1_move = new this.TWEEN.Tween(gltf.scene.position);
                    this._p1_move.to({ z: "-1.65" }, 1000);
                    this._p1_move.repeat(Infinity);
                    this._p1_move.start();
                    this._p1_move.onRepeat((position: any) => {
                        this.collision.setPlayerPosition(position);
                        this.controls.target = position;
                    });

                    // Keep the spaceship doing an stabilization effect
                    var _p1_stabilizationUp = new this.TWEEN.Tween(gltf.scene.position);
                        _p1_stabilizationUp.to({ y: 1 }, 5000);
                        _p1_stabilizationUp.start();

                    var _p1_stabilizationDown = new this.TWEEN.Tween(gltf.scene.position);
                        _p1_stabilizationDown.to({ y: 0 }, 5000);

                    _p1_stabilizationUp.chain(_p1_stabilizationDown);
                    _p1_stabilizationDown.chain(_p1_stabilizationUp);
                });
            },
            ( xhr: any ) => {
                // called while loading is progressing
                // console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded` );
            },
            ( error: any ) => {
                // called when loading has errors
                console.error( 'An error happened', error );
            },
        );
	}
}

export default SpaceShip;