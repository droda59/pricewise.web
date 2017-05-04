import { bindable } from "aurelia-framework";
import { Coordinates } from "../../resources/models/coordinates";
import { LineData, Dataset } from "../../resources/models/line-data";
import { ProductHistory } from "../../models/product-history";

export class PriceGraph {
    @bindable data: Array<ProductHistory>;
    
    simpleLineData: LineData;
    nativeOptions: any = {};

    constructor() {
        this.simpleLineData = <LineData>{
            labels: [],
            datasets: []
        };

        this.nativeOptions = { showLines: true, elements: { line: { fill: false, tension: 0 } }, segmentStrokeColor: '#fff', segmentStrokeWidth: 2 };
    }

    private dataChanged(newValue: Array<ProductHistory>): void {
        var datasets = new Array<Dataset>();

        newValue.forEach(product => {
            let pointColor = this.pickColor(product.url);
            let dataset = <Dataset>{
                label: product.title.length > 50 ? `${product.title.substring(0, 50)}...` : product.title.length,
                backgroundColor: this.pickColor(product.url, "0.2"),
                borderColor: pointColor,
                pointColor: pointColor,
                pointStrokeColor: "#b7b7b7",
                pointHighlightFill: "#b7b7b7",
                pointHighlightStroke: pointColor,
                data: product.priceHistory.map(x => x.price)
            };

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

    private pickColor(productUrl: URL, alpha: string = "1"): string {
        var color = `rgba(220, 220, 220, ${alpha})`
        var hostName = productUrl.hostname;

        if (hostName.includes("amazon")) {
            color = `rgba(254, 189, 105, ${alpha})`;
        } else if (hostName.includes("bestbuy")) {
            color = `rgba(255, 242, 0, ${alpha})`;
        } else if (hostName.includes("toysrus")) {
            color = `rgba(0, 86, 175, ${alpha})`;
        } else if (hostName.includes("newegg")) {
            color = `rgba(247, 140, 27, ${alpha})`;
        } else if (hostName.includes("lego")) {
            color = `rgba(194, 4, 18, ${alpha})`;
        } else if (hostName.includes("tigerdirect")) {
            color = `rgba(254, 212, 67, ${alpha})`;
        } else if (hostName.includes("staples")) {
            color = `rgba(204, 0, 0, ${alpha})`;
        }

        return color;
    }
}