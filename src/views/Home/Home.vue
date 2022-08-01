<template>
  <div class="home-container">
    <!-- Header -->
    <van-nav-bar title="黑马头条" fixed />
  </div>
</template>

<script>
export default {
  name: 'Home'
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
