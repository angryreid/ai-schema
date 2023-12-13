module.exports = {
  // 其他 webpack 配置...
  module: {
    rules: [
      {
        test: /\.js$/, // 匹配 js 文件
        use: [
          {
            loader: 'string-replace-loader',
            options: {
              search: 'hello-world',
              replace: 'your_replace_string',
              flags: 'g' // 可选的正则表达式标志
            }
          }
        ]
      },
      {
        test: /\.ts$/, // 匹配 css 文件
        use: [
          {
            loader: 'string-replace-loader',
            options: {
              search: 'hello-world',
              replace: 'your_replace_string',
              flags: 'g'
            }
          }
        ]
      },
      {
        test: /\.css$/, // 匹配 css 文件
        use: [
          {
            loader: 'string-replace-loader',
            options: {
              search: 'hello-world',
              replace: 'your_replace_string',
              flags: 'g'
            }
          }
        ]
      },
      {
        test: /\.html$/, // 匹配 html 文件
        use: [
          {
            loader: 'string-replace-loader',
            options: {
              search: 'hello-world',
              replace: 'your_replace_string',
              flags: 'g'
            }
          }
        ]
      },
    ]
  }
};