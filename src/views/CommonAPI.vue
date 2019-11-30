<template>
    <div id="common-api">
        <el-input placeholder="请输入搜索内容"
        :autofocus="true"
            v-model="search">
            <template slot="prepend">搜索：</template>
         </el-input>
        <div v-for="(item,key,index) of Publink"
            :key="index"
            class="link-container">
            <link-group :title='key' :search="search"
                :list='item'></link-group>
        </div>
        <el-link href='https://github.com/weiweiwei256/super-encourager/issues/6'>你也来分享下吧！</el-link>
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
            search:'',
            Publink: Publink
        }
    },
}
</script>
<style lang='less' scoped>
#common-api {
    height: 100%;
    text-align: center;
    .link-container {
        margin-bottom: 20px;
    }
}
</style>
