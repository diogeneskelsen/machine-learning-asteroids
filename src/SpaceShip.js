function SpaceShip(scene, loader, TWEEN, _collision)
{
    this._p1_intro = [];
    this._p1_move = [];

	this.add = function()
	{
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
                this._p1_intro = new TWEEN.Tween(gltf.scene.position);
                this._p1_intro.to({ z: -75 }, 5000)
                this._p1_intro.start();
                this._p1_intro.onComplete(function(object) {
                        
                    // Keep the spaceship flying
                    this._p1_move = new TWEEN.Tween(gltf.scene.position);
                    this._p1_move.to({ z: "-1.65" }, 1000);
                    this._p1_move.repeat(Infinity);
                    this._p1_move.start();
                    this._p1_move.onRepeat(function(position) {
                        _collision.setCharacterPosition(position);
                    });

                    // Keep the spaceship doing an stabilization effect
                    var _p1_stabilizationUp = new TWEEN.Tween(gltf.scene.position);
                        _p1_stabilizationUp.to({ y: 1 }, 5000);
                        _p1_stabilizationUp.start();

                    var _p1_stabilizationDown = new TWEEN.Tween(gltf.scene.position);
                        _p1_stabilizationDown.to({ y: 0 }, 5000);

                    _p1_stabilizationUp.chain(_p1_stabilizationDown);
                    _p1_stabilizationDown.chain(_p1_stabilizationUp);
                });
            },
            ( xhr ) => {
                // called while loading is progressing
                // console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded` );
            },
            ( error ) => {
                // called when loading has errors
                console.error( 'An error happened', error );
            },
        );
	}
}

export default SpaceShip;