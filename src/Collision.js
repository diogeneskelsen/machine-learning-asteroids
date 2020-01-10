function Collision()
{
    this.asteroids = [];
    this.characterPosition = [];

	this.data = function()
	{
        for(let index in this.asteroids)
        {
            let z = this.characterPosition.z - this.asteroids[index].z;

            if(z < 50) 
            {
                //console.log("Distance " + z + " S:" + this.characterPosition.z + " A: " + this.asteroids[index].z);
            }

            //console.log("Asteroid: " + this.asteroids[index].z);

        }
        
        //console.log("Character: " + this.characterPosition.z);
	}

    this.setAsteroidPosition = function(id, position)
    {
        this.asteroids[id] = position;
    }

    this.setCharacterPosition = function(position)
    {
        this.characterPosition = position;
    }

    this.getCharacterPosition = function()
    {
        return this.characterPosition;
    }
}

export default Collision;