<template>
    <div class="link-group">
        <el-divider content-position="left">{{title}}</el-divider>
        <template v-for="(item,index) in list">
            <div style='display:inline'
                :key='index'
                v-show='search.length===0||item.name.includes(search)'>
                <el-tooltip class='link'
                    v-if='item.desc'
                    :content="item.desc"
                    placement="top">
                    <el-link :href='item.url'>{{item.name}}</el-link>
                </el-tooltip>
                <el-link v-if='!item.desc'
                    class='link'
                    :href='item.url'>{{item.name}}</el-link>
                <span class='new-style'
                    v-show="item.isNew">*</span>
            </div>
        </template>
    </div>
</template>

<script>

export default {
    name: 'Encourager',
    components: {
    },
    props: {
        title: {
            type: String,
            required: false,
            default: '标题'
        },
        list: {
            type: Array,
            required: false,
            default: () => []
        },
        search: {
            type: String,
            required: false,
            default: ''
        }
    },
    data() {
        return {
        }
    },
}
</script>
<style lang='less' scoped>
.link-group {
    .link {
        margin-left: 20px;
    }
    .new-style {
        color: red;
    }
}
</style>
