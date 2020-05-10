import vue from "rollup-plugin-vue";
import buble from "rollup-plugin-buble";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";

export default {
    input: "src/wrapper.js",
    output: {
        name: "Vuenity",
        exports: "named"
    },
    plugins: [
        babel({ presets: ["@babel/preset-env"], plugins: ["@babel/plugin-proposal-class-properties"] }),
        vue({
            css: true,
            compileTemplate: true
        }),
        commonjs(),
        buble()
    ]
};
