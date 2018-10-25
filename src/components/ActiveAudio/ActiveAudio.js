import React from 'react';
import { connect } from 'react-redux';

const ActiveAudio = props => {
    return (
        <div>
            {props.download.current &&
                <audio controls src={props.download.current} autoPlay></audio>}
        </div>
    );
}

const mapStateToProps = ({ download }) => ({ download });

export default connect(mapStateToProps)(ActiveAudio);
