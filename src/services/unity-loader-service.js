import { loggingService } from "./logging-service";

export default class {
    constructor() {
        this.documentHead = document.getElementsByTagName("head")[0];
    }

    append(source, onLoad) {
        if (typeof this.unityLoaderScript !== "undefined")
            if (source === this.unityLoaderScript.src) {
                return onLoad();
            } else {
                this.unityLoaderScript.remove();
            }

        window
            .fetch(source)
            .then(_response => {
                if (_response.status >= 400)
                    return loggingService.errorUnityLoaderNotFound(
                        _response.status
                    );
                _response
                    .text()
                    .then(_text => {
                        if (_text.trim().charAt(0) === "<")
                            return loggingService.errorUnityLoaderNotFound(
                                "error doc"
                            );
                        this.unityLoaderScript = document.createElement(
                            "script"
                        );
                        this.unityLoaderScript.type = "text/javascript";
                        this.unityLoaderScript.async = true;
                        this.unityLoaderScript.src = source;
                        this.unityLoaderScript.onload = () => {
                            if (typeof window.UnityLoader === "undefined")
                                return loggingService.errorUnityLoaderNotFound();
                            onLoad();
                        };
                        this.documentHead.appendChild(this.unityLoaderScript);
                    })
                    .catch(_reason =>
                        loggingService.errorUnityLoaderNotFound(_reason)
                    );
            })
            .catch(_reason => loggingService.errorUnityLoaderNotFound(_reason));
    }
}
