import 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import './App.css';
import { HomePage } from './pages/HomePage';
import { ReviewPage } from './pages/ReviewPage/ReviewPage';
import { AnswersPage } from './pages/SaveAnswersPage/AnswersPage';
import { SaveQuestionnairePage } from './pages/SaveQuestionnairePage/SaveQuestionnairePage';
import { ScoresPage } from './pages/ScoresPage/ScoresPage';

function App() {
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
                                Home
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="max-w-md mx-auto mt-4">
                    <Routes>
                        <Route path="/questionnaire/create" element={<SaveQuestionnairePage isCreation={true} />} />
                        <Route
                            path="/questionnaire/edit/:questionnaireName"
                            element={<SaveQuestionnairePage />}
                        />

                        <Route
                            path="/questionnaire/:questionnaireId/participant/:participantName"
                            element={<AnswersPage />}
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
