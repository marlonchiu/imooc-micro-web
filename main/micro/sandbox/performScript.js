// 执行应用的 js 内容 new Function 篇
export const performScriptForFunction = (script, appName, global) => {
  window.proxy = global
  const scriptText = `
    return ((window) => {
      try{
        ${script}
      } catch (e) {
        console.error('run script error: ' + e)
      }
      return window['${appName}']
    })(window.proxy)
  `

  return new Function(scriptText)()
}

// 执行应用中的 js 内容 eval篇

export const performScriptForEval = (script, appName, global) => {
  // eval(script) // app module mount

  // const scriptText = `
  //   () => {
  //     ${script}
  //     return window['${appName}']
  //   }
  // `

  // return eval(scriptText).call(global, global)

  const globalWindow = (0, eval)(window)
  globalWindow.proxy = global
  const scriptText = `
    ((window) => {
      try{
        ${script}
      } catch (e) {
        console.error('run script error: ' + e)
      }
      return window['${appName}']
    }).bind(window.proxy)(window.proxy)
  `
  return eval(scriptText) // app module mount
}
