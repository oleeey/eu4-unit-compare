import './App.css';
import React from 'react';
import Unit from './Unit.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infData: [],
      cavData: []
    }
    this.getData = this.getData.bind(this);
  };

  // Verbindung mit dem Express Server, Daten anpassen für Anwendung
  getData(name) {
    fetch(`http://localhost:5000/${name}`)
    .then(res => res.json())
    .then(
      (result) => {
        result.data.shift();
        let newData = [];
        result.data.map(item => newData.push(String(item).split(";")))
        
        this.setState({
          [`${name}Data`]: newData
        });
      },
      (error) => {
        this.setState({
          error
        });
      }
    )
  }

  componentDidMount() {
    this.getData("inf");
    this.getData("cav");
  }

  render() {
    return (
      <div className="App">
        <h1>EU4 Unit Compare</h1>
        <div className='container'>
          <Unit infData={this.state.infData} cavData={this.state.cavData}/>
          <Unit infData={this.state.infData} cavData={this.state.cavData}/>
        </div>
      </div>
    )
  }
}



export default App;
