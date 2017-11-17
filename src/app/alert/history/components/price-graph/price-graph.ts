import { autoinject, bindable } from "aurelia-framework";
import { I18N } from "aurelia-i18n";
import { Coordinates } from "./models/coordinates";
import { LineData, Dataset } from "./models/line-data";
import { ProductHistory } from "../../../../shared/models/product-history";
import { SourcesService } from "../../../../../shared/services/sources-service";

@autoinject()
export class PriceGraph {
    @bindable data: Array<ProductHistory>;

    private _sourcesService: SourcesService;

    simpleLineData: LineData;
    nativeOptions: any = {};

    constructor(sourcesService: SourcesService, i18n: I18N) {
        this._sourcesService = sourcesService;
        this.simpleLineData = <LineData>{
            labels: [],
            datasets: []
        };

        var dateFormat = i18n.df({
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          });

        this.nativeOptions = {
            showLines: true,
            elements: {
                line: {
                    fill: false,
                    tension: 0
                }
            },
            scales: {
                xAxes: [
                    {
                        ticks: {
                            callback: function(label, index, labels) {
                                if (index % 2 !== 0) {
                                    return "";
                                }

                                return dateFormat.format(new Date(label));
                            }
                        }
                    }
                ]
            },
            segmentStrokeColor: '#fff',
            segmentStrokeWidth: 2
        };
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
            let pointColor = this.pickColor(product);
            let dataset = <Dataset>{
                label: product.source.name,
                borderColor: pointColor,
                pointColor: pointColor,
                pointStrokeColor: "#b7b7b7",
                pointHighlightFill: "#b7b7b7",
                pointHighlightStroke: pointColor,
                data: product.priceHistory.map(x => x == null ? null : x.price)
            };

            datasets.push(dataset);
        });

        var labels = newValue.filter(x => !x.priceHistory.includes(null))[0].priceHistory.map(y => y.modifiedAt);
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

    private pickColor(product: ProductHistory): string {
        var color = "rgb(220, 220, 220)";

        if (product.source != null) {
            color = product.source.color;
        }

        return color;
    }
}
