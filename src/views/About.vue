<template>
    <div id='about'>
        <h3>关于超级鼓励师:(super encourager)</h3>
        <p>超级鼓励师是vscode扩展，旨在"足不出户"的情况下为努力工作的程序员提供良好的周边服务。功能涉及:娱乐放松，工作辅助等方面。希望能为努力工作的您带来鼓励和帮助!</p>
        扩展源码地址：<el-link href='https://github.com/weiweiwei256/super-encourager'>https://github.com/weiweiwei256/super-encourager</el-link>
        <p>鼓励师的web渲染端基于vue框架。渲染工程已完成extension(node端)与vue前端的通信封装，node端功能模拟并封装构建部署命令，可以快捷切换前端模拟开发和扩展端真实使用，极大的提升web渲染端的展现能力和扩展能能并极大的加快研发速度。</p>
        渲染工程源码地址：<el-link href='https://github.com/weiweiwei256/super-encourager-vue'>https://github.com/weiweiwei256/super-encourager-vue</el-link>
    </div>
</template>

<script>
export default {
    name: "About",
}
</script>

<style lang='less' scoped>
#about {
    p {
        font-size: 12px;
    }
}
</style>