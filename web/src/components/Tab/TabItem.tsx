import React, { memo, ReactElement } from "react";
interface IProps {
  name: string;
  children: ReactElement;
}
function TabItem({ children }: IProps) {
  return <>{children}</>;
}
export default memo(TabItem);
