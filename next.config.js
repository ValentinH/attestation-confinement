module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.(pdf|png|jpg|gif)$/,
      use: [
        {
          loader: 'file-loader',
        },
      ],
    }
    )

    return config
  },
}