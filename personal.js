window.addEventListener("load", function () {
	// Selecting the elements
	const lines = document.querySelectorAll(".cls-1, .cls-2, .cls-3, .cls-5, .cls-6"); // Select lines, including the straight line
	const circles = document.querySelectorAll(".cls-4"); // Select circles

	// GSAP animation for a smooth up and down effect
	function smoothUpDownMovement() {
		// Animate the lines (including the straight line)
		gsap.to(lines, {
			y: 100, // Move the lines up by 100px
			repeat: -1, // Repeat the animation infinitely
			yoyo: true, // Make it go up and down
			duration: 5, // Duration of each cycle
			ease: "power1.inOut", // Ease for smooth animation
		});

		// Animate the circles
		gsap.to(circles, {
			y: 100, // Move the circles up by 100px
			repeat: -1, // Repeat the animation infinitely
			yoyo: true, // Make it go up and down
			duration: 5, // Duration of each cycle (slower than lines)
			ease: "power1.inOut", // Ease for smooth animation
		});
	}

	// Call the function to start the animation
	smoothUpDownMovement();
});
