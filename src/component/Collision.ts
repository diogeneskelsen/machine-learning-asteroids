class Collision {
    asteroids: any;
    player: any;

	data(): void {
        for(let index in this.asteroids) {
            let z = this.player.z - this.asteroids[index].z;

            if(z < 50) {
                //console.log("Distance " + z + " S:" + this.characterPosition.z + " A: " + this.asteroids[index].z);
            }

            //console.log("Asteroid: " + this.asteroids[index].z);

        }
        
        //console.log("Character: " + this.characterPosition.z);
	}

    setAsteroidPositionn(id: any, position: any): void {
        this.asteroids[id] = position;
    }

    setPlayerPosition(position: any): void {
        this.player = position;
    }

    getPlayerPosition(): any {
        return this.player;
    }
}

export default Collision;