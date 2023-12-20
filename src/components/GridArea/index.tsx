import { FC, PropsWithChildren } from "react";

type GridAreaProps = PropsWithChildren<{
  testId?: string;
  className?: string;
  areaName: string;
}>;

export const GridArea: FC<GridAreaProps> = ({
  children,
  areaName,
  className,
  testId,
}) => (
  <div
    className={className}
    data-testid={testId}
    style={{ gridArea: areaName }}
  >
    {children}
  </div>
);

GridArea.defaultProps = {
  testId: "grid-area",
  className: undefined,
};
