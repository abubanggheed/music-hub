import React from 'react';
import { connect } from 'react-redux';
import { AudiotrackRounded } from '@material-ui/icons';

const DownloadFooter = (props) => (
  <div>
    {props.download.download && <pre><h4>Your download is ready:</h4>
    <a href={props.download.download} download target="_blank" rel="noopener noreferrer"><AudiotrackRounded /></a></pre>}
  </div>
);

const mapReduxToProps = ({ download }) => ({ download })

export default connect(mapReduxToProps)(DownloadFooter);
