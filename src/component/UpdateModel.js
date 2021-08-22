import React, { Component } from 'react'
import {Modal,Button} from 'react-bootstrap'
export class UpdateModel extends Component {
    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <form onSubmit={this.props.update}>
                        <input type='text' name='title' defaultValue={this.props.UpdatArr.title}></input><br></br>
                        <input type='text' name='imageUrl' defaultValue={this.props.UpdatArr.imageUrl}></input><br></br>
                        <input type='submit' name='submit' value='Update'></input>
                    </form>
                    
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose}>
                            Close
                        </Button>
                       
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default UpdateModel
