<template>
    <div id="assit">
        <div>
            <h3>常见API</h3>
            <div v-for="(item,key,index) of Publink"
                :key="index"
                class="link-container">
                <link-group :title='key'
                    :list='item'></link-group>
            </div>
        </div>
    </div>
</template>

<script>
import Publink from '@/config/pub-link.json'
import LinkGroup from '@/components/LinkGroup.vue'
export default {
  name: 'Assit',
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
  computed: {},
  created() {
    console.log(Publink);
  },
  methods: {

  },
}
</script>
<style lang='less' scoped>
#assit {
    height: 100%;
}
</style>
