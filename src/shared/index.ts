import { PLATFORM } from "aurelia-pal";
import { FrameworkConfiguration } from "aurelia-framework";

export function configure(config: FrameworkConfiguration) {
    var elements = [
        PLATFORM.moduleName("./components/confirmation-modal"),
        PLATFORM.moduleName("./components/footer.html"),
        PLATFORM.moduleName("./components/overlay.html"),
        PLATFORM.moduleName("./components/loader.html"),
        PLATFORM.moduleName("./components/nav-bar"),
    ];

    var valueConverters = [
        PLATFORM.moduleName("./value-converters/sort"),
        PLATFORM.moduleName("./value-converters/host-name"),
    ];

    var attributes = [
    ];

    config.globalResources(
        elements.concat(valueConverters).concat(attributes)
    );
}
