<template>
    <div class="link-group">
        <el-divider content-position="left">{{title}}</el-divider>
        <template v-for="(item,index) in list">
            <el-tooltip class='link'
                v-if='item.desc'
                :key='index'
                :content="item.desc"
                placement="top">
                <el-link :href='item.url'>{{item.name}}</el-link>
            </el-tooltip>
            <el-link :key='index'
                v-if='!item.desc'
                class='link'
                :href='item.url'>{{item.name}}</el-link>
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
}
</style>
