enum LocalStorageKey {
    language = 'language',
}

class LocalStorageService {
    saveLanguage = (language: string) => {
        this.save(LocalStorageKey.language, language);
    };

    getLanguage = (): string | null => {
        return this.get<string>(LocalStorageKey.language);
    };

    private save<T>(key: LocalStorageKey, data: T) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    private get<T>(key: LocalStorageKey): T | null {
        const data = localStorage.getItem(key);
        return data ? (JSON.parse(data) as T) : null;
    }
}

const localStorageService = new LocalStorageService();
export default localStorageService;
