# Vuenity

A Vue.js wrapper component for Unity WebGL player based on react-unity-webgl, with in and out communications.

## Installation

`npm install --save vuenity`

## Usage

```html
<template>
    <vuenity :unity-content="unityContent"></vuenity>
</template>

<script>
import Vuenity from "vuenity";

export default {
    components: { Vuenity },

    data() {
        return {
            unityContent: new UnityContent(
                "Build/your_unity_project.json",
                "Build/UnityLoader.js"
            )
        }
    }
};
</script>
```

`Build` should be in your `public` folder.