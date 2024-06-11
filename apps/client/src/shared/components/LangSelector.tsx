import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import enLogo from '../../../public/gb.png';
import frLogo from '../../../public/fr.png';

/** Component for globally selecting the language of the app. */
const LangSelector: FC = () => {
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;

    const onFlagClick = (lang: string) => {
        i18n.changeLanguage(lang);
    };

    return (
        <div className="flex items-center gap-2">
            <button
                className={currentLanguage !== 'en' ? 'opacity-50' : ''}
                onClick={() => onFlagClick('en')}
                title="English"
            >
                <img src={enLogo} />
            </button>
            <button
                className={currentLanguage !== 'fr' ? 'opacity-50' : ''}
                onClick={() => onFlagClick('fr')}
                title="Français"
            >
                <img src={frLogo} />
            </button>
        </div>
    );
};

export default LangSelector;
