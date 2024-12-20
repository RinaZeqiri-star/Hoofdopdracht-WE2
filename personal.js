window.addEventListener("load", function () {
	const lines = document.querySelectorAll(".cls-1, .cls-2, .cls-3, .cls-5, .cls-6");
	const circles = document.querySelectorAll(".cls-4");

	function smoothUpDownMovement() {
		gsap.to(lines, {
			y: 100,
			repeat: -1,
			yoyo: true,
			duration: 5,
			ease: "power1.inOut",
		});

		gsap.to(circles, {
			y: 100,
			repeat: -1,
			yoyo: true,
			duration: 5,
			ease: "power1.inOut",
		});
	}
	smoothUpDownMovement();
});
