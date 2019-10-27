<template>
    <div id='root'>
        <encourager></encourager>
        <common-API></common-API>
        <div>辅助工具</div>
        <div>减压放松</div>
    </div>
</template>
<script>
import CommonAPI from '@/views/CommonAPI.vue'
import Encourager from '@/views/Encourager.vue'
export default {
  components: {
    CommonAPI,
    Encourager
  },
  data() {
    return {
    };
  }
};
</script>
<style lang='less'>
html,
body,
#app,
#root,
.main {
    height: 100%;
    margin: 0;
}
</style>
