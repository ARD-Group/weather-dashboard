import React from 'react';

export type ShowIfProps = {
  /** - The boolean value to determine whether to render the children or not. */
  If: boolean;

  children: React.ReactNode | React.ReactNode[];
};

/**
 * - A component that conditionally renders its children based on the value of the `If prop`.
 * @example <ShowIf If={true}>ShowIf</ShowIf>
 */
const ShowIf = ({ children, If = false }: ShowIfProps) => {
  if (!If) {
    return null;
  }
  return <>{children}</>;
};

export default ShowIf;
