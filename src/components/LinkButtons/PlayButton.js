import React, { Component } from 'react';
import { connect } from 'react-redux';


class PlayButton extends Component {


    handlePlay = () => {
        this.props.dispatch({ type: 'PLAY_SONG', payload: {
            id: this.props.song.id,
            type: 'mp3',
        } });
    }

    render() {
        return (
                <button onClick={this.handlePlay}>Play</button>
        );
    }
}


export default connect()(PlayButton);