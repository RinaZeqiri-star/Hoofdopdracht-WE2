let dances = []; // Global storage for dance data

// Fetch dance data from the API
async function fetchDances() {
	try {
		const response = await fetch("https://web2-course-project-back-end-rinazeqiri.onrender.com/api");
		if (!response.ok) throw new Error("Failed to fetch dances");
		dances = await response.json();
		console.log(dances);
		setupMapPoints();
	} catch (error) {
		console.error("Error fetching dances:", error);
	}
}

function getDancesForRegion(region) {
	const normalizedRegion = region.toLowerCase().trim();
	return dances.filter((dance) => dance.region.toLowerCase().trim() === normalizedRegion);
}

function showDancesForRegion(button, region) {
	const contentDiv = button.querySelector(".content");
	const existingContent = contentDiv.querySelector(".dance-details");

	if (existingContent) {
		contentDiv.removeChild(existingContent);
		return;
	}

	document.querySelectorAll(".dance-details").forEach((el) => el.remove());

	const filteredDances = getDancesForRegion(region);
	const details = document.createElement("div");
	details.className = "dance-details";

	const regionData = dances.find((dance) => dance.region.toLowerCase().trim() === region.toLowerCase().trim());
	if (regionData && regionData.img) {
		const image = document.createElement("img");
		image.src = regionData.img;
		image.alt = `${region} Image`;
		image.className = "region-image";
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

function setupMapPoints() {
	document.querySelectorAll(".map-point").forEach((button) => {
		const region = button.querySelector("h2").innerText;
		button.addEventListener("click", () => showDancesForRegion(button, region));
	});
}

fetchDances();
