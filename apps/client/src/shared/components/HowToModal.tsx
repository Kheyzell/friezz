import { FC } from 'react';
import { Trans } from 'react-i18next';
import { FiClipboard, FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import Modal from 'react-modal';

type HowToProps = {
    isModalOpen: boolean;
    onCloseModal?: () => void;
};
export const HowToModal: FC<HowToProps> = ({ isModalOpen, onCloseModal }) => {
    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={onCloseModal}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-200 rounded-2xl p-4 max-h-[80%] max-w-[80%] w-max overflow-auto"
        >
            <div className="whitespace-pre-line" onClick={onCloseModal}>
                <Trans
                    i18nKey={'howTo.explanation'}
                    components={{
                        ClipboardIcon: (
                            <div className="inline-flex p-1 rounded bg-green-500 text-white">
                                <FiClipboard />
                            </div>
                        ),
                        ThumbsUpIcon: <FiThumbsUp className="inline text-green-500" />,
                        ThumbsDownIcon: <FiThumbsDown className="inline text-red-500" />,
                    }}
                />
            </div>
        </Modal>
    );
};
