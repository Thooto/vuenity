# Vuenity

A Vue.js wrapper component for Unity WebGL player based on [react-unity-webgl](https://www.npmjs.com/package/react-unity-webgl), with in and out communications.

## Installation

`npm install --save vuenity`

## Usage

```html
<template>
    <vuenity :unity-content="unityContent"></vuenity>
    <p>{{ message }}</p>
</template>

<script>
    import Vuenity, { UnityContent } from "vuenity";


    export default {
        components: { Vuenity },

        data() {
            return {
                unityContent: new UnityContent(
                    "Build/your_unity_project.json||http://localhost:1000/file.json",
                    "Build/UnityLoader.js||http://localhost:1000/UnityLoader.js"
                ),
                message: undefined
            };
        },

        mounted() {
            this.unityContent.on("NiceWords", message => {
                this.message = message;
            });

            this.unityContent.message("HelloWorld", "Some nice words");
        }
    };
</script>
```

`Build` folder should be in your `public` folder.
In case you use something like Laravel + Vue.js and webpack, use an address instead of a direct folder ref. 

In your Unity project, under `Assets/Plugins/WebGL/` (or anywhere else in assets) create a `VuePlugin.jslib` with:

```js
mergeInto(LibraryManager.library,
    NiceWords: function(message) {
        VueUnityWebGL.NiceWords(message);
    }
});
```

And finally, in one of your `C#` scripts:

```cs
using UnityEngine;
using System.Runtime.InteropServices;

public class GameController : MonoBehaviour {
    [DllImport("__Internal")]
    private static extern void NiceWords(string message);
    
    public void NiceWords (string message) {
        NiceWords(message);
    }
}

```