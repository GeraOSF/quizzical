module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ["airbnb", "airbnb/hooks", "plugin:react/recommended"],
	overrides: [],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["react"],
	rules: {
		allowIndentationTabs: 0,
		quotes: 0,
		"arrow-parens": 0,
		"no-trailing-spaces": 0,
		"no-tabs": 0,
		indent: 0,
		"no-unused-vars": 1,
		"arrow-body-style": 0,
		"react/react-in-jsx-scope": 0,
		"react/button-has-type": 0,
		"react/jsx-no-bind": 0,
		camelcase: 0,
		"no-use-before-define": 0,
		"react/jsx-indent": 0,
		"comma-dangle": 0,
		"linebreak-style": 0,
		"react/destructuring-assignment": 0,
		"react/prop-types": 0,
		"react/jsx-one-expression-per-line": 0,
		"no-plusplus": 0,
		"react/jsx-no-target-blank": 0,
	},
};
