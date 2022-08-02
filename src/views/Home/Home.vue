<template>
  <div class="home-container">
    <!-- Header -->
    <van-nav-bar title="黑马头条" fixed />

    <!-- 导入、注册并使用ArticleInfo 组件-->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ArticleInfo
        v-for="item in artList"
        :key="item.id"
        :title="item.title"
        :author="item.aut_name"
        :cmt-count="item.comm_count"
        :time="item.pubdate"
        :cover="item.cover"
      ></ArticleInfo>
    </van-list>
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
      artList: [],
      // 是否正在加载下一页数据，如果loading为true，则不会反复出发load事件。
      // 每当下一页数据请求回来之后，把loading从true改为false。
      // 为了让它不至于一进页面就加载，把它设为true。
      loading: true,
      // 所有数据是否加载完毕了，如果没有更多数据了，一定要把finished改成true
      finished: false
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
      // 如果是上拉加载更多,那么:
      // this.artList = [旧数据在前, 新数据在后]
      this.artList = [...this.artList, ...res]
      this.loading = false
      if (res.length === 0) {
        // 证明没有下一页数据了,直接把finished改为true,表示数据加载完了
        this.finished = true
      }
    },
    // 只要onLoad被调用，就应该请求下一页数据
    onLoad() {
      console.log('onLoad')
      // 1  让页码值+1
      this.page++
      // 2 重新请求接口获取数据
      this.initArticleList()
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
