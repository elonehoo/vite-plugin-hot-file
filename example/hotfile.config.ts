import { defineConfig } from 'vite-plugin-hot-file'

export default defineConfig({
  configs: [
    {
      targetDir: './src/svgs/',
      customImport: (fileName, file) => {
        return `import { ReactComponent as Svg${fileName} } from './${file}'`
      },
    },
    {
      targetDir: './src/images/',
      autoPrefix: true,
    },
  ],
})
