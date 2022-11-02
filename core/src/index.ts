import path from 'node:path'
import { cwd } from 'process'
import child_process from 'child_process'
import type { Plugin } from 'vite'
import { loadConfig } from 'unconfig'
import chokidar from 'chokidar'
import { main } from 'auto-export/utils'

function HotFile(): Plugin {
  return {
    name:'hot-file',
    apply: 'serve',
    config(config,{ command }){
      excuteAutoExport()
      if(command === 'serve'){
        loadConfig<HotFileConfig>({
          sources: [
            {
              files: 'hotfile.config',
              extensions: ['ts', 'mts', 'cts', 'js', 'mjs', 'cjs', 'json', ''],
            },
          ],
        }).then(({config:configArray})=>{
          const configs = configArray.configs
          for (let i = 0; i < configs.length; i++){
            const config = configs[i]
            chokidar.watch(path.resolve(cwd(), config.targetDir), {
              ignoreInitial: true,
              atomic: true,
              followSymlinks: true,
            }).on('all', (event, pathDir) => {
              if (!pathDir.includes('index')) {
                excuteAutoExport()
              }
            })
          }
        })
      }
    }
  }
}

function excuteAutoExport() {
  try {
    main()
  }
  catch (error) {
    child_process.execSync('npx autoexport')
  }
}

type CustomImport = (fileName: string, file: string, fileType: string) => string

interface Config {
  targetDir: string
  outputDir?: string
  customImport?: CustomImport
  depth?: boolean
  autoPrefix?: boolean
}

export interface HotFileConfig {
  configs: Array<Config>
}

function defineConfig(config: HotFileConfig): HotFileConfig {
  return config
}

export { defineConfig }

export default HotFile
