<template>
    <div>
        <div id="box" 
            :style="`transform: translate3d(${box.boxOffsetX}px, ${box.boxOffsetY}px, 0)`"
            @touchstart="mouseStart"
            @touchmove="mouseMove"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            box: {
                boxOffsetX: 0,
                boxOffsetY: 0,
                lastBoxOffsetX: 0,
                lastBoxOffsetY: 0
            },
            mouse: {
                mouseStartX: 0,
                mouseStartY: 0,
                mouseMoveX: 0,
                mouseMoveY: 0
            }
        };
    },
    computed: {
        boxX() {
            return this.box.lastBoxOffsetX + this.mouse.mouseMoveX - this.mouse.mouseStartX;
        }
    },
    methods: {
        mouseStart(e) {
            this.mouse.mouseStartX =
                e.type === "touchstart" ? e.targetTouches[0].pageX : e.pageX;
            this.mouse.mouseStartY =
                e.type === "touchstart" ? e.targetTouches[0].pageY : e.pageY;
            this.box.lastBoxOffsetX = this.box.boxOffsetX;
            this.box.lastBoxOffsetY = this.box.boxOffsetY;
        },
        mouseMove(e) {
            this.mouse.mouseMoveX =
                e.type === "touchmove" ? e.targetTouches[0].pageX : e.pageX;
            this.mouse.mouseMoveY =
                e.type === "touchmove" ? e.targetTouches[0].pageY : e.pageY;
            this.box.boxOffsetX = this.box.lastBoxOffsetX + this.mouse.mouseMoveX - this.mouse.mouseStartX;
            this.box.boxOffsetY = this.box.lastBoxOffsetY + this.mouse.mouseMoveY - this.mouse.mouseStartY;
        }
    }
};
</script>

<style scoped>
#box {
    width: 50px;
    height: 50px;
    background-color: aquamarine;
}
</style>