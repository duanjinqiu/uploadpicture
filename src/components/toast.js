import Vue from 'vue';
import ToastComponent from './ToastComponent';
let ToastConstructor = Vue.extend(ToastComponent);
let instance = new ToastConstructor().$mount();

export default {
    install(Vue, opt) {
        Vue.prototype.$toast = (options = {}) => {
            let data;
            if (typeof options === 'string') {
                data = {
                    content: options
                }
            } else {
                data = {
                    ...options,
                    content: options.content
                }
            }
            instance.content = options.content;
            instance.duration = options.duration;
            // let instance = new ToastConstructor({
            //     data() {
            //         return data
            //     }
            // }).$mount();
            document.body.appendChild(instance.$el);
            return instance;
        }
    }
};