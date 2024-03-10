import React, { useState } from 'react';
import { FormInput } from './FormInput';
import { Title } from './Title';
import { RemoveButton } from './buttons/RemoveButton';

type MultipleTextsInputProps = {
    title: string;
    initialTexts?: string[];
    onTextsChange: (texts: string[]) => void;
    isFirstInputDisabled?: boolean; // @Todo: handle this outside of the component
};

export const MultipleTextsInput: React.FC<MultipleTextsInputProps> = ({
    title,
    initialTexts = [],
    onTextsChange,
    isFirstInputDisabled,
}) => {
    const [texts, setTexts] = useState<string[]>([...initialTexts, '']);

    const handleTextChange = (index: number, text: string) => {
        const updatedTexts = [...texts];
        updatedTexts[index] = text;
        onTextsChange(updatedTexts.filter(Boolean));

        const isLast = index === texts.length - 1;
        if (isLast) {
            updatedTexts.push('');
        }

        setTexts(updatedTexts);
    };

    const handleRemoveText = (removeIndex: number) => {
        setTexts((prevTexts) => {
            const newTexts = [...prevTexts];
            newTexts.splice(removeIndex, 1);
            onTextsChange(newTexts.filter(Boolean));
            return newTexts;
        });
    };

    return (
        <div>
            <Title> {title} </Title>

            {texts.map((text, index) => {
                const isNotFirstOrLast = index > 0 && index < texts.length - 1;
                return (
                    <div key={index} className="flex items-center mb-2" >
                        <FormInput
                            value={text}
                            onChange={(text) => handleTextChange(index, text)}
                            placeholder={`${title} ${index + 1}`}
                            disabled={isFirstInputDisabled && index === 0}
                        />

                        {isNotFirstOrLast && (
                            <RemoveButton onClick={() => handleRemoveText(index)} />
                        )}
                    </div>
                );
            })}
        </div>
    );
};
