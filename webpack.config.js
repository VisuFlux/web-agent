const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/agent.ts',
  output: {
    filename: "visuflux-agent.js",
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'VisuFluxAgent',
      type: 'umd',
      export: 'VisuFluxAgent',
    },
    globalObject: "this",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};