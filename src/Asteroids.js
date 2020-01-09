function Asteroids(scene, loader, TWEEN)
{
	this.scene = scene;
	this.loader = loader;
	this.asteroids = [];

	this.run = function()
	{
		for (let i = 0; i < 5 ; i++) 
		{
	        this.loader.load('/asteroids/3/scene.gltf', 
	            ( asteroid ) => {

		            // Initial positions
		            asteroid.scene.position.z = -100; // 0 to remove from the screen
		            asteroid.scene.position.x = Math.floor(Math.random() * (50 - -50 + 1)) + -50;
		            asteroid.scene.position.y = Math.floor(Math.random() * (50 - -50 + 1)) + -50;

		            let yx = Math.random() * (1 - -1 + 0.1) + -1;
		            	yx = (yx < 0) ? yx.toString() : "+" + yx.toString();
		            
		            console.log(yx);

	                let _asteroid_rotation_animation = new TWEEN.Tween(asteroid.scene.rotation);
	                    _asteroid_rotation_animation.to({ y: yx, x: yx }, 1000);
	                    _asteroid_rotation_animation.repeat(Infinity);
	                    _asteroid_rotation_animation.start();

					this.asteroids[i] = asteroid.scene;

		            // called when the resource is loaded
		            this.scene.add(this.asteroids[i]);
	            },
	            ( xhr ) => {
	                // called while loading is progressing
	                console.log( 'Asteroid loaded' );
	            },
	            ( error ) => {
	                // called when loading has errors
	                console.error( 'An error happened', error );
	            },
	        );
		}
	}

	this.run();

	return this.asteroids;
}

export default Asteroids;