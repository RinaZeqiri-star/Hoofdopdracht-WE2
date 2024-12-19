let dances = []; // Global storage for dance data

// Fetch dance data from the API
async function fetchDances() {
	try {
		const response = await fetch("http://localhost:3000/api");
		if (!response.ok) throw new Error("Failed to fetch dances");
		dances = await response.json();
		console.log(dances);
		setupMapPoints(); // Set up event listeners after fetching data
	} catch (error) {
		console.error("Error fetching dances:", error);
	}
}

// Filter dances based on the selected region
function getDancesForRegion(region) {
	const normalizedRegion = region.toLowerCase().trim();
	return dances.filter((dance) => dance.region.toLowerCase().trim() === normalizedRegion);
}

// Display dances for the clicked region
function showDancesForRegion(button, region) {
	const contentDiv = button.querySelector(".content");
	const existingContent = contentDiv.querySelector(".dance-details");

	if (existingContent) {
		// Remove existing dance details
		contentDiv.removeChild(existingContent);
		return;
	}

	// Remove dance details from other buttons
	document.querySelectorAll(".dance-details").forEach((el) => el.remove());

	const filteredDances = getDancesForRegion(region);
	const details = document.createElement("div");
	details.className = "dance-details";

	// Add the image if available for the region
	const regionData = dances.find((dance) => dance.region.toLowerCase().trim() === region.toLowerCase().trim());
	if (regionData && regionData.img) {
		const image = document.createElement("img");
		image.src = regionData.img;
		image.alt = `${region} Image`;
		image.className = "region-image"; // Optionally add a class for styling
		image.style.width = "200px";
		image.style.height = "auto";
		details.appendChild(image);
	}

	if (filteredDances.length === 0) {
		details.innerHTML += `<p>No dances available for ${region}.</p>`;
	} else {
		filteredDances.forEach((dance) => {
			const danceDetail = document.createElement("p");
			danceDetail.innerHTML = `<strong>${dance.dancename}:</strong> ${dance.story}`;
			details.appendChild(danceDetail);
		});
	}

	contentDiv.appendChild(details);
}

// Setup event listeners on map buttons
function setupMapPoints() {
	document.querySelectorAll(".map-point").forEach((button) => {
		const region = button.querySelector("h2").innerText;
		button.addEventListener("click", () => showDancesForRegion(button, region));
	});
}

// Fetch dance data when the script is loaded
fetchDances();
