function Collision()
{
    this.asteroids = [];
    this.characterPosition = [];

    this.intersect = function(character, other)
    {
        // we are using multiplications because it's faster than calling Math.pow
        var distance = Math.sqrt((character.x - other.x) * (character.x - other.x) +
                                (character.y - other.y) * (character.y - other.y) +
                                (character.z - other.z) * (character.z - other.z));

        //console.log(distance);

        return distance < (character.radius + other.radius);
    }

	this.data = function()
	{
        for(let index in this.asteroids)
        {
            //let p0 = this.characterPosition.z - this.asteroids[index].z;

            let p0 = this.characterPosition;
                p0.radius = 6;

            let p1 = this.asteroids[index];
                p1.radius = 5;

            console.log(this.intersect(p0, p1));

            // d = (x1-x0)^2 + (y1-y0)^2 + (z1-z0)^2
            //let d = Math.sqrt(((p1.x - p0.x)^2 + (p1.y - p0.y)^2 + (p1.z - p0.z)^2));
            /*let d = Math.sqrt(((Number(p1.x) - Number(p0.x))*2 + (Number(p1.y) - Number(p0.y))*2 + (Number(p1.z) - Number(p0.z))*2));

            if(d === 0)
            {
                console.log("Colisao: d = " + d);
                console.log("((" + p1.x + " - " + p0.x + ")^2 + (" + p1.y + " - " + p0.y + ")^2 + (" + p1.z + " - " + p0.z + ")^2)");
            }
            else if(d === 360)
            {
                console.log("Intercessao d: " + d);
            }
            else if(d < 360)
            {
                console.log("Externo d: " + d);
            }
            else 
            {
                //console.log("Error calculating collision");
                //console.log(d);
            }*/

            //if(z < 50) 
            //{
                //console.log("Distance " + z + " S:" + this.characterPosition.z + " A: " + this.asteroids[index].z);
            //}

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