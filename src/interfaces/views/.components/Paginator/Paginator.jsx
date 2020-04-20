import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import './Paginator.css';

import { CurrentPageReport } from './.components/CurrentPageReport';
import { FirstPageLink } from './.components/FirstPageLink';
import { LastPageLink } from './.components/LastPageLink';
import { NextPageLink } from './.components/NextPageLink';
import { PageLinks } from './.components/PageLinks';
import { PrevPageLink } from './.components/PrevPageLink';
import { RowsPerPageDropdown } from './.components/RowsPerPageDropdown';

export const Paginator = ({
  alwaysShow,
  className,
  currentPageReportTemplate,
  first,
  leftContent,
  onPageChange,
  pageLinkSize,
  rightContent,
  rows,
  rowsPerPageOptions,
  style,
  template,
  totalRecords
}) => {
  useEffect(() => {
    if (getPage() > 0) changePage((getPageCount() - 1) * rows, rows);
  }, [totalRecords]);

  const calculatePageLinkBoundaries = () => {
    var numberOfPages = getPageCount();
    var visiblePages = Math.min(pageLinkSize, numberOfPages);

    //calculate range, keep current in middle if necessary
    var start = Math.max(0, Math.ceil(getPage() - visiblePages / 2));
    var end = Math.min(numberOfPages - 1, start + visiblePages - 1);

    //check when approaching to last page
    var delta = pageLinkSize - (end - start + 1);
    start = Math.max(0, start - delta);

    return [start, end];
  };

  const changePage = (first, rows) => {
    var pc = getPageCount();
    var p = Math.floor(first / rows);

    if (p >= 0 && p < pc) {
      var newPageState = { first: first, rows: rows, page: p, pageCount: pc };

      if (onPageChange) onPageChange(newPageState);
    }
  };

  const changePageToFirst = event => {
    changePage(0, rows);
    event.preventDefault();
  };

  const changePageToLast = event => {
    changePage((getPageCount() - 1) * rows, rows);
    event.preventDefault();
  };

  const changePageToNext = event => {
    changePage(first + rows, rows);
    event.preventDefault();
  };

  const changePageToPrev = event => {
    changePage(first - rows, rows);
    event.preventDefault();
  };

  const getPage = () => Math.floor(first / rows);

  const getPageCount = () => Math.ceil(totalRecords / rows) || 1;

  const isFirstPage = () => getPage() === 0;

  const isLastPage = () => getPage() === getPageCount() - 1;

  const onPageLinkClick = event => changePage((event.value - 1) * rows, rows);

  const onRowsChange = event => changePage(0, event.value);

  const updatePageLinks = () => {
    var pageLinks = [];
    var boundaries = calculatePageLinkBoundaries();
    var start = boundaries[0];
    var end = boundaries[1];

    for (var i = start; i <= end; i++) {
      pageLinks.push(i + 1);
    }

    return pageLinks;
  };

  if (!alwaysShow && getPageCount() === 1) return null;
  else {
    let classNameList = classNames('p-paginator p-component p-unselectable-text', className);

    let paginatorElements = template.split(' ').map(value => {
      let key = value.trim();
      let element;

      switch (key) {
        case 'FirstPageLink':
          element = <FirstPageLink key={key} onClick={changePageToFirst} disabled={isFirstPage()} />;
          break;

        case 'PrevPageLink':
          element = <PrevPageLink key={key} onClick={changePageToPrev} disabled={isFirstPage()} />;
          break;

        case 'NextPageLink':
          element = <NextPageLink key={key} onClick={changePageToNext} disabled={isLastPage()} />;
          break;

        case 'LastPageLink':
          element = <LastPageLink key={key} onClick={changePageToLast} disabled={isLastPage()} />;
          break;

        case 'PageLinks':
          element = <PageLinks key={key} value={updatePageLinks()} page={getPage()} onClick={onPageLinkClick} />;
          break;

        case 'RowsPerPageDropdown':
          element = <RowsPerPageDropdown key={key} value={rows} options={rowsPerPageOptions} onChange={onRowsChange} />;
          break;

        case 'CurrentPageReport':
          element = (
            <CurrentPageReport
              first={first}
              key={key}
              page={getPage()}
              pageCount={getPageCount()}
              rows={rows}
              template={currentPageReportTemplate}
              totalRecords={totalRecords}
            />
          );
          break;

        default:
          element = null;
          break;
      }

      return element;
    });

    let leftSection = leftContent && <div className="p-paginator-left-content">{leftContent}</div>;
    let rightSection = rightContent && <div className="p-paginator-right-content">{rightContent}</div>;

    return (
      <div className={classNameList} style={style}>
        {leftSection}
        {paginatorElements}
        {rightSection}
      </div>
    );
  }
};

Paginator.propTypes = {
  alwaysShow: PropTypes.bool,
  className: PropTypes.string,
  currentPageReportTemplate: PropTypes.any,
  first: PropTypes.number,
  leftContent: PropTypes.any,
  onPageChange: PropTypes.func,
  pageLinkSize: PropTypes.number,
  rightContent: PropTypes.any,
  rows: PropTypes.number,
  rowsPerPageOptions: PropTypes.array,
  style: PropTypes.object,
  template: PropTypes.string,
  totalRecords: PropTypes.number
};

Paginator.defaultProps = {
  alwaysShow: true,
  className: null,
  currentPageReportTemplate: '({currentPage} of {totalPages})',
  first: 0,
  leftContent: null,
  onPageChange: null,
  pageLinkSize: 5,
  rightContent: null,
  rows: 0,
  rowsPerPageOptions: null,
  style: null,
  template: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
  totalRecords: 0
};
