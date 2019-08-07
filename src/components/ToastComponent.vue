<template>
    <div class="toast-container">
        <slot>{{content}}</slot>
    </div>
</template>

<script>
export default {
    name: "ToastComponent",
    data() {
        return {
            duration: 1500,
            content: ""
        };
    },
    methods: {
        refresh(a) {
            this.content = a;
        }
    },
    mounted() {
        setTimeout(() => {
            this.$destroy(true);
            this.$el.parentNode.removeChild(this.$el);
        }, this.duration);
    }
};
</script>

<style scoped>
.toast-container {
    position: fixed;
    left: 50%;
    top: 50%;
    padding: 13px 16px;
    transform: translate3d(-50%, -50%, 0);
    color: #ccc;
    background-color: rgba(37, 38, 45, 0.9);
}
</style>