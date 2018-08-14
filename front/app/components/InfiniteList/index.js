// libs
import React from 'react';
import {PropTypes} from 'prop-types';
// components
import {AutoSizer, InfiniteLoader, List} from 'react-virtualized';
import {ListLoader, EmptyListPrompt} from '../ui';
// other

class InfiniteList extends React.PureComponent {
  static propTypes = {
    hasNextPage: PropTypes.bool.isRequired,
    perPage: PropTypes.number,
    items: PropTypes.array.isRequired,
    rowRenderer: PropTypes.func.isRequired,
    noRowsRenderer: PropTypes.func.isRequired,
    getRowHeight: PropTypes.func.isRequired,
    loadNextPage: PropTypes.func.isRequired,
    resetMeasurerCache: PropTypes.func,
    resetProps: PropTypes.object,
    dataLoadingMessage: PropTypes.any,
    noRowsMessage: PropTypes.any,
  };
  static defaultProps = {
    perPage: 50,
    noRowsMessage: 'no rows',
  };

  componentDidUpdate(prevProps) {
    // loader has bigger height then row so we have to recompute the height of the last
    // row when more items have been loaded
    const rowsCountChanged = prevProps.items.length !== this.props.items.length;
    if (rowsCountChanged || (!this.props.hasNextPage && prevProps.hasNextPage)) {
      if (this.listRef) {
        // the last row was using to show the loader - recompute it
        this.listRef.recomputeRowHeights(
          prevProps.items.length > 0 ? prevProps.items.length - 1 : 0
        );
      }
      if (this.props.resetMeasurerCache) {
        this.props.resetMeasurerCache();
      }
    }
  }

  loadNextPage = () => {
    const {items, loadNextPage, perPage} = this.props;
    const page = Math.floor(items.length / perPage);
    const nextPage = page + 1;
    loadNextPage({
      page: nextPage,
      perPage,
    });
  };

  isRowLoaded = ({index}) => {
    const {items} = this.props;
    return !!items[index];
  };

  getRowHeight = ({index}) => {
    const {items, getRowHeight} = this.props;
    if (index === items.length) {
      return 120;
    }
    const rowData = items[index];
    if (getRowHeight) {
      return getRowHeight({index, rowData});
    }
    return 0;
  };

  noRowsRenderer = () => {
    const {noRowsRenderer, noRowsMessage} = this.props;
    if (noRowsRenderer) {
      return noRowsRenderer();
    }
    return <EmptyListPrompt title={noRowsMessage} />;
  };

  rowRenderer = ({index, key, style, parent}) => {
    const {items, rowRenderer, dataLoadingMessage} = this.props;
    const item = items[index];
    if (!this.isRowLoaded({index})) {
      return <ListLoader key={key} style={{...style}} message={dataLoadingMessage} />;
    }
    return rowRenderer({
      item,
      index,
      parent,
      key,
      style,
    });
  };

  render() {
    const {items, hasNextPage, resetProps} = this.props;
    const rowCount = hasNextPage ? items.length + 1 : items.length;
    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadNextPage}
        rowCount={rowCount}
        threshold={10}
      >
        {({onRowsRendered, registerChild}) => (
          <AutoSizer>
            {({height, width}) => (
              <List
                ref={(node) => {
                  this.listRef = node;
                  registerChild(node);
                }}
                width={width}
                height={height}
                onRowsRendered={onRowsRendered}
                rowCount={rowCount}
                rowHeight={this.getRowHeight}
                rowRenderer={this.rowRenderer}
                noRowsRenderer={this.noRowsRenderer}
                // those resetProps are used only to re-render List
                // more info: https://github.com/bvaughn/react-virtualized#pass-thru-props
                resetProps={{...resetProps, hasNextPage}}
              />
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    );
  }
}

export default InfiniteList;
