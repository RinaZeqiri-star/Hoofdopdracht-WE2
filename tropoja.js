async function fetchComments() {
	try {
		const response = await fetch("http://localhost:3000/tropoja"); // Change to '/comments'
		const comments = await response.json();
		const commentsContainer = document.getElementById("comments-container");
		commentsContainer.innerHTML = ""; // Clear any existing comments

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

// Handle comment form submission
window.onload = function () {
	document.getElementById("comment-form").addEventListener("submit", async (event) => {
		event.preventDefault();

		const name = document.getElementById("comment-name").value;
		const commentText = document.getElementById("comment-text").value;

		if (name && commentText) {
			try {
				const response = await fetch("http://localhost:3000/tropoja", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ name, comment: commentText }), // Removed 'page' here
				});

				const result = await response.json();
				if (result.message === "Comment added successfully") {
					fetchComments(); // Refresh comments after posting
					document.getElementById("comment-name").value = ""; // Clear the name input
					document.getElementById("comment-text").value = ""; // Clear the comment textarea
				} else {
					console.error("Error posting comment:", result);
				}
			} catch (error) {
				console.error("Error submitting comment:", error);
			}
		}
	});
};
// Initial fetch of comments when page loads
fetchComments();
