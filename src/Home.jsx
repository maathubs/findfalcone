import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import Single from './Single'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state={
      vehicles:[],
      planets:[],
      token:"",
      selectedPlanets:[],
      selectedVehicles:[]  
    };
    this.findFalcone = this.findFalcone.bind(this);
  }

  componentDidMount() {
    this.getPlanets();
    this.getVehicles();
    this.getToken();             
  }

  getPlanets=()=>{
    axios.get(`https://findfalcone.herokuapp.com/planets`)
    .then(res => {
      const planets = res.data;
      this.setState({ planets });
    })
    .catch(error => {
      console.log(error.response);
    });
  }

  getVehicles=()=>{
    axios.get(`https://findfalcone.herokuapp.com/vehicles`)
    .then(res => {
      const vehicles = res.data;
      this.setState({ vehicles });
    })
    .catch(error => {
      console.log(error.response);
    });
  }

  getToken=()=>{
    fetch('https://findfalcone.herokuapp.com/token', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        // body: {},
    })
    .then(response => response.json())
    .then(data => this.setState({ token:data.token }))
    .catch(err => console.log(err));
  }

  selectVehicle=(e)=>{
    this.setState({ selectedVehicles: [...this.state.selectedVehicles,e.target.value ] });
   
  }

  selectPlanet = (selectedOption) => {
    this.setState({ selectedPlanets: [...this.state.selectedPlanets,selectedOption.name ] })
  }
  
  findFalcone=()=>{ 
    fetch('https://findfalcone.herokuapp.com/find', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token: this.state.token,planet_names:this.state.selectedPlanets,vehicle_names:this.state.selectedVehicles}),    
    })
    .then((response) => response.json())
    .then(data => {
      console.log("data",data)
      this.props.history.push({
        pathname: '/success',
        query: {
          responceData: data
        }
      })      
    })
    .catch(err => console.log(err));    
  }

  render() {
    
    console.log("Selected Vehicle",this.state.selectedVehicles,this.state.selectedPlanets)
    return (
      <div className="home">
        <div><h2>Finding Falcone...</h2></div>
        <div>Select Planets you want to search in :</div>
        <div>
          <Single state={this.state} length="1"destination="Destination 1" selectPlanet={this.selectPlanet} selectVehicle={this.selectVehicle}/>
          <Single state={this.state} length="2" destination="Destination 2" selectPlanet={this.selectPlanet} selectVehicle={this.selectVehicle}/>
          <Single state={this.state} length="3"destination="Destination 3" selectPlanet={this.selectPlanet} selectVehicle={this.selectVehicle}/>
          <Single state={this.state}length="4" destination="Destination 4" selectPlanet={this.selectPlanet} selectVehicle={this.selectVehicle}/>
        </div> 
        <div>
          <p>
            <button className="findFalcone" onClick={ this.findFalcone } disabled={this.state.selectedVehicles.length<4}>Find Falcone</button>
          </p>
        </div>   
      </div>
    );
  }
}

export default  withRouter(Home);