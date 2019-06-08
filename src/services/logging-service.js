class LoggingService {
    warnUnityContentRemoveNotAvailable(additionalDetails) {
        this.warn(
            "Your version of Unity does not support unloading the WebGL Player.",
            "This prevents VueUnityWebGL from unmounting this component properly.",
            "Please consider updating to Unity 2019.1 or newer, or reload the page",
            "to free the WebGL Player from the memory. See the follow link for more details:",
            "https://github.com/elraccoone/react-unity-webgl/issues/22",
            additionalDetails
        );
    }

    errorUnityLoaderNotFound(additionalDetails) {
        this.error(
            "Unable to use the Unity Loader, please make sure you've imported",
            "the Unity Loader the correct way. You might have entered an incorrect",
            "path to the UnityLoader.js. The path is not relative to your bundle,",
            "but to your index html file. See the follow link for more details: ",
            "https://github.com/elraccoone/react-unity-webgl/issues/31",
            additionalDetails
        );
    }

    warn(...messages) {
        // eslint-disable-next-line
        console.warn(messages.filter(_ => typeof _ !== "undefined").join(" "));
    }

    error(...messages) {
        // eslint-disable-next-line
        console.error(messages.filter(_ => typeof _ !== "undefined").join(" "));
    }
}

export const loggingService = new LoggingService();
