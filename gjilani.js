async function fetchComments() {
	try {
		const response = await fetch("https://web2-course-project-back-end-rinazeqiri.onrender.com/gjilani");
		const comments = await response.json();
		const commentsContainer = document.getElementById("comments-container");
		commentsContainer.innerHTML = "";

		comments.forEach((comment) => {
			const commentElement = document.createElement("div");
			commentElement.classList.add("comment");
			commentElement.innerHTML = `<p>${comment.comment}</p>`;
			commentsContainer.appendChild(commentElement);
		});
	} catch (error) {
		console.error("Error fetching comments:", error);
	}
}

window.onload = function () {
	document.getElementById("comment-form").addEventListener("submit", async (event) => {
		event.preventDefault();

		const name = document.getElementById("comment-name").value;
		const commentText = document.getElementById("comment-text").value;

		if (name && commentText) {
			try {
				const response = await fetch("https://web2-course-project-back-end-rinazeqiri.onrender.com/gjilani", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ name, comment: commentText }),
				});

				const result = await response.json();
				if (result.message === "Comment added successfully") {
					fetchComments();
					document.getElementById("comment-name").value = "";
					document.getElementById("comment-text").value = "";
				} else {
					console.error("Error posting comment:", result);
				}
			} catch (error) {
				console.error("Error submitting comment:", error);
			}
		}
	});
};

fetchComments();
