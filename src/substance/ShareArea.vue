<template>
    <div id='share-area'>
        <common-link class='link'
            :url='item.address'
            placement="right"
            :desc="`地址：${item.address}`">{{item.title}}</common-link>
        <span class='tips'
            style='margin-left: 2px;'
            v-if='item.english'>英</span>
        <span class='tips'
            v-if='item.block'>墙</span>
        <span style='margin-left:15px'>
            <el-tag :key="tag"
                class='tag-style'
                v-for="tag in item.tags"
                size='mini'>
                {{ tag }}
            </el-tag>
        </span>
        <p>{{item.desc}}</p>
        <common-link :url='item.user_link'
            :desc="`地址：${item.user_link}`">{{item.name}}</common-link>
        <span> 发布于：{{item.meta.createdAt|dateFormatter()}}</span>
    </div>
</template>

<script>
import CommonLink from '@/components/CommonLink.vue'
export default {
    name: "share-area",
    components: {
        CommonLink
    },
    props: {
        item: {
            type: Object,
            required: true,
        }
    },

    data() {
        return {
        }
    },
}
</script>

<style lang="less" scoped>
#share-area {
    border-style: dotted;
    border-width: 1px;
    padding: 10px 10px;
    margin-bottom: 10px;
    .tips {
        font-size: 8px;
        padding: 2px;
        border-style: dotted;
        border-width: 1px;
        margin-left: 2px;
    }
    .tag-style {
        margin-left: 5px;
    }
}
</style>

