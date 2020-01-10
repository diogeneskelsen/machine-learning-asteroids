function Asteroids(scene, loader, TWEEN, _collision)
{
	this.asteroids = [];
	this.tweenIds = [];
	this.timer = 100; // first asteroid wait time to be added

	this.create = function(camera)
	{
        loader.load('/asteroids/3/scene.gltf', 
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
                    _asteroid_rotation_animation.onRepeat(function(position) {
                    	position.z = asteroid.scene.position.z;
                        _collision.setAsteroidPosition(_asteroid_rotation_animation._id, position);
                    });

                this.tweenIds[asteroid.scene.uuid] = _asteroid_rotation_animation;
				this.asteroids[asteroid.scene.uuid] = asteroid.scene;

	            // called when the resource is loaded
	            scene.add(this.asteroids[asteroid.scene.uuid]);

		        // Unload asteroids outside of the screen
		        for (let key in this.asteroids)
		        {
		        	if(this.asteroids[key] !== undefined) 
		        	{
			        	if(camera.position.z < this.asteroids[key].position.z) 
			        	{
			        		// Remove from scene
							scene.remove(this.asteroids[key]);
							// Remove from tween
							TWEEN.remove(this.tweenIds[key]);

							// Remove from arrays
							this.asteroids = this.asteroids.filter(item => item !== key);
							this.tweenIds = this.tweenIds.filter(item => item !== key);
			        	}
		        	}

		        }
            },
            ( xhr ) => {
                // called while loading is progressing
                // console.log( 'Asteroid loaded');
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

	this.spawner = function(camera)
	{
        this.setTimer(this.getTimer() - 1);
        
        if(this.getTimer() <= 0) 
        {
            this.add(camera);
            this.setTimer();
        }
	}
}

export default Asteroids;