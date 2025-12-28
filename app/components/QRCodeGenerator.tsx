'use client';

import { useState } from 'react';

interface QRCodeGeneratorProps {
  defaultUrl?: string;
  label?: string;
}

export default function QRCodeGenerator({ 
  defaultUrl = '', 
  label = 'PDF URL' 
}: QRCodeGeneratorProps) {
  const [url, setUrl] = useState(defaultUrl);
  const [size, setSize] = useState(300);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  const generateQRCode = () => {
    if (!url.trim()) {
      alert('Please enter a URL');
      return;
    }

    // Construct the full URL if it's a relative path
    let fullUrl = url;
    if (url.startsWith('/')) {
      // If it's a relative path, make it absolute
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
      fullUrl = `${baseUrl}${url}`;
    }

    const qrApiUrl = `/api/qrcode?url=${encodeURIComponent(fullUrl)}&size=${size}`;
    setQrCodeUrl(qrApiUrl);
  };

  const downloadQRCode = async () => {
    if (!qrCodeUrl) return;

    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `qrcode-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download QR code');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">QR Code Generator</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="e.g., /pdfs/catalog.pdf or https://example.com/file.pdf"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Size (pixels)
          </label>
          <input
            type="number"
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value) || 300)}
            min="100"
            max="1000"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          onClick={generateQRCode}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          Generate QR Code
        </button>

        {qrCodeUrl && (
          <div className="mt-6 space-y-4">
            <div className="flex justify-center p-4 bg-gray-50 rounded-md">
              <img
                src={qrCodeUrl}
                alt="QR Code"
                className="border-2 border-gray-300 rounded"
              />
            </div>
            
            <button
              onClick={downloadQRCode}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors font-medium"
            >
              Download QR Code
            </button>

            <div className="text-sm text-gray-600 text-center">
              <p className="font-medium mb-1">URL encoded in QR code:</p>
              <p className="break-all text-xs bg-gray-100 p-2 rounded">
                {url.startsWith('/') 
                  ? `${typeof window !== 'undefined' ? window.location.origin : ''}${url}`
                  : url}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

