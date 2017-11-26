import { PLATFORM } from "aurelia-pal";
import { FrameworkConfiguration } from "aurelia-framework";

export function configure(config: FrameworkConfiguration) {
    var elements = [
        PLATFORM.moduleName("./components/confirmation-modal"),
        PLATFORM.moduleName("./components/footer/footer"),
        PLATFORM.moduleName("./components/overlay.html"),
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
