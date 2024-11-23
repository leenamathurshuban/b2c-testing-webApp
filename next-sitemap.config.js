const siteUrl = process.env.SITE_URL || 'https://www.applefixpros.com/';

module.exports = {
	siteUrl,
	generateRobotsTxt: true,
	generateIndexSitemap: true,
	exclude: ["/server-sitemap.xml"],
	robotsTxtOptions: {
		policies: [
			{ userAgent: '*', allow: '/' },
			{ userAgent: '*', disallow: '/thank-you'},
		],
		additionalSitemaps: [
			`${siteUrl}sitemap.xml`,
			`${siteUrl}server-sitemap.xml`,
		],
	},
};
