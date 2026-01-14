export class StorageApi<T> {
    readonly path: string;
    readonly defaultValue: T;

    constructor(path: string, defaultValue: T) {
        this.path = path;
        this.defaultValue = defaultValue;
    }

    get(): T {
        try {
            const data = JSON.parse(localStorage.getItem(this.path) || '');

            return data || this.defaultValue;
        } catch (error) {
            return this.defaultValue;
        }
    }

    save(data: T) {
        localStorage.setItem(this.path, JSON.stringify(data));
    }
}
