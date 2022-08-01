// 文章相关的API都封装在这个模块中
import request from '@/utils/request.js'
// 向外按需导出一个API函数
// ?我搞不定ESLint，总是自己增加function()之间的空格，所以用了arrow function
export const getArticleListAPI = (_page, _limit) => {
  return request.get('articles', {
    // 请求参数
    params: {
      _page,
      _limit
    }
  })
}
