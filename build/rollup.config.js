import vue from "rollup-plugin-vue";
import buble from "rollup-plugin-buble";
import commonjs from "rollup-plugin-commonjs";

export default {
    input: "src/wrapper.js",
    output: {
        name: "Vuenity",
        exports: "named"
    },
    plugins: [
        commonjs(),
        vue({
            css: true,
            compileTemplate: true
        }),
        buble()
    ]
};
