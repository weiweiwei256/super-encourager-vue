<template>
    <div id="common-api">
        <div v-for="(item,key,index) of Publink"
            :key="index"
            class="link-container">
            <link-group :title='key'
                :list='item'></link-group>
        </div>
        <p>当前的API是RUNNERUP觉得不错的,也真诚希望你也来分享下常用的API </p>
        <p> 地址:<el-link href='https://github.com/weiweiwei256/super-encourager/issues/6'>github的issues下面回复即可.</el-link>
        </p>
        <p>下个版本将会引入并留下推荐者的名字</p>
    </div>
</template>

<script>
import Publink from '@/config/pub-link.json'
import LinkGroup from '@/components/LinkGroup.vue'
export default {
  name: 'common-api',
  components: {
    LinkGroup
  },
  props: {
  },
  data() {
    return {
      Publink: Publink
    }
  },
}
</script>
<style lang='less' scoped>
#common-api {
    height: 100%;
    text-align: center;
}
</style>
