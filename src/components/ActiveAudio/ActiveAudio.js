import React from 'react';
import { connect } from 'react-redux';

const ActiveAudio = () => {
    return (
        <div>
          <audio controls src="https://firebasestorage.googleapis.com/v0/b/my-project-1539982235609.appspot.com/o/songs%2F1540477841440-demo%20-%2010%3A25%3A18%2C%209.13%20AM.mp3?alt=media&token=964bf73f-6d5e-4990-bf27-f25e8931d02f"></audio>
        </div>
    );
}


export default connect()(ActiveAudio);
