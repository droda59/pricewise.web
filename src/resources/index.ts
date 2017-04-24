import { PLATFORM } from "aurelia-pal";
import { FrameworkConfiguration } from "aurelia-framework";

export function configure(config: FrameworkConfiguration) {
    var elements = [
        PLATFORM.moduleName("./components/confirmation-modal.html"),
    ];

    var valueConverters = [
        PLATFORM.moduleName("./value-converters/price"),
        PLATFORM.moduleName("./value-converters/time-ago"),
        PLATFORM.moduleName("./value-converters/host-name"),
    ];

    var attributes = [
    ];

    config.globalResources(
        elements.concat(valueConverters).concat(attributes)
    );
}
