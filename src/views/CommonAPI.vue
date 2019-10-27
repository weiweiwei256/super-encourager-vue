<template>
    <div id="common-api">
        <h3>常见API</h3>
        <div v-for="(item,key,index) of Publink"
            :key="index"
            class="link-container">
            <link-group :title='key'
                :list='item'></link-group>
        </div>
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
}
</style>
