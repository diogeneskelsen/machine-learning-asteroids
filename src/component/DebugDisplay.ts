class DebugDisplay
{
	response: any;

	constructor(response: any) {
		this.response = response;

		this.run();
	}

	run(): boolean {
	    this.response['cube'].position.z -= 1;
	    this.response['cube'].rotation.x += 0.05;
	    this.response['cube'].rotation.y += 0.05;

		return true;
	}
}

export default DebugDisplay;