document
  .getElementById("generate-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const accountNumber = document.getElementById("accountNumber").value;
    const bankName = document.getElementById("bankName").value;
    const ifscCode = document.getElementById("ifscCode").value;
    const amount = document.getElementById("amount").value;

    // Combine payment information into a formatted string
    const paymentInfo = `Bank Name: ${bankName}\nAccount Number: ${accountNumber}\nIFSC Code: ${ifscCode}\nAmount: ${
      amount || "Not specified"
    }`;

    // Validate details
    if (!bankName || !accountNumber || !ifscCode) {
      alert("Please enter all required details.");
      return;
    }

    // Disable the entire form to prevent further submissions
    const formElements = document.getElementById("generate-form").elements;
    for (let i = 0; i < formElements.length; i++) {
      formElements[i].disabled = true;
    }

    showSpinner();

    // Show spinner for 1 second before generating QR code
    setTimeout(() => {
      hideSpinner();
      generateQRCode(paymentInfo);

      // Wait for QR code generation to create the save button
      setTimeout(() => {
        const canvas = document.querySelector("#qrcode canvas");
        if (canvas) {
          const saveUrl = canvas.toDataURL();
          createSaveBtn(saveUrl); // Create Save button
        } else {
          alert("Error generating QR code!");
        }
      }, 50);
    }, 1000);
  });

// Function to generate QR code
const generateQRCode = (paymentInfo) => {
  const qrcode = new QRCode(document.getElementById("qrcode"), {
    text: paymentInfo,
    width: 200,
    height: 200,
    correctLevel: QRCode.CorrectLevel.H, // High correction level for better scanability
  });
};

// Create save button
const createSaveBtn = (saveUrl) => {
  // Remove existing save button if it exists
  const existingLink = document.getElementById("save-link");
  if (existingLink) {
    existingLink.remove();
  }

  const link = document.createElement("a");
  link.id = "save-link";
  link.classList =
    "bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5";
  link.innerHTML = "Save Image";
  link.href = saveUrl;
  link.download = "payment-qrcode.png";

  document.getElementById("generated").appendChild(link);
};

// Spinner control functions
const showSpinner = () => {
  document.getElementById("spinner").style.display = "block";
};

const hideSpinner = () => {
  document.getElementById("spinner").style.display = "none";
};

hideSpinner();
