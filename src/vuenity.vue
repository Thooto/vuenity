<template>
    <div
        ref="wrapper"
        :id="`__VueUnityWebGL_${this.unityContent.uniqueID}__`"
        :width="width || '800px'"
        :height="height || '600px'"
    >
        <div id="unityPlayer"></div>
    </div>
</template>

<script>
import UnityLoaderService from "./services/unity-loader-service";

export default {
    name: "vuenity",

    props: ["unityContent", "width", "height"],

    data() {
        return {
            unityLoaderService: new UnityLoaderService(),
            onWindowResizeBinding: this.onWindowResize.bind(this),
            state: {}
        };
    },

    mounted() {
        this.unityContent.setComponentInstance(this);

        window.addEventListener("resize", this.onWindowResizeBinding);

        this.unityLoaderService.append(
            this.unityContent.unityLoaderJsPath,
            () => {
                this.unityContent.setUnityInstance(
                    // eslint-disable-next-line
                    UnityLoader.instantiate(
                        `__VueUnityWebGL_${this.unityContent.uniqueID}__`,
                        this.unityContent.buildJsonPath,
                        {
                            onProgress: this.onProgress.bind(this),
                            Module: this.unityContent.unityConfig.modules,
                            width: "100%",
                            height: "100%"
                        }
                    )
                );
            }
        );
    },

    beforeDestroy() {
        this.unityContent.remove();
        window.removeEventListener("resize", this.onWindowResizeBinding);
    },

    methods: {
        onProgress(unityInstance, progression) {
            this.unityContent.triggerUnityEvent("progress", progression);
            if (progression == 1) this.unityContent.triggerUnityEvent("loaded");
        },

        onWindowResize() {
            if (this.unityContent.unityConfig.adjustOnWindowResize === true) {
                this.unityContent.triggerUnityEvent("resized");
                this.adjustCanvasToContainer();
            }
        },

        adjustCanvasToContainer() {
            const width = this.$refs.wrapper.offsetWidth;
            const height = this.$refs.wrapper.offsetHeight;

            const canvas = this.$refs.wrapper.getElementsByTagName("canvas")[0];

            if (canvas !== null) {
                if (canvas.height !== height) canvas.height = height;
                if (canvas.width !== width) canvas.width = width;
            }
        }
    }
};
</script>

<style>
</style>
