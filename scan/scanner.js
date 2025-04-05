const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const scanBtn = document.getElementById('scanBtn');

// Load your actual barcode image
const refImg = new Image();
refImg.crossOrigin = 'anonymous';
refImg.src = 'https://i.ibb.co/XrFFRNMR/IMG-0257.jpg';

navigator.mediaDevices.getUserMedia({
  video: { facingMode: { exact: "environment" } }
}).then(stream => {
  video.srcObject = stream;
}).catch(err => {
  alert("Camera error: " + err.message);
});

function getImageData(img) {
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = img.width;
  tempCanvas.height = img.height;
  const ctx = tempCanvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  return ctx.getImageData(0, 0, img.width, img.height);
}

function compareImageData(a, b) {
  if (a.width !== b.width || a.height !== b.height) return false;
  const da = a.data, db = b.data;
  let diff = 0;
  for (let i = 0; i < da.length; i++) {
    if (Math.abs(da[i] - db[i]) > 50) diff++;
  }
  return diff < (da.length * 0.01); // 1% tolerance
}

scanBtn.onclick = () => {
  const ctx = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0);

  const scaled = document.createElement('canvas');
  scaled.width = refImg.width;
  scaled.height = refImg.height;
  const sctx = scaled.getContext('2d');
  sctx.drawImage(canvas, 0, 0, scaled.width, scaled.height);
  const captureData = sctx.getImageData(0, 0, scaled.width, scaled.height);

  const refData = getImageData(refImg);

  if (compareImageData(captureData, refData)) {
    alert('Access granted');
  } else {
    alert('Access denied');
  }
};
