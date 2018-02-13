export class LineData {
    labels: Date[] = [];
    datasets: Dataset[] = [];
}

export class Dataset {
    label: string;
    backgroundColor: string;
    borderColor: string;
    pointColor: string;
    pointStrokeColor: string;
    pointHighlightFill: string;
    pointHighlightStroke: string;
    data: number[];
}