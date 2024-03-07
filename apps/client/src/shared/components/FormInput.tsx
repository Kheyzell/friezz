import { DetailedHTMLProps, FC, InputHTMLAttributes, Ref } from 'react';

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
