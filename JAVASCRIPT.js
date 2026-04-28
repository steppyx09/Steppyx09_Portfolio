const overlay = document.getElementById("videoOverlay");
const overlayVideo = document.getElementById("overlayVideo");
const closeOverlay = document.getElementById("closeOverlay");

function openOverlay(videoSrc) {
  overlay.setAttribute("aria-hidden", "false");
  overlayVideo.src = videoSrc;
  overlayVideo.currentTime = 0;
  overlayVideo.play().catch(() => {});
  document.body.style.overflow = "hidden";
}

function closeModal() {
  overlay.setAttribute("aria-hidden", "true");
  overlayVideo.pause();
  overlayVideo.src = "";
  document.body.style.overflow = "";
}

document.querySelectorAll(".btn-card").forEach(btn => {
  btn.addEventListener("click", () => {
    const videoId = btn.dataset.video;
    const videoElement = document.getElementById(videoId);
    const source = videoElement?.querySelector("source")?.src;

    const thumb = videoElement?.previousElementSibling;
    if (thumb && thumb.classList.contains("card-thumb")) {
      thumb.classList.add("hidden");
    }

    if (source) openOverlay(source);
  });
});

closeOverlay.addEventListener("click", closeModal);

overlay.addEventListener("click", (e) => {
  if (e.target?.dataset?.close === "true") closeModal();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && overlay.getAttribute("aria-hidden") === "false") {
    closeModal();
  }
});
