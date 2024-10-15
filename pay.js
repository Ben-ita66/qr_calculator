const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

// Button submit
const onGenerateSubmit = (e) => {
  e.preventDefault();
  clearUI();

  const amount = document.getElementById("amount").value;
  const payeeEmail = "yourbookstoreemail@example.com";  // Your PayPal email
  const currency = "USD"; // Currency code

  // Validate inputs
  if (!amount) {
    alert("Please enter the amount");
    return;
  }

  showSpinner();

  // Format PayPal payment URL
  const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${payeeEmail}&item_name=Bookstore+Payment&amount=${amount}&currency_code=${currency}`;

  setTimeout(() => {
    hideSpinner();
    generateQRCode(paypalUrl, 300);  // Generate QR code for PayPal payment
    setTimeout(() => {
      const saveUrl = qr.querySelector("canvas").toDataURL();
      createSaveBtn(saveUrl); // Create save button
    }, 50);
  }, 1000);
};

// Generate QR code
const generateQRCode = (url, size) => {
  const qrcode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
  });
};

// Clear QR code and save button
const clearUI = () => {
  qr.innerHTML = "";
  const saveBtn = document.getElementById("save-link");
  if (saveBtn) {
    saveBtn.remove();
  }
};

// Show and hide spinner
const showSpinner = () => document.getElementById("spinner").style.display = "block";
const hideSpinner = () => document.getElementById("spinner").style.display = "none";

// Create save button to download QR code
const createSaveBtn = (saveUrl) => {
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList = 'bg-plum-500 hover:bg-plum-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
  link.innerHTML = "Save Image";
  link.href = saveUrl;
  link.download = "qrcode.png";
  document.getElementById("generated").appendChild(link);
};

hideSpinner();

form.addEventListener("submit", onGenerateSubmit);
