<template>
    <div id='promotion'>
        这是推广页
        <div v-if='projects.length'>
            <share-area :item='projects[0]'></share-area>
        </div>
    </div>
</template>

<script>
import ShareArea from '@/substance/ShareArea.vue'
export default {
    name: "promotion",
    components: {
        ShareArea
    },
    data() {
        return {
            projects: [],
        }
    },
    created() {
        this.axios.get(`/projects`).then(data => {
            this.projects = data.data.data.projects;
            console.log(this.projects)
        })
    }
}
</script>

<style lang="less" scoped>
</style>

