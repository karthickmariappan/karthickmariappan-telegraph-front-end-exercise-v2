module.exports = {
	plugins: [
		require('postcss-import'),
		//included autoprefixer to support browser vendor specific css, the prefixed css changes could be see in public/app.css
		require('autoprefixer')()
	]
};
