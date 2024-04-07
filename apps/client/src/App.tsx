import 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import './App.css';
import './i18n/i18next.config';
import { HomePage } from './pages/HomePage';
import { LinksPage } from './pages/LinksPage/LinksPage';
import { ReviewPage } from './pages/ReviewPage/ReviewPage';
import { SaveAnswersPage } from './pages/SaveAnswersPage/SaveAnswersPage';
import { SaveQuestionnairePage } from './pages/SaveQuestionnairePage/SaveQuestionnairePage';
import { ScoresPage } from './pages/ScoresPage/ScoresPage';

function App() {
    const { t } = useTranslation();

    return (
        <BrowserRouter>
            <div>
                <Toaster richColors position="top-center" />

                <nav>
                    <ul>
                        <li>
                            <Link
                                className="block max-w-md mx-auto w-full py-1 bg-slate-600 rounded-2xl text-white cursor-pointer"
                                to="/"
                            >
                                {t('home')}
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="max-w-md mx-auto mt-4">
                    <Routes>
                        <Route
                            path="/questionnaire/create"
                            element={<SaveQuestionnairePage isCreation={true} />}
                        />
                        <Route
                            path="/questionnaire/edit/:questionnaireName"
                            element={<SaveQuestionnairePage />}
                        />

                        <Route
                            path="/questionnaire/:questionnaireId/links"
                            element={<LinksPage />}
                        />

                        <Route
                            path="/questionnaire/:questionnaireId/participant/:participantName"
                            element={<SaveAnswersPage />}
                        />

                        <Route
                            path="/questionnaire/:questionnaireId/review"
                            element={<ReviewPage />}
                        />

                        <Route
                            path="/questionnaire/:questionnaireId/scores"
                            element={<ScoresPage />}
                        />
                        <Route path="/" element={<HomePage />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
