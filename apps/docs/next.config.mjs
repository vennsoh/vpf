import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
	devIndicators: false,
  transpilePackages: ["@vpf/ui"],
  images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
			{
				protocol: "https",
				hostname: "avatar.vercel.sh",
			},
		],
  },
  turbopack: {
    root: path.join(__dirname, "../.."),
  },
}

export default nextConfig
