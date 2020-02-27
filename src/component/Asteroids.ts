class Asteroids
{
	asteroids: any = [];
	tweenIds: any = [];
	timer: number = 100; // first asteroid wait time to be added
	collision: any;
	scene: any;
	loader: any;
	TWEEN: any;

	constructor(scene: any, loader: any, TWEEN: any, collision: any) {
		this.scene = scene;
		this.loader = loader;
		this.TWEEN = TWEEN;
		this.collision = collision;
	}

	create(camera: any): void {
        this.loader.load('/asteroids/3/scene.gltf', 
            ( asteroid: any ) => {

	            // Initial positions
	            asteroid.scene.position.z = (camera.position.z + -150); // 0 to remove from the screen
	            asteroid.scene.position.x = Math.floor(Math.random() * (50 - -50 + 1)) + -50;
	            asteroid.scene.position.y = Math.floor(Math.random() * (50 - -50 + 1)) + -50;

	            let yx: any = Math.random() * (1 - -1 + 0.1) + -1;
	            	yx = (yx < 0) ? yx.toString() : "+" + yx.toString();
	            
                let _asteroid_rotation_animation = new this.TWEEN.Tween(asteroid.scene.rotation);
                    _asteroid_rotation_animation.to({ y: yx, x: yx }, 1000);
                    _asteroid_rotation_animation.repeat(Infinity);
                    _asteroid_rotation_animation.start();
                    _asteroid_rotation_animation.onRepeat(function(position: any) {
                    	position.z = asteroid.scene.position.z;
                        //this.collision.setAsteroidPosition(_asteroid_rotation_animation._id, position);
                    });

                this.tweenIds[asteroid.scene.uuid] = _asteroid_rotation_animation;
				this.asteroids[asteroid.scene.uuid] = asteroid.scene;

	            // called when the resource is loaded
	            this.scene.add(this.asteroids[asteroid.scene.uuid]);

		        // Unload asteroids outside of the screen
		        for (let key in this.asteroids)
		        {
		        	if(this.asteroids[key] !== undefined) 
		        	{
			        	if(camera.position.z < this.asteroids[key].position.z) 
			        	{
			        		// Remove from scene
							this.scene.remove(this.asteroids[key]);
							// Remove from tween
							this.TWEEN.remove(this.tweenIds[key]);

							// Remove from arrays
							this.asteroids = this.asteroids.filter((item: any) => item !== key);
							this.tweenIds = this.tweenIds.filter((item: any) => item !== key);
			        	}
		        	}

		        }
            },
            ( xhr: any ) => {
                // called while loading is progressing
                // console.log( 'Asteroid loaded');
            },
            ( error: any ) => {
                // called when loading has errors
                console.error( 'An error happened', error );
            },
        );
	}

	add(camera: any): void {
		this.create(camera);
	}

	group(): any {
		return this.asteroids;
	}

	getTimer(): any {
		return this.timer;
	}

	setTimer(timer = 200): void {
		this.timer = timer;
	}

	spawner(camera: any): void {
        this.setTimer(this.getTimer() - 1);
        
        if(this.getTimer() <= 0) 
        {
            this.add(camera);
            this.setTimer();
        }
	}
}

export default Asteroids;