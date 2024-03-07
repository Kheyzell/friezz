import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';

type SecondaryButtonProps = DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

export const SecondaryButton: FC<SecondaryButtonProps> = ({ children, className, ...props }) => (
    <button {...props} className={`bg-green-500 text-white p-2 rounded ${className}`}>
        {children}
    </button>
);
