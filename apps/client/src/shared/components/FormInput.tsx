import { DetailedHTMLProps, FC, InputHTMLAttributes, Ref, useEffect, useRef } from 'react';

type FormInputProps = Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'onChange'
> & {
    inputRef?: Ref<HTMLInputElement>;
    onChange?: (text: string) => void;
};
export const FormInput: FC<FormInputProps> = ({
    inputRef,
    onChange,
    value,
    placeholder,
    ...props
}) => (
    <input
        {...props}
        type="text"
        value={value}
        ref={inputRef}
        onChange={(inputEvent) => (onChange ? onChange(inputEvent.target.value) : null)}
        placeholder={placeholder}
        className="w-full p-2 border rounded"
    />
);

type FormTextareaProps = Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>,
    'onChange'
> & {
    onChange?: (text: string) => void;
};
export const FormTextarea: FC<FormTextareaProps> = ({ onChange, value, placeholder, ...props }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Adjust the textarea height based on its content
    useEffect(() => {
        if (textareaRef?.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [value]);

    return (
        <textarea
            {...props}
            value={value}
            ref={textareaRef}
            onChange={(inputEvent) => (onChange ? onChange(inputEvent.target.value) : null)}
            placeholder={placeholder}
            className="w-full p-2 border rounded resize-none mh-10 overflow-hidden h-auto"
            rows={1}
        />
    );
};
