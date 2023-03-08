const captureScreenBtn = document.querySelector("#src-btn");
const previewCapture = document.querySelector(".src-preview");
const closeBtn = previewCapture.querySelector("#closebtn");
const downloadBtn = document.querySelector("#download");

const captureScreen = async () => {
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ preferCurrentTab: true });
        const video = document.createElement("video");
        video.addEventListener("loadedmetadata", () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            video.play();
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            stream.getVideoTracks()[0].stop();
            previewCapture.querySelector("img").src = canvas.toDataURL();
            previewCapture.classList.add("show");
        })
        video.srcObject = stream;
    } catch(error) {
    alert("Failed to capture screen shots!");
}
}

const toDownload = () => {
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = previewCapture.querySelector("img").src;
    link.click();
}

closeBtn.addEventListener("click", () => previewCapture.classList.toggle("show"));
captureScreenBtn.addEventListener("click", captureScreen);
downloadBtn.addEventListener("click", toDownload);
