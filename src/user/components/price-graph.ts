import { bindable } from "aurelia-framework";
import { Coordinates } from "../../resources/models/coordinates";
import { LineData, Dataset } from "../../resources/models/line-data";
import { Deal } from "../../models/deal";

export class PriceGraph {
    @bindable data: Array<Deal>;
    
    simpleLineData: LineData;

    constructor() {
        this.simpleLineData = <LineData>{
            labels: [],
            datasets: []
        };
    }

    private dataChanged(newValue: Array<Deal>): void {
        var datasets = new Array<Dataset>();

        const uniqueProducts = new Set(newValue.map(item => item.productUrl));
        uniqueProducts.forEach(element => {
            let dataset = <Dataset>{
                label: newValue.filter(x => x.productUrl === element)[0].title,
                backgroundColor: "rgba(220,220,220,0.2)",
                borderColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#b7b7b7",
                pointHighlightFill: "#b7b7b7",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: []
            };

            newValue.filter(x => x.productUrl === element).forEach(x => dataset.data.push(x.price));

            datasets.push(dataset);
        });

        this.simpleLineData = <LineData>{
            labels: newValue.map(x => x.modifiedAt.toDateString()),
            datasets: datasets
        };
    }
}