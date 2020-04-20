import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

export const PageLinks = ({ onClick, page, value }) => {
  const onPageLinkClick = (event, pageLink) => {
    if (onClick) onClick({ originalEvent: event, value: pageLink });
    event.preventDefault();
  };

  let elements = value.map((pageLink, i) => {
    let pageClassName = classNames('p-paginator-page p-paginator-element p-link', {
      'p-highlight': pageLink - 1 === page
    });

    return (
      <button key={pageLink} className={pageClassName} onClick={event => onPageLinkClick(event, pageLink)} type="button">
        {pageLink}
      </button>
    );
  });

  return <span className="p-paginator-pages">{elements}</span>;
};

PageLinks.propTypes = {
  onClick: PropTypes.func,
  page: PropTypes.number,
  value: PropTypes.array
};

PageLinks.defaultProps = {
  onClick: null,
  page: null,
  value: null
};
