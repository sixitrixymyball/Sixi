function getResult() {
  const genre = document.getElementById("genreSelect").value;
  const resultDiv = document.getElementById("result");

  const results = {
    trap: "🔥 You're bold, hype, and fearless. A true banger believer.",
    lofi: "☁️ You're calm, deep, and thoughtful. Always vibing solo.",
    pop: "✨ You're energetic, outgoing, and always in tune with the trends.",
    rock: "⚡ You're emotional, expressive, and not afraid to be loud.",
  };

  resultDiv.textContent = results[genre] || "Please pick a genre first!";
}
// --- Existing quiz code above ---
// (Keep all quiz and navigation code from before)

// Playlist Analyzer elements
const analyzeBtn = document.getElementById("analyzeBtn");
const playlistUrlInput = document.getElementById("playlistUrl");
const playlistResultDiv = document.getElementById("playlistResult");

analyzeBtn.addEventListener("click", () => {
  const url = playlistUrlInput.value.trim();
  if (!url) {
    playlistResultDiv.innerHTML = `<p style="color:#f33;">Please enter a playlist URL.</p>`;
    return;
  }

  if (url.includes("spotify.com/playlist")) {
    // Extract playlist ID from URL
    const match = url.match(/playlist\/([a-zA-Z0-9]+)/);
    const playlistId = match ? match[1] : null;
    if (!playlistId) {
      playlistResultDiv.innerHTML = `<p style="color:#f33;">Invalid Spotify playlist URL.</p>`;
      return;
    }

    // Embed Spotify playlist player
    playlistResultDiv.innerHTML = `
      <iframe src="https://open.spotify.com/embed/playlist/${playlistId}" width="100%" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
      <p style="margin-top: 1rem; color:#1DB954; font-weight:700;">Looks like a cool Spotify playlist! You must have great taste 🎧</p>
    `;
  } else if (url.includes("youtube.com/playlist") || url.includes("youtu.be")) {
    try {
      const urlObj = new URL(url);
      const playlistId = urlObj.searchParams.get("list");
      if (!playlistId) {
        playlistResultDiv.innerHTML = `<p style="color:#f33;">Invalid YouTube playlist URL.</p>`;
        return;
      }
      playlistResultDiv.innerHTML = `
        <iframe width="100%" height="380" src="https://www.youtube.com/embed/videoseries?list=${playlistId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        <p style="margin-top: 1rem; color:#FF0000; font-weight:700;">Cool YouTube playlist! Time to vibe 🎵</p>
      `;
    } catch {
      playlistResultDiv.innerHTML = `<p style="color:#f33;">Invalid YouTube playlist URL.</p>`;
    }
  } else if (url.includes("music.apple.com")) {
    playlistResultDiv.innerHTML = `
      <p style="color:#999; font-weight:700;">
        Looks like an Apple Music playlist! 
        <br />
        <a href="${url}" target="_blank" rel="noopener" style="color:#fa2;">Open Playlist in Apple Music</a>
      </p>
    `;
  } else {
    playlistResultDiv.innerHTML = `<p style="color:#f33;">Sorry, only Spotify, YouTube, and Apple Music playlists are supported right now.</p>`;
  }
});

// --- Existing navigation code ---

// Navigation logic to switch sections
function navigateSection(sectionId) {
  document.querySelectorAll("main .section").forEach((sec) => {
    sec.classList.remove("active");
  });
  document.getElementById(sectionId).classList.add("active");

  // Update sidebar active link
  document.querySelectorAll(".sidebar ul li a").forEach((link) => {
    link.classList.remove("active");
  });
  document.querySelector(`.sidebar ul li a[data-section="${sectionId}"]`).classList.add("active");

  // Scroll top main area
  document.querySelector("main").scrollTo({ top: 0, behavior: "smooth" });
}

// Event listeners for sidebar links
document.querySelectorAll(".sidebar ul li a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const section = link.getAttribute("data-section");
    navigateSection(section);
  });
});

// Start quiz button event
document.getElementById("startQuizBtn").addEventListener("click", () => {
  navigateSection("quiz");
  currentQuestion = 0;
  answers = [];
  prevBtn.disabled = true;
  nextBtn.disabled = true;
  prevBtn.style.display = "inline-block";
  nextBtn.style.display = "inline-block";
  renderQuestion();
});

// Contact form submit event
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thanks for reaching out! We'll get back to you soon.");
  e.target.reset();
});

// On page load, show home section
navigateSection("home");
