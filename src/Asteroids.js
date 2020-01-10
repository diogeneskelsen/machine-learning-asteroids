function Asteroids(scene, loader, TWEEN)
{
	this.scene = scene;
	this.loader = loader;
	this.asteroids = [];
	this.timer = 200;

	this.create = function(camera)
	{
		let i = this.asteroids.length + 1;

        this.loader.load('/asteroids/3/scene.gltf', 
            ( asteroid ) => {

	            // Initial positions
	            asteroid.scene.position.z = (camera.position.z + -150); // 0 to remove from the screen
	            asteroid.scene.position.x = Math.floor(Math.random() * (50 - -50 + 1)) + -50;
	            asteroid.scene.position.y = Math.floor(Math.random() * (50 - -50 + 1)) + -50;

	            let yx = Math.random() * (1 - -1 + 0.1) + -1;
	            	yx = (yx < 0) ? yx.toString() : "+" + yx.toString();
	            
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
                console.log( 'Asteroid #' + i + ' was loaded' );
            },
            ( error ) => {
                // called when loading has errors
                console.error( 'An error happened', error );
            },
        );
	}

	this.add = function(camera)
	{
		this.create(camera);
	}

	this.group = function()
	{
		return this.asteroids;
	}

	this.getTimer = function()
	{
		return this.timer;
	}

	this.setTimer = function(timer = 200)
	{
		this.timer = timer;
	}
}

export default Asteroids;