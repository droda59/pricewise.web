export class PriceValueConverter {
    toView(value: string) {
        return `$${value}`;
    }
}
