import React from 'react';
import { Typography  } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom';

/**
 * @summary Page title
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Core
 */
class PageTitle extends React.Component {

  /*
   * Props
   * icon: Object
   * menuMname: String
   * links: { href, name }
   * title: String
   */

  /**
   * @override
   */
  render(){
    return <React.Fragment>
      {/* Title section */}
      <div>
        <Typography variant="h2" component="h3" color="textPrimary"> {this.props.icon} {this.props.menuName}</Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/">대시보드</Link>
          {(this.props.links || []).map((link, index) => {
            return <Link to={link.href} key={index}>
              {link.name}
            </Link>
          })}

          <Typography color="textPrimary">{this.props.title}</Typography>
        </Breadcrumbs>
      </div>
    </React.Fragment>
  }
}

export default PageTitle;