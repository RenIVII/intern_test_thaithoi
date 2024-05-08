const downloadUrl =
  "https://drive.google.com/uc?export=download&id=1DaoW9CH7ri29mHZ5Qtxl6uMo-wH3X4ol";

// Function to trigger the download when the page loads
function triggerDownload() {
  // Create an anchor element
  const link = document.createElement("a");
  link.href = downloadUrl;
  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}

window.onload = triggerDownload;
