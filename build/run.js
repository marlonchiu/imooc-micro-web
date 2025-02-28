const filePath = require('./filePath')
const childProcess = require('child_process')
// 启动项目
function runChild() {
  Object.keys(filePath).forEach((item) => {
    const childPath = filePath[item]

    console.log('🚀 ~ Object.keys ~ childPath:', childPath)
    childProcess.spawn(`cd ${childPath} && npm start`, { stdio: ['inherit', 'inherit', 'inherit'], shell: true })
  })

}

runChild()
