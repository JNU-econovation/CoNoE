import React from "react";
import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

function PageTitle({ title }) {
  return (
    <Helmet>
      <title>{title ? `${title} - ` : ""}Auttend</title>
    </Helmet>
  );
}

PageTitle.propTypes = {
  title: PropTypes.string,
};

PageTitle.defaultProps = {
  title: undefined,
};

export default PageTitle;
