import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { PlayArrow} from '@material-ui/icons';


class PlayButton extends Component {


    handlePlay = () => {
        this.props.dispatch({ type: 'PLAY_SONG', payload: {
            id: this.props.song.id,
            type: 'mp3',
        } });
    }

    render() {
        return (
                <IconButton onClick={this.handlePlay}><PlayArrow /></IconButton>
        );
    }
}


export default connect()(PlayButton);