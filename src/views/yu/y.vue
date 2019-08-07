<template>
    <div @click="pp">
        <ul>
            <li>{{ppData.name}}</li>
           
        </ul>
        <div>
            <h5>{{hei.name}}</h5>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            ppData: {
                name: ''
            },
            hei: {
                default: {name: 'Bob'}
            }
        },
        methods: {
            pp() {
                this.$emit('qu', this.hei);
            }
        }
    }
</script>

<style scoped>

</style>