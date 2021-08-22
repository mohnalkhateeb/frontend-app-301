import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MyFavorites.css';
import { withAuth0, useAuth0 } from '@auth0/auth0-react';
import axios from 'axios'
import {Card, Button } from 'react-bootstrap';
import UpdateModel from './component/UpdateModel';
class MyFavorites extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      colorDataArr: [],
      email: '',
      server: process.env.REACT_APP_SERVER,
      showcolor: false,
      id: 0,
      showUp: false,
      updateColorArr: []
    }
  }
  componentDidMount = async () => {
    const { user } = this.props.auth0
    console.log('user', user)
    await this.setState({
      email: `${user.email}`

    })
    axios
      .get(`${this.state.server}/color?email=mhmmd.alkateeb@gmail.com`)
      .then(colorfav => {
        console.log(colorfav.data)
        this.setState({
          colorDataArr: colorfav.data,
          showcolor: true

        })
      })


  }
  deleteColor = async (idx) => {
    let paramsObj = { email: this.state.email }
    axios
      .delete(`${this.state.server}/deleteColor/${idx}`, { params: paramsObj })
      .then(deleteArr => {
        this.setState({
          colorDataArr: deleteArr.data
        })
      })
  }
  showUpdate = (idx) => {
    this.setState({
      id: idx,
      showUp: true,
      updateColorArr: this.state.colorDataArr[idx]
    })

  }
  hidModal = () => { this.setState({ showUp: false }) }
  updateColor = async (event) => {
    event.preventDefault()
    let upObj = {
      email: this.state.email,
      title: event.target.title.value,
      imageUrl: event.target.imageUrl.value

    }
    axios
      .put(`${this.state.server}/updateColor/${this.state.id}`, upObj)
      .then(updateArrr => {
        this.setState({
          colorDataArr: updateArrr.data,
          showUp: false
        })
      })
  }
  render() {
    return (
      <>
        <h1>My Favorites</h1>
        <p>
          This is a collection of my favorites
        </p>
        {
          this.state.showcolor &&
          this.state.colorDataArr.map((item, key) => {
            return (
              <div>
                <Card key={key} style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={item.imageUrl} />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>
                    </Card.Text>
                    {/* <Button variant="primary">Go somewhere</Button> */}
                    <Button onClick={() => this.deleteColor(key)}>Delete</Button>
                    <Button onClick={() => this.showUpdate(key)}>Update</Button>
                  </Card.Body>
                </Card>
              </div>)
          })
        }
        <UpdateModel show={this.state.showUp} handleClose={this.hidModal} UpdatArr={this.state.updateColorArr} update={this.updateColor} />
      </>
    )
  }
}
export default withAuth0(MyFavorites);

