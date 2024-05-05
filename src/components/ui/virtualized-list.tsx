import { CSSProperties, JSX } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';

export type RenderRowProps = { index: number; style: CSSProperties };

interface VirtualizedListProps {
  renderRow: ({ index, style }: RenderRowProps) => JSX.Element;
  itemCount: number;
  itemSize: number;
}

const VirtualizedList = ({ renderRow, itemCount, itemSize }: VirtualizedListProps) => (
  <AutoSizer>
    {({ height, width }) => <List {...{ height, width, itemCount, itemSize }}>{renderRow}</List>}
  </AutoSizer>
);

export default VirtualizedList;
