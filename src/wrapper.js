import Vuenity from "./vuenity.vue";
import UnityContent from "./unity-content";


export function install(Vue) {
    if (install.installed) return;
    install.installed = true;
    Vue.component("Vuenity", Vuenity);
}

const plugin = {
    install
};

let GlobalVue = null;

if (typeof window !== "undefined") {
    GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
    GlobalVue = global.Vue;
}

if (GlobalVue) {
    GlobalVue.use(plugin);
}

export default Vuenity;
export { Vuenity, UnityContent }

//export { UnityContent } from "./unity-content";
