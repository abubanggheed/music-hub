import React from 'react';
import { connect } from 'react-redux';


const DownloadFooter = (props) => (
  <div>
    {props.download.download && <pre><h4>You download is ready:</h4>
    <a href={props.download.download} download>Download Link</a></pre>}
  </div>
);

const mapReduxToProps = ({ download }) => ({ download })

export default connect(mapReduxToProps)(DownloadFooter);
