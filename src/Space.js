function Space(scene, loader, TWEEN)
{
	this.add = function()
	{
        loader.load('/need_some_space/scene.gltf', 
            ( gltf ) => {
                // called when the resource is loaded
                scene.add(gltf.scene);

                // Initial positions
                gltf.scene.position.z = -50; // 0 to remove from the screen
                gltf.scene.position.x = -100;
                gltf.scene.position.y = -50;
                //gltf.scene.rotation.y = 0.58;
                //gltf.scene.rotation.x = 0.1;
            },
            ( xhr ) => {
                // called while loading is progressing
                console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded` );
            },
            ( error ) => {
                // called when loading has errors
                console.error( 'An error happened', error );
            },
        );
	}
}

export default Space;