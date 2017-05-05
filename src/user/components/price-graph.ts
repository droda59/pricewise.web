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

        for (var i = 0; i < newValue.length; i++) {
            for (var j = 0; j < newValue.length; j++) {
                var iPriceHistoryLength = newValue[i].priceHistory.length;
                var jPriceHistoryLength = newValue[j].priceHistory.length;

                if (iPriceHistoryLength > jPriceHistoryLength) {
                    var emptyPriceHistory = this.createEmptyArray(iPriceHistoryLength - jPriceHistoryLength, null);
                    newValue[j].priceHistory = emptyPriceHistory.concat(newValue[j].priceHistory);
                }
            }
        }

        newValue.forEach(product => {
            let pointColor = this.pickColor(product.hostName);
            let dataset = <Dataset>{
                label: product.title.length > 50 ? `${product.title.substring(0, 50)}...` : product.title.length,
                borderColor: pointColor,
                pointColor: pointColor,
                pointStrokeColor: "#b7b7b7",
                pointHighlightFill: "#b7b7b7",
                pointHighlightStroke: pointColor,
                data: product.priceHistory.map(x => x == null ? null : x.price)
            };

            datasets.push(dataset);
        });

        var labels = newValue.filter(x => !x.priceHistory.includes(null))[0].priceHistory.map(y => y.modifiedAt.toDateString());
        this.simpleLineData = <LineData>{
            labels: labels,
            datasets: datasets
        };
    }
    
    private createEmptyArray(size: number, value: any): Array<any> {
        var newArray = new Array(size);

        while (size) {
            newArray[--size] = value;
        }

        return newArray;
    }

    private pickColor(productUrl: string, alpha: string = "1"): string {
        var color = `rgba(220, 220, 220, ${alpha})`

        if (productUrl.includes("amazon")) {
            color = `rgba(254, 189, 105, ${alpha})`;
        } else if (productUrl.includes("bestbuy")) {
            color = `rgba(255, 242, 0, ${alpha})`;
        } else if (productUrl.includes("toysrus")) {
            color = `rgba(0, 86, 175, ${alpha})`;
        } else if (productUrl.includes("newegg")) {
            color = `rgba(247, 140, 27, ${alpha})`;
        } else if (productUrl.includes("lego")) {
            color = `rgba(194, 4, 18, ${alpha})`;
        } else if (productUrl.includes("tigerdirect")) {
            color = `rgba(254, 212, 67, ${alpha})`;
        } else if (productUrl.includes("staples")) {
            color = `rgba(204, 0, 0, ${alpha})`;
        } else if (productUrl.includes("renaud-bray")) {
            color = `rgba(46, 46, 46, ${alpha})`;
        } else if (productUrl.includes("archambault")) {
            color = `rgba(224, 0, 37, ${alpha})`;
        } else if (productUrl.includes("canadiantire")) {
            color = `rgba(235, 40, 40, ${alpha})`;
        }

        return color;
    }
}