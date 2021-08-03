import React, { Component } from 'react'
import { Card,Button } from 'react-bootstrap'
export class Color extends Component {
    render() {
        return (
            <div>
                <Card  key ={this.props.key}style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={this.props.color.imageUrl} />
                    <Card.Body>
                        <Card.Title>{this.props.color.title}</Card.Title>
                        <Card.Text>
                            
                        </Card.Text>
                        {/* <Button variant="primary">Go somewhere</Button> */}
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default Color
