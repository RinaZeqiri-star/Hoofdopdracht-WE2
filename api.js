let dances = [];

async function fetchDances() {
	try {
		const response = await fetch(`http://localhost:3000/api`);
		console.log(response);
		if (!response.ok) {
			throw new Error("Failed to fetch dances");
		}
		const dances = await response.json();
		console.log(dances);

		Showdances(dances);
	} catch (error) {
		console.error("Error no dances no avaible:", error);
	}
}
