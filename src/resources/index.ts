import { PLATFORM } from "aurelia-pal";
import { FrameworkConfiguration } from "aurelia-framework";

export function configure(config: FrameworkConfiguration) {
    var elements = [
    ];

    var valueConverters = [
        PLATFORM.moduleName("./value-converters/price"),
        PLATFORM.moduleName("./value-converters/time-ago"),
    ];

    var attributes = [
    ];

    config.globalResources(
        elements.concat(valueConverters).concat(attributes)
    );
}
