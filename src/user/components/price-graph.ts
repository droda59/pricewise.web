import { bindable } from "aurelia-framework";
import { Coordinates } from "../../resources/models/coordinates";
import { LineData, Dataset } from "../../resources/models/line-data";
import { ProductHistory } from "../../models/product-history";

export class PriceGraph {
    @bindable data: Array<ProductHistory>;
    
    simpleLineData: LineData;

    constructor() {
        this.simpleLineData = <LineData>{
            labels: [],
            datasets: []
        };
    }

    private dataChanged(newValue: Array<ProductHistory>): void {
        var datasets = new Array<Dataset>();

        // const uniqueProducts = new Set(newValue.map(item => item.productUrl));
        newValue.forEach(element => {
            let dataset = <Dataset>{
                label: element.title,
                backgroundColor: "rgba(220,220,220,0.2)",
                borderColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#b7b7b7",
                pointHighlightFill: "#b7b7b7",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: element.priceHistory.map(x => x.price)
            };

            // newValue.filter(x => x.productUrl === element).forEach(x => dataset.data.push(x.price));

            datasets.push(dataset);
        });

        var labels = new Array<string>();
        newValue.forEach(element => {
            labels = [...element.priceHistory.map(x => x.modifiedAt.toDateString())]
        });

        this.simpleLineData = <LineData>{
            labels: labels,
            datasets: datasets
        };
    }
}