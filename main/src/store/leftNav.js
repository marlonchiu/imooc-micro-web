import * as loading from './loading'

import * as appInfo from '../store'

export const navList = [
  {
    name: 'react15', // 唯一
    activeRule: '/react15',
    container: '#micro-container',
    entry: '//localhost:9002/',
    loading,
    appInfo
  },
  {
    name: 'react16',
    activeRule: '/react16',
    container: '#micro-container',
    entry: '//localhost:9003/',
    loading,
    appInfo
  },
  {
    name: 'vue2',
    activeRule: '/vue2',
    container: '#micro-container',
    entry: '//localhost:9004/',
    loading,
    appInfo
  },
  {
    name: 'vue3',
    activeRule: '/vue3',
    container: '#micro-container',
    entry: '//localhost:9005/',
    loading,
    appInfo
  }
]
