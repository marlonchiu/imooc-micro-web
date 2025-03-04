var express = require('express')
var router = express.Router()
const fs = require('fs')
const path = require('path')
const execSync = require('child_process').execSync

const versionDir = path.join(__dirname, '../version')
const initVersion = '1.0.0.0'

/* GET home page. */
router.get('/start', function (req, res, next) {
  const name = req.query.name
  console.log('🚀 ~ name:', name)

  // 确认要更新的版本号, 每一个应用独立一个文件管理版本
  // 创建一个文件,默认的版本号
  const currentUrl = path.join(versionDir, name) // version
  const originPath = path.join(__dirname, '../../../', name) // app目录
  console.log('🚀 ~ originPath:', originPath)
  const originDist = path.join(originPath, '/dist')

  let originVersion
  let newVersion

  // 处理版本号
  function changeVersion() {
    try {
      originVersion = fs.readFileSync(currentUrl).toString()
      originVersion = +originVersion.replace(/\./g, '') + 1
      newVersion = `${originVersion}`.split('').join('.')
      fs.writeFileSync(currentUrl, newVersion)
    } catch (e) {
      fs.writeFileSync(currentUrl, initVersion)
      // changeVersion()
    }
  }

  // 发布打包
  function startBuild() {
    // const bagPath = path.join(__dirname, '../bag')
    // 修改地址到 platform/release/
    const bagPath = path.join(__dirname, '../../release')
    console.log('🚀 ~ startBuild ~ bagPath:', bagPath)
    // 清空当前项目下所有资源
    // execSync(`rm -rf ${bagPath}/${name}`)

    // 首先创建项目目录
    // execSync(`mkdir ${bagPath}/${name}`)

    // 清空当前项目下所有资源
    const projectPath = path.join(bagPath, name)
    try {
      if (fs.existsSync(projectPath)) {
        fs.rmSync(projectPath, { recursive: true, force: true })
        console.log(`成功清空目录: ${projectPath}`)
      }
      // 创建新的项目目录
      fs.mkdirSync(projectPath, { recursive: true })
      console.log(`成功创建项目目录: ${projectPath}`)
    } catch (error) {
      console.error('处理目录失败:', error)
    }

    try {
      // 进入项目并执行打包
      console.log('进入项目并执行打包')
      execSync(`cd ${originPath} && npm i  && npm run build`)
    } catch (e) {
      console.log('npm run build err:', e)
    }

    // 重新创建新的资源包
    console.log('重新创建新的资源包')
    // execSync(`cd ${bagPath} && mkdir -p ./${name}/${newVersion}`)

    const newVersionPath = path.join(bagPath, name, newVersion)
    fs.mkdirSync(newVersionPath, { recursive: true })

    const lastDist = path.join(bagPath, `./${name}/${newVersion}`)
    try {
      // 将子应用的打包文件移到bag下
      console.log('将子应用的打包文件移到bag下')
      // execSync(`mv ${originDist} ${lastDist}`)

      // 将子应用的打包文件移到bag下
      console.log('将子应用的打包文件移到bag下')
      console.log('从:', originDist)
      console.log('到:', lastDist)

      if (fs.existsSync(originDist)) {
        // 递归复制整个目录
        fs.cpSync(originDist, lastDist, {
          recursive: true,
          force: true
        })

        // 复制完成后删除源目录
        fs.rmSync(originDist, {
          recursive: true,
          force: true
        })

        console.log('文件移动完成')
      } else {
        console.error('源目录不存在:', originDist)
        throw new Error('源目录不存在')
      }
    } catch (e) {
      console.error('移动文件失败:', error)
    }
  }

  changeVersion()
  startBuild()

  res.send({
    version: newVersion
  })
})

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send('this is a express server platform ~')
})

module.exports = router
