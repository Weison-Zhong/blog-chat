import React, { memo, ReactElement, useRef, useState } from "react";
import "./index.less";
import { useGlobalContext } from "@/context";
interface IProps {
  children: ReactElement | ReactElement[];
  onChange: (name: string) => void;
}
interface ITabItem {
  name: string;
  isActive: boolean;
  component: ReactElement;
}
function Tab({ children, onChange }: IProps) {
  const [context, dispatch] = useGlobalContext();
  const { selectedVisitor } = context;
  const activeIndexRef = useRef<null | string>(null);
  const [, forceUpdate] = useState({});
  const tabList: ITabItem[] = [];
  let renderChildren: ReactElement | null = null;
  React.Children.forEach(children, (item: ReactElement) => {
    const { type, props } = item as any;
    if (React.isValidElement(item) && type.type.name === "TabItem") {
      const { name } = props;
      const tabItem = {
        name,
        isActive: name === activeIndexRef.current,
        component: item,
      };
      if (name === activeIndexRef.current) renderChildren = item;
      tabList.push(tabItem);
    }
  });
  /* 第一次加载，或者 prop chuldren 改变的情况 */
  if (!renderChildren && tabList.length > 0) {
    const fisrtChildren = tabList[0];
    renderChildren = fisrtChildren.component;
    activeIndexRef.current = fisrtChildren.component.props.name;
    fisrtChildren.isActive = true;
  }
  /* 切换tab */
  const changeTab = (name: string) => {
    activeIndexRef.current = name;
    forceUpdate({});
    onChange && onChange(name);
  };
  return (
    <div className="tab">
      <div className="tab-content">{renderChildren}</div>
      {!selectedVisitor && (
        <ul className="tab-option">
          {tabList.map((item: ITabItem) => {
            const { name, isActive } = item;
            return (
              <li
                key={name}
                className={isActive ? "active" : ""}
                onClick={() => changeTab(name)}
              >
                {name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default memo(Tab);
