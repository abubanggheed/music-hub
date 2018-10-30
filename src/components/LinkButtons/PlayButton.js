import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { PlayCircleOutline } from '@material-ui/icons';


class PlayButton extends Component {

//this button exists almost everwhere, and triggers the process involved
//with playing audio based on it's props
    handlePlay = () => {
        this.props.dispatch({ type: 'PLAY_SONG', payload: {
            id: this.props.song.id,
            type: 'mp3',
        } });
    }

    render() {
        return (
                <IconButton color="primary" onClick={this.handlePlay}><PlayCircleOutline /></IconButton>
        );
    }
}


export default connect()(PlayButton);