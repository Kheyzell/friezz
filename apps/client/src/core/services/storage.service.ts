type StorageData<T> = {
    key: string;
    data: T;
};

class StorageService {
    save<T>(key: string, data: T): void {
        const storageData: StorageData<T> = { key, data };
        localStorage.setItem(key, JSON.stringify(storageData));
    }

    get<T>(key: string): T | null {
        const storageData = localStorage.getItem(key);

        if (storageData) {
            const parsedData: StorageData<T> = JSON.parse(storageData);
            return parsedData.data;
        }

        return null;
    }
}

const storageService = new StorageService();
export default storageService;
