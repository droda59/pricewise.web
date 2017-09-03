export class SortValueConverter {
    toView(array, propertyName, direction = "ascending") {
        var factor = direction === "ascending" ? 1 : -1;
        var sortedArray = array
            .slice(0)
            .sort((a, b) => {
                return (a[propertyName] > b[propertyName] ? 1 : -1) * factor;
            });

        return sortedArray;
    }
}