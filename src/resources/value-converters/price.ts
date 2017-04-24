export class PriceValueConverter {
    toView(value: string) {
        return `$${parseFloat(value).toFixed(2)}`;
    }
}
