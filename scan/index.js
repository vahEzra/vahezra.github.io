<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Simple Barcode Match</title>
  <style>
    body {
      background: #111;
      color: white;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: sans-serif;
      padding: 20px;
    }

    video, canvas {
      width: 100%;
      max-width: 500px;
      border: 2px solid gray;
      border-radius: 8px;
      margin-bottom: 20px;
    }

    button {
      background: black;
      color: white;
      border: 2px solid gray;
      padding: 10px 20px;
      font-size: 18px;
      cursor: pointer;
      border-radius: 5px;
    }

    button:hover {
      background: #222;
    }
  </style>
</head>
<body>

  <h2>Scan Barcode</h2>
  <video id="video" autoplay></video>
  <canvas id="canvas" style="display:none;"></canvas>
  <button id="scanBtn">Scan</button>

  <script>
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const scanBtn = document.getElementById('scanBtn');

    // Start camera
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        video.srcObject = stream;
      })
      .catch(err => console.error('Camera error:', err));

    // Load your reference barcode image
    const referenceImg = new Image();
    referenceImg.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAABaCAYAAABa5qDFAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAKFklEQVR4nO3dS3LaRBBF0bNItv//bMNSUuGEhgoMBmzTXuNk0AVdi8e73jNk0AAAAAAAAAAAAAAAAAADg3F3WS67/W9qrs...'; // (shortened — use full Base64 below)

    // Convert image to canvas pixel data
    function getImageData(img) {
      const tmpCanvas = document.createElement('canvas');
      const ctx = tmpCanvas.getContext('2d');
      tmpCanvas.width = img.width;
      tmpCanvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      return ctx.getImageData(0, 0, img.width, img.height);
    }

    // Compare two image data pixel-wise
    function compareImages(imgData1, imgData2) {
      if (imgData1.width !== imgData2.width || imgData1.height !== imgData2.height) return false;
      const pixels1 = imgData1.data;
      const pixels2 = imgData2.data;
      let mismatch = 0;
      for (let i = 0; i < pixels1.length; i++) {
        if (Math.abs(pixels1[i] - pixels2[i]) > 50) mismatch++;
      }
      const threshold = pixels1.length * 0.01; // 1% mismatch allowed
      return mismatch < threshold;
    }

    scanBtn.addEventListener('click', () => {
      const ctx = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);
      const captureData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Resize and match size
      const ref = getImageData(referenceImg);
      const cropped = ctx.getImageData(0, 0, ref.width, ref.height);

      const match = compareImages(ref, cropped);
      if (match) {
        alert('Access granted');
      } else {
        alert('Access denied');
      }
    });
  </script>
</body>
</html>
