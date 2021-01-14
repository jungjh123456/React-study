module.exports = {
	purge: ['./src/components/**/*.js', './src/pages/**/*.js'],
	darkMode: 'media', // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				'accent-1': 'orange',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
