import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';

type RemoveButtonProps = DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;
export const RemoveButton: FC<RemoveButtonProps> = ({ children, ...props }) => {
    return (
        <button {...props} className="ml-2 px-3 py-2 bg-red-500 text-white rounded">
            {children ? children : '-'}
        </button>
    );
};
