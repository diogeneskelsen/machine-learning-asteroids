function DebugDisplay(response)
{
	this.response = response;

	this.run = function()
	{
	    this.response['cube'].position.z -= 1;
	    this.response['cube'].rotation.x += 0.05;
	    this.response['cube'].rotation.y += 0.05;
	}

	this.run();

	return true;
}

export default DebugDisplay;