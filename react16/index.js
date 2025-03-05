import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import BasicMap from './src/router'

// 注意 Singlespacontext 是一个为react@16.3(如果可用的话)提供的上下文，包含了 singleSpa props
import singleSpaReact, { SingleSpaContext } from 'single-spa-react'
console.log('🚀 ~ SingleSpaContext:', SingleSpaContext)

export const render = () => {
  ReactDOM.render(<BasicMap />, document.getElementById('app-react'))
}

if (!window.singleSpaNavigate) {
  render()
}

const reactLifeCycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: BasicMap,
  errorBoundary(err, info, props) {
    // https://reactjs.org/docs/error-boundaries.html
    return <div>This renders when a catastrophic error occurs</div>
  }
})
export const bootstrap = reactLifeCycles.bootstrap
export const mount = reactLifeCycles.mount
export const unmount = reactLifeCycles.unmount
