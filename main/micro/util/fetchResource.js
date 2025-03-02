// 获取页面资源
export const fetchResource = (url) => fetch(url).then(async (res) => res.text())
