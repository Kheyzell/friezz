import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const LangSelector: FC = () => {
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;

    const onFlagClick = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    return (
        <div className="flex items-center">
            <button
                className={currentLanguage !== 'en' ? 'opacity-60' : ''}
                onClick={() => onFlagClick('en')}
                title="English"
            >
                EN
            </button>
            <button
                className={currentLanguage !== 'fr' ? 'opacity-60' : ''}
                onClick={() => onFlagClick('fr')}
                title="Français"
            >
                FR
            </button>
        </div>
    );
};

export default LangSelector;
