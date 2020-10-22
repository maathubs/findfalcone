import React, { Component, Fragment } from 'react';
import Select from "react-select";

const customStyles = {
    option: (provided, state) => ({
      ...provided,
      fontSize:"12px",
      color: state.isSelected ? 'yellow' : 'black',
      backgroundColor: state.isSelected ? 'green' : 'white',
    }),
    control: (provided) => ({
      ...provided,
      marginTop: "5%",
      fontSize:"14px",
    })
}
class Single extends Component {
  render() { 
    
    let planetsList=[];
    if (this.props.state.planets.length > 0) {
        this.props.state.planets.map((planet) =>
            planetsList.push({
                name: planet.name,
                value: planet.name,
                label: planet.name,
            })
       );
    }

    let array2=this.props.state.selectedPlanets;
    planetsList = planetsList.filter(val => !array2.includes(val.name));
    let optionItems = this.props.state.vehicles.map((vehicle,i) =>
        <Fragment>
            <input type="radio" name={this.props.length} onClick={this.props.selectVehicle} style={{width:"12px"}} value={vehicle.name}/>
            <label style={{fontSize:"14px"}} >{vehicle.name}</label><br/>
        </Fragment>
    );
    return (
       
        <div className="singleDestination">
          <p className="destination">{this.props.destination}</p>
          <Select 
            onChange={this.props.selectPlanet}
            styles = { customStyles }
            options={planetsList} />
            {this.props.state.selectedPlanets.length>=this.props.length&&
                <p>
                    {optionItems}
                </p>
            }
        </div>
    );
  }
}

export default Single;