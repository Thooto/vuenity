import { loggingService } from "./services/logging-service";

export default class UnityContent {
    static uniqueID = 0;

    constructor(buildJsonPath, unityLoaderJsPath, unityConfig) {
        const _unityConfig = unityConfig || {};
        this.buildJsonPath = buildJsonPath;
        this.unityLoaderJsPath = unityLoaderJsPath;
        this.uniqueID = ++UnityContent.uniqueID;

        this.unityEvents = [];
        this.unityConfig = {
            modules: _unityConfig.modules || {},
            unityVersion: _unityConfig.unityVersion || "undefined",
            adjustOnWindowResize: _unityConfig.adjustOnWindowResize,
            id: _unityConfig.id || "nill"
        };

        if (typeof window.VueUnityWebGL === "undefined")
            window.VueUnityWebGL = {};
    }

    setComponentInstance(unityComponentInstance) {
        this.unityComponent = unityComponentInstance;
    }

    setUnityInstance(unityInstance) {
        this.unityInstance = unityInstance;
    }

    setFullscreen(fullscreen) {
        if (this.unityInstance != null) {
            this.unityInstance.SetFullscreen(fullscreen === true ? 1 : 0);
        }
    }

    remove() {
        if (
            typeof this.unityInstance !== "undefined" &&
            typeof this.unityInstance.Quit === "function"
        )
            return this.unityInstance.Quit(() => {
                this.triggerUnityEvent("quitted");
                this.unityInstance = undefined;
            });

        return loggingService.warnUnityContentRemoveNotAvailable();
    }

    send(gameObjectName, methodName, parameter) {
        if (this.unityInstance != null) {
            if (typeof parameter === "undefined") {
                this.unityInstance.SendMessage(gameObjectName, methodName);
            } else {
                this.unityInstance.SendMessage(
                    gameObjectName,
                    methodName,
                    parameter
                );
            }
        }
    }

    on(eventName, eventCallback) {
        this.unityEvents.push({
            eventName: eventName,
            eventCallback: eventCallback
        });

        window.VueUnityWebGL[eventName] = parameter => {
            return eventCallback(parameter);
        };
    }

    triggerUnityEvent(eventName, eventValue) {
        for (let _i = 0; _i < this.unityEvents.length; _i++)
            if (this.unityEvents[_i].eventName === eventName)
                this.unityEvents[_i].eventCallback(eventValue);
    }
}
