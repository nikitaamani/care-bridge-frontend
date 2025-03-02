/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "example.com",
      "images.pexels.com",
      "www.globalgiving.org",
      "img.freepik.com",
      "i.pinimg.com",
      "media.istockphoto.com",
      "encrypted-tbn0.gstatic.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow all HTTPS images (use this carefully)
      },
    ],
  },
};

export default nextConfig; 
