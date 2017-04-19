export class HostNameValueConverter {
    toView(value: string) {
        return new URL(value).hostname;
    }
}