import { FC, PropsWithChildren } from 'react';

export const Title: FC<PropsWithChildren> = ({ children }) => {
    return <div className="text-xl font-semibold mb-2"> {children} </div>;
};
