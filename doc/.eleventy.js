module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy('css');
	eleventyConfig.addPassthroughCopy('js');

	eleventyConfig.addWatchTarget('css');
	eleventyConfig.addWatchTarget('js');

	return {
		pathPrefix: '/create-gulp-template/',
	};
};
