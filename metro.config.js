/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    sourceExts: ['js', 'jsx', 'ts', 'tsx', 'cjs'], // 增加支持的文件类型
    assetExts: ['png', 'jpg', 'jpeg', 'gif', 'svg'], // 添加图片后缀类型
  },
};
