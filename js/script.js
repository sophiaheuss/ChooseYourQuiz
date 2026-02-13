let recentClick = null;//for keeping track of what button is clicked (indicates which quiz API to fetch and use)

document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", (e) => {
    recentClick = e.target.id;

    if (recentClick === "music") {
      //moving to music page when music button was clicked
      window.location.href = "html/MusicQuiz.html";//Copied (and modified) from chatgpt
    } else if (recentClick === "animals") {
      //moving to animals page when animals button was clicked
      window.location.href = "html/AnimalsQuiz.html";//Copied (and modified) from chatgpt
    } else if (recentClick === "history") {
      //moving to history page when history button was clicked
      window.location.href = "html/HistoryQuiz.html";//Copied (and modified) from chatgpt
    } else if (recentClick === "sports") {
      //moving to sports page when sports button was clicked
      window.location.href = "html/SportsQuiz.html";//Copied (and modified) from chatgpt
    }
  });
});
