const tags = document.getElementById("tags");
const textarea = document.getElementById("textarea");

textarea.focus();

textarea.addEventListener("keyup", e => {
  createTags(e.target.value);

  if (e.key === "Enter") {
    setTimeout(() => {
      e.target.value = "";
    }, 10);

    randomSelect();
  }
});

function createTags(input) {
  const tagsArray = input
    .split(",")
    .filter(tag => tag.trim() !== "")
    .map(tag => tag.trim());

  // Hide generated tags initially
  const generatedTags = document.querySelectorAll(".generated-tag");
  generatedTags.forEach(tag => {
    tag.style.display = "none";
  });

  tagsArray.forEach(tagText => {
    const existingTag = Array.from(generatedTags).find(
      tag => tag.innerText === tagText
    );
    if (existingTag) {
      existingTag.style.display = "inline-block";
    } else {
      const tagEl = document.createElement("span");
      tagEl.classList.add("tag", "generated-tag"); // Add "generated-tag" class
      tagEl.innerText = tagText;
      tags.appendChild(tagEl); // Append the tags to the "tags" container.
    }
  });
}

function randomSelect() {
  const times = 30;

  const interval = setInterval(() => {
    const randomTag = pickRandomTag();

    hightlightTag(randomTag);

    setTimeout(() => {
      unHightlightTag(randomTag);
    }, 100);
  }, 100);

  setTimeout(() => {
    clearInterval(interval);

    setTimeout(() => {
      const randomTag = pickRandomTag();
      hightlightTag(randomTag);
    }, 100);
  }, times * 100);
}

function pickRandomTag() {
  const generatedTags = document.querySelectorAll(".generated-tag");
  return generatedTags[Math.floor(Math.random() * generatedTags.length)];
}

function hightlightTag(tag) {
  tag.classList.add("highlight");
}

function unHightlightTag(tag) {
  tag.classList.remove("highlight");
}
