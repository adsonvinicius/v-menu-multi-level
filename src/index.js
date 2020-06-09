import Vue from "vue";
import vMenuMultiLevel from "./components/v-menu-multi-level.vue";

const Components = {
    vMenuMultiLevel
};

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name]);
});

export default Components;