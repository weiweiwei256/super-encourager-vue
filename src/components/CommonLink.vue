<template>
    <div class='common-link'>
        <el-tooltip v-if='desc'
            :content="desc"
            :placement="placement">
            <el-link :href='url'>
                <slot>这是一个链接</slot>
            </el-link>
        </el-tooltip>
        <el-link v-else-if='url'
            :href='url'>
            <slot>这是一个链接</slot>
        </el-link>
        <span v-else>
            <slot>这是一个链接</slot>
        </span>
    </div>
</template>

<script>
/**
 *  兼容部分样式的link组件
 *  不存在链接的时候 显示普通文字
 *  存在链接的时候 显示链接样式  悬浮显示地址
 *  存在描述的时候 悬浮显示描述
 */
export default {
    name: 'common-link',
    props: {
        url: {
            type: String,
            required: false,
            default: '',
        },
        desc: {
            type: String,
            required: false,
            default: ''
        },
        placement: {
            type: String,
            required: false,
            default: 'top',
        }
    }
}
</script>
<style lang="less" scoped>
.common-link{
    display: inline-block;
}
</style>

