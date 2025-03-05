"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Facebook, Twitter, Link as LinkIcon, Mail, Copy, QrCode } from "lucide-react";
import { Button } from "../components/ui/button";
import QRCode from "react-qr-code";

export default function ShareFundraiser() {
  const searchParams = useSearchParams();
  const fundraiserTitle = searchParams.get("title") || "Support a Great Cause!";
  const fundraiserUrl = searchParams.get("url") || "https://yourfundraiser.com/example";

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(fundraiserUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-xl p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Share Your Fundraiser</h1>
        <p className="text-gray-600 mb-6">Spread the word to reach more supporters!</p>

        {/* Fundraiser Preview */}
        <div className="bg-blue-50 p-4 rounded-lg text-left space-y-2 mb-6">
          <p><strong>Title:</strong> {fundraiserTitle}</p>
          <p><strong>Link:</strong> <a href={fundraiserUrl} target="_blank" className="text-blue-500 underline">{fundraiserUrl}</a></p>
        </div>

        {/* Social Media Share Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fundraiserUrl)}`} target="_blank">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center">
              <Facebook className="w-5 h-5 mr-2" /> Facebook
            </Button>
          </a>
          <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(fundraiserUrl)}&text=${encodeURIComponent(fundraiserTitle)}`} target="_blank">
            <Button className="bg-blue-400 hover:bg-blue-500 text-white flex items-center">
              <Twitter className="w-5 h-5 mr-2" /> Twitter
            </Button>
          </a>
        </div>

        {/* Copy Link Button */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <input type="text" value={fundraiserUrl} readOnly className="border px-4 py-2 rounded-lg w-3/4 text-gray-700" />
          <Button onClick={handleCopy} className="bg-gray-800 hover:bg-gray-900 text-white">
            {copied ? "Copied!" : <><Copy className="w-5 h-5 mr-2" /> Copy</>}
          </Button>
        </div>

        {/* Email & QR Code Share */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href={`mailto:?subject=Support this fundraiser&body=Check out this fundraiser: ${fundraiserUrl}`} target="_blank">
            <Button className="bg-red-500 hover:bg-red-600 text-white flex items-center">
              <Mail className="w-5 h-5 mr-2" /> Email
            </Button>
          </a>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <QRCode value={fundraiserUrl} size={100} />
            <p className="text-xs mt-2 text-gray-500">Scan to donate</p>
          </div>
        </div>

        {/* Engagement Tips */}
        <div className="mt-6 text-gray-600 text-sm text-left">
          <p className="font-semibold">📢 Tips to Increase Donations:</p>
          <ul className="list-disc list-inside">
            <li>Post on social media frequently.</li>
            <li>Send direct messages to close friends.</li>
            <li>Update your page with progress and donor shoutouts.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
