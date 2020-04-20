import React from 'react';
import PropTypes from 'prop-types';

export const CurrentPageReport = ({ first, page, pageCount, rows, template, totalRecords }) => {
  let text = template
    .replace('{currentPage}', page + 1)
    .replace('{totalPages}', pageCount)
    .replace('{first}', first + 1)
    .replace('{last}', Math.min(first + rows, totalRecords))
    .replace('{rows}', rows)
    .replace('{totalRecords}', totalRecords);

  return <span className="p-paginator-current">{text}</span>;
};

CurrentPageReport.propTypes = {
  first: PropTypes.number,
  page: PropTypes.number,
  pageCount: PropTypes.number,
  rows: PropTypes.number,
  template: PropTypes.string,
  totalRecords: PropTypes.number
};

CurrentPageReport.defaultProps = {
  first: null,
  page: null,
  pageCount: null,
  rows: null,
  template: '({currentPage} of {totalPages})',
  totalRecords: null
};
