import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MyFavorites.css';
import { withAuth0, useAuth0 } from '@auth0/auth0-react';
import axios from 'axios'
import Color from './component/Color';
class MyFavorites extends React.Component {
  constructor(props)
  {
    super(props)
    this.state ={
      colorDataArr :[],
      email :'',
      server : process.env.REACT_APP_SERVER,
      showcolor :false
    }
  }
  componentDidMount = async () =>{
    const {user} = this.props.auth0
    this.setState({
      email : `${user.email}`
      
    })
    console.log(this.state.email)
    //http://localhost:3004/color?email=mhmmd.alkateeb@gmail.com
    axios
    .get(`http://localhost:3004/color?email=mhmmd.alkateeb@gmail.com`)
    .then(colorfav =>{
      console.log(colorfav.data)
      this.setState({
        colorDataArr : colorfav.data,
        showcolor :true
    
      })
    })
    
    
  }
  render() {
    return(
      <>
        <h1>My Favorites</h1>
        <p>
          This is a collection of my favorites
        </p>
        {
          this.state.showcolor && 
          this.state.colorDataArr.map((color,key)=>{
            return(<Color key ={key} color={color}/>)
          
        })
      }
      </>
    )
  }
}

export default withAuth0(MyFavorites);

