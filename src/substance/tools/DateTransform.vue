<template>
    <div id='date-transform'>
        <span>日期:</span>
        <el-date-picker v-model="date"
            type="datetime"
            placeholder="选择日期时间">
        </el-date-picker>
        <p class="icon iconfont item"> &#xe625;</p>
        <span>时间戳(ms):</span>
        <el-input-number v-model="date"
            :min="0"
            :controls="false">
        </el-input-number>
    </div>
</template>

<script>
export default {
    name: 'date-transform',
    data() {
        return {
            date: Date.now()
        }
    }
}
</script>

<style lang="less" scoped>
#date-transform {
    text-align: center;
    .icon {
        text-align: center;
        font-size: 16px;
    }
}
</style>

