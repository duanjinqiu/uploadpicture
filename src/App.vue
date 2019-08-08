<template>
    <div id="app">
        <ul>
            <li v-for="(item, index) in arr" :key="index">
                <router-link :to="item.path">{{item.name}}</router-link>
            </li>
        </ul>
        <router-view />

    </div>
</template>

<script>
import router from "./router";
import { constantRouterMap } from "./router";

export default {
    name: "App",
    data() {
        return {
            arr: []
        };
    },
    created() {
        let _this = this;
        _this.arr = constantRouterMap;
        setTimeout(() => {
            this.$axios({
                url: "/api/getrouter",
                dataType: "json"
            }).then(res => {
                if (res.status === 200) {
                    let data = res.data;
                    let route = _this.createRoute(data);
                    console.log(...route);
                    _this.arr.push(...route);
                    router.addRoutes(route);
                }
            });
        }, 1500);
    },
    methods: {
        createRoute(routeData) {
          let userInfo = ['admin', 'edit']; //假装从登录用户信息拿到的可以浏览菜单的权限 
            let result = [];
            routeData.forEach(item => {
              if (!userInfo.includes(item.auth)) return;
                result.push({
                    path: item.path,
                    name: item.name,
                    component: () =>
                        import(`@/views/${item.component}.vue`)
                });
            });
            return result;
        }
    }
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
