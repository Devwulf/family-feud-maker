import React from "react";
import { useHistory } from "react-router";

export interface CustomLinkProps extends React.HTMLAttributes<HTMLElement> {
    to: string;
    children?: React.ReactNode;
}

export default function CustomLink(props: CustomLinkProps) {
    const { push } = useHistory();
    const { to, children, ...rest } = props;
    return(
        <div {...rest} className={`${rest.className} cursor-pointer`} onClick={() => push(to)}>
            {children}
        </div>
    );
}