import { FC, PropsWithChildren } from 'react';
import './index.css'

const Button: FC<PropsWithChildren> = ({props, children}) => {
  return (
    <button className="button" {...props}>
      {children}
    </button>
  );
};

export default Button;
