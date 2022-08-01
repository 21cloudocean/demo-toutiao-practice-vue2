<template>
  <div class="home-container">
    <!-- Header -->
    <van-nav-bar title="黑马头条" fixed />

    <!-- 导入、注册并使用ArticleInfo 组件-->
    <p>{{ artList.length }}</p>
    <ArticleInfo v-for="item in artList" :key="item.id"></ArticleInfo>
  </div>
</template>

<script>
// 按需导入API接口
import { getArticleListAPI } from '@/api/articleAPI.js'
// 导入需要的组件
import ArticleInfo from '@/components/Article/ArticleInfo.vue'

export default {
  name: 'Home',
  data() {
    return {
      // 页码值
      page: 1,
      // 每页有多少数据
      limit: 10,
      // 文章的数组
      artList: []
    }
  },
  created() {
    this.initArticleList()
  },
  methods: {
    // 封装获取列表数据的方法
    async initArticleList() {
      // 发起GET请求，获取文章的列表数据
      const { data: res } = await getArticleListAPI(this.page, this.limit)
      this.artList = res
    }
  },
  components: {
    ArticleInfo
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding: 46px 0 50px 0;

  .van-nav-bar {
    background-color: #007bff;
  }
  /deep/ .van-nav-bar__title {
    color: white;
  }
}
</style>
