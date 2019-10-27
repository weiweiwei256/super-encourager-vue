<template>
    <div id='root'>
        <common-API></common-API>
        <div>辅助工具</div>
        <div>减压放松</div>
    </div>
</template>
<script>
import CommonAPI from '@/views/CommonAPI.vue'
export default {
  components: {
    CommonAPI
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
}
</style>
