const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

// Button submit
const onGenerateSubmit = (e) => {
  e.preventDefault();

  clearUI();

  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;

  // Validate URL
  if (url === "") {
    alert("Please enter a URL");
  } else {
    showSpinner();
    // Show spinner for 1 sec
    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size);

      // Wait for QR code generation
      setTimeout(() => {
        const canvas = qr.querySelector("canvas");
        if (canvas) {
          const saveUrl = canvas.toDataURL();
          createSaveBtn(saveUrl); // Create Save button
        } else {
          alert("Error generating QR code!");
        }
      }, 50);
    }, 1000);
  }
};

// Generate QR code as a canvas
const generateQRCode = (url, size) => {
  const qrcode = new QRCode(qr, {
    text: url,
    width: size,
    height: size,
    correctLevel: QRCode.CorrectLevel.H, // High correction level for better scanability
  });
};

// Clear QR code and save button
const clearUI = () => {
  qr.innerHTML = ""; // Clear QR code display
  const saveBtn = document.getElementById("save-link");
  if (saveBtn) {
    saveBtn.remove(); // Remove previous Save button
  }
};

// Show spinner
const showSpinner = () => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "block";
};

// Hide spinner
const hideSpinner = () => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "none";
};

// Create save button to download QR code as an image
const createSaveBtn = (saveUrl) => {
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList =
    'bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
  link.innerHTML = "Save Image";
  link.href = saveUrl;
  link.download = "qrcode.png";

  document.getElementById("generated").appendChild(link);
};

hideSpinner(); // Hide spinner initially

form.addEventListener("submit", onGenerateSubmit);
