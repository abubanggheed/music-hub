import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectButton from '../LinkButtons/ProjectButton';
import { Table, TableHead, TableBody, TableRow, TableCell, IconButton, Dialog, Typography, Paper } from '@material-ui/core';
import { DeleteSweep, Save } from '@material-ui/icons';
import PlayButton from '../LinkButtons/PlayButton';

class ProjectTable extends Component {


  state = {
    confirmDelete: false,
    projectToDelete: null,
  }

  handleDelete = () => {
    this.props.dispatch({ type: 'START_PROJECT_DELETE' });
    this.props.dispatch({ type: 'DELETE_PROJECT', payload: { id: this.state.projectToDelete.id, user: this.props.user.id } });
    this.handleCancel();
  }

  handleDeleteButton = project => {
    this.setState({
      confirmDelete: true,
      projectToDelete: project,
    });
  }

  handleCancel = () => {
    this.setState({
      confirmDelete: false,
      projectToDelete: null,
    });
  }

  render() {
    return (
      <div>
        {this.props.table.length > 0 ?
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Stored Versions</TableCell>
                  <TableCell>Play Head</TableCell>
                  <TableCell>Go</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.table.map(project => (
                  <TableRow key={project.id}>
                    <TableCell>{project.name}</TableCell>
                    <TableCell>{project.number}</TableCell>
                    <TableCell>{project.head !== null && <PlayButton song={{ id: project.head }} />}</TableCell>
                    <TableCell><ProjectButton page={project.id} /></TableCell>
                    <TableCell><IconButton color="secondary" onClick={() => this.handleDeleteButton(project)}><DeleteSweep /></IconButton></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper> :
          <div>
            <p>
              You currently have no projects.
              </p>
          </div>}

        <Dialog open={this.state.confirmDelete}>
          <div className="generalDialog">
            <Typography variant="h4">Are you really going to delete an entire project?</Typography>
            <Typography variant="body1">Deleting a project deletes all songs within it.</Typography>
            <pre>
              <IconButton color="primary" onClick={this.handleCancel}><Save />Maybe Not</IconButton>
            </pre>
            <pre>
              <IconButton color="secondary" onClick={this.handleDelete}><DeleteSweep />I do what I have to</IconButton>
            </pre>
          </div>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  table: state.table,
  user: state.user,
});

export default connect(mapStateToProps)(ProjectTable);