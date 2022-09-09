const { DateTime } = require('luxon');

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy('css');
	eleventyConfig.addPassthroughCopy('js');

	eleventyConfig.addWatchTarget('css');
	eleventyConfig.addWatchTarget('js');

	eleventyConfig.addFilter('readableDate', (dateObj) => {
		return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('dd LLL yyyy');
	});
	return {
		pathPrefix: '/eleventy-blog-template/',
	};
};
