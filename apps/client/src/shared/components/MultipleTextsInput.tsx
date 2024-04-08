import { FC, ReactElement, useState } from 'react';
import { FormInput, FormTextarea } from './FormInput';
import { Title } from './Title';
import { RemoveButton } from './buttons/RemoveButton';

type MultipleInputProps = {
    title: string;
    initialTexts?: string[];
    onTextsChange: (texts: string[]) => void;
};

type RenderInput = (
    text: string,
    index: number,
    handleTextChange: (index: number, text: string) => void,
) => ReactElement;
type MultipleInputListProps = MultipleInputProps & { renderInput: RenderInput };
/** Generic list of inputs component that takes a [renderInput] function to render the element of list
 * those elements are fed with [text], [index] and [handleTextChange] props */
const MultipleInputList: FC<MultipleInputListProps> = ({
    title,
    initialTexts = [],
    renderInput,
    onTextsChange,
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
                    <div key={index} className="flex items-center mb-2">
                        {renderInput(text, index, handleTextChange)}

                        {isNotFirstOrLast && (
                            <RemoveButton onClick={() => handleRemoveText(index)} />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export const MultipleTextsInput: FC<MultipleInputProps> = (props) => (
    <MultipleInputList
        {...props}
        renderInput={(text, index, handleTextChange) => (
            <FormInput
                value={text}
                onChange={(text) => handleTextChange(index, text)}
                placeholder={`${props.title} ${index + 1}`}
            />
        )}
    />
);

export const MultipleTextarea: FC<MultipleInputProps> = (props) => (
    <MultipleInputList
        {...props}
        renderInput={(text, index, handleTextChange) => (
            <FormTextarea
                value={text}
                onChange={(text) => handleTextChange(index, text)}
                placeholder={`${props.title} ${index + 1}`}
            />
        )}
    />
);
