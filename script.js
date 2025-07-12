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
