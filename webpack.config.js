var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		//  'webpack-dev-server/client?http://192.168.11.12:8080',
		workflowapply: path.resolve(__dirname, 'app/index.js'),
		workflowdetail: path.resolve(__dirname, 'app/workflowdetail.js')
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].bundle.js'
	},
	module: {
	  rules: [
	    { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
	    { test: /\.css/, loader: "style-loader!css-loader"},
	    { test: /\.less/, loader: "style-loader!css-loader!less-loader"}
	  ]
	},
	plugins:[
		new webpack.NoEmitOnErrorsPlugin()
	]
}