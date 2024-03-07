import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';

type PrimaryButtonProps = DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

export const PrimaryButton: FC<PrimaryButtonProps> = ({ children, ...props }) => (
    <button {...props} className="bg-blue-500 text-white p-2 rounded">
        {children}
    </button>
);
