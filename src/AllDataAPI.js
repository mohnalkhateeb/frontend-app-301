import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
class AllDataAPI extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allData: [],
            server: process.env.REACT_APP_SERVER
        }
    }
    componentDidMount() {
        axios
            .get(`${this.state.server}/allcolors`)
            .then(allDataArr => {
                this.setState({
                    allData: allDataArr.data
                })
            })
    }
    addToFav = async (idx) => {
        let addObject = {
            email: this.props.auth0.user.email,
            id: this.state.allData[idx].id,
            title: this.state.allData[idx].title,
            imageUrl: this.state.allData[idx].imageUrl
        }
        await axios.post(`${this.state.server}/addColor`, addObject)
    }
    render() {
        return (
            <div>
                <h1>All Data from the API</h1>
                <h3>Select your favorites :)</h3>
                {this.state.allData.map((item, idx) => {
                    return (<div>
                        
                            <Card key={idx} style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={item.imageUrl} />
                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Text>

                                    </Card.Text>
                                    {this.props.auth0.isAuthenticated && <Button onClick={() => this.addToFav(idx)}>Add to Fav</Button>}

                                </Card.Body>
                            </Card>
                        
                    </div>)
                })}

            </div>
        )
    }
}

export default withAuth0(AllDataAPI);
