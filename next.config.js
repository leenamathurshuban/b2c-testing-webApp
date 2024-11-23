/** @type {import('next').NextConfig} */

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        path: false,
      };
    }

		return config;
	},
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'items-images-production.s3.us-west-2.amazonaws.com',
				pathname: '**',
			},
		],
	}
};

// const withPlugins = require("next-compose-plugins");
// const withPWA = require("next-pwa");
// const runtimeCaching = require("next-pwa/cache");

// module.exports = withPlugins([
//   [
//     withPWA,
//     {
//       pwa: {
//         disable: process.env.NODE_ENV === "development",
//         dest: "public",
//         runtimeCaching,
//         buildExcludes: [/middleware-manifest\.json$/],
//       },
//     },
//   ],
//   {
//     images: {
//       unoptimized: true,
//       remotePatterns: [
//         {
//           protocol: "https",
//           hostname: "items-images-production.s3.us-west-2.amazonaws.com",
//           pathname: "**",
//         },
//       ],
//     },
//   },
//   {
//     reactStrictMode: true,
//   },
// ]);

