import React, { Component } from 'react';

class Input extends React.Component {
    constructor(props) {
      super(props);
      this.getUnitGroup = this.getUnitGroup.bind(this);
      this.getUnitList = this.getUnitList.bind(this);
      this.getUnitName = this.getUnitName.bind(this);
      this.getUnitType = this.getUnitType.bind(this);
    }

    getUnitType(e) {
      this.props.getUnitType(e.target.value)
    }

    getUnitGroup(e) {
        this.props.getUnitGroup(e.target.value);
      }

    getUnitList(e) {
        this.props.getUnitList(e.target.value);
    }

    getUnitName(e) {
        this.props.getUnitName(e.target.value);
    }
  
    render() {
      // Optionen anhand der gespeicherten Liste erstellen
      let techOptions = this.props.techList.map(item => <option key={item}>{item}</option>);
      let unitOptions = this.props.unitList.map(item => <option key={item}>{item}</option>);
    
      return (
        <form id='inputForm'>
          <div className='divSelect'>
            <label>Unit Type</label>
            <select onChange={this.getUnitType}>
              <option selected disabled>-</option>
              <option value={"inf"}>Infantry</option>
              <option value={"cav"}>Cavalry</option>
            </select>
          </div>
          <div className='divSelect'>
            <label>Unit Group</label>
            <select onChange={this.getUnitGroup}>
              <option selected disabled>-</option>
              <option>Aboriginal</option>
              <option>African</option>
              <option>Anatolian</option>
              <option>Chinese</option>
              <option>Eastern</option>
              <option>High American</option>
              <option>Indian</option>
              <option>Muslim</option>
              <option>Mesoamerican</option>
              <option>North American</option>
              <option>South American</option>
              <option>Nomad</option>
              <option>Polynesian</option>
              <option>Western</option>
            </select>
          </div>
          <div className='divSelect'>
            <label>Military Technology</label>
            <select onChange={this.getUnitList}>
              {techOptions}
            </select>
          </div>
          <div className='divSelect'>
            <label>Unit Name</label>
            <select onChange={this.getUnitName}>
              {unitOptions}
            </select>
          </div>
        </form>
      )
    }
  }

class Unit extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        unitGroup: "",
        unitName: "",
        techList: [],
        unitList: [],
        statsList: [],
        unitType: ""
      }
      this.getTechList = this.getTechList.bind(this);
      this.getUnitList = this.getUnitList.bind(this);
      this.getUnitGroup = this.getUnitGroup.bind(this);
      this.getUnitName = this.getUnitName.bind(this);
      this.getStats = this.getStats.bind(this);
      this.getUnitType = this.getUnitType.bind(this);
    }

    getUnitType(unitType) {
      this.setState({
        unitType: unitType
      }, function() {
        if (this.state.unitGroup !== "") {
          this.getUnitGroup(this.state.unitGroup);
        }
      })
    }

    getUnitGroup(e) {
        this.setState({unitGroup: e, techList: []}, function () {
          this.getTechList();
        });
      }

    getUnitName(e) {
        this.setState({
            unitName: e
        }, function() {
          this.getStats()
        });
    }

    /*
    Ich habe "this.props.data" überall durch "[`${this.state.unitType}Data`]" ersetzt, 
    damit die Daten vom ausgewählten "Unit Type" abhängen.
    Man kann also entweder "Infantry" oder "Cavalry" auswählen.
    */

    getTechList() {
        //console.log("selected:",this.state.unitGroup)
        let tech = [];
        for (let i in this.props[`${this.state.unitType}Data`]) {
            if (this.props[`${this.state.unitType}Data`][i][1] == this.state.unitGroup) {
                //console.log(this.props.data["recordset"][i])
                tech.push(this.props[`${this.state.unitType}Data`][i][0]);       
            }
        }
        // Duplikate entfernen
        tech = [...new Set(tech)]
        this.setState({
        techList: tech
        }, function () {
            let units = [];
            let num = this.state.techList[0];
            for (let i in this.props[`${this.state.unitType}Data`]) {
            if (this.props[`${this.state.unitType}Data`][i][1] == this.state.unitGroup & this.props[`${this.state.unitType}Data`][i][0] == num) {
                units.push(this.props[`${this.state.unitType}Data`][i][2])
            };
            };
            this.setState({
            unitList: units
            }, function () {
                this.getUnitName(this.state.unitList[0]);
            });
        })
    }

    getUnitList(e) {
        // Erstellung der Liste, in welcher die Daten temporaer gespeichert werden
        let units = [];
        // ausgewählte Zahl benutzen
        let num = e;
        // durch die Liste gehen und wenn die ausgewählte Gruppe und Technologie stimmen, dann speichern
        for (let i in this.props[`${this.state.unitType}Data`]) {
            if (this.props[`${this.state.unitType}Data`][i][1] == this.state.unitGroup && this.props[`${this.state.unitType}Data`][i][0] == num) {
            units.push(this.props[`${this.state.unitType}Data`][i][2])
            };
        };
        this.setState({
            unitList: units
        }, function () {
            this.getUnitName(this.state.unitList[0]);
        });
    }

    getStats() {
      for (let i in this.props[`${this.state.unitType}Data`]) {
          if (this.props[`${this.state.unitType}Data`][i][2] == this.state.unitName) {
            //console.log(this.props[`${this.state.unitType}Data`][i])
              this.setState({
                statsList: [
                  this.props[`${this.state.unitType}Data`][i][3],
                  this.props[`${this.state.unitType}Data`][i][4], 
                  this.props[`${this.state.unitType}Data`][i][5], 
                  this.props[`${this.state.unitType}Data`][i][6],
                  this.props[`${this.state.unitType}Data`][i][7],
                  this.props[`${this.state.unitType}Data`][i][8],
                  this.props[`${this.state.unitType}Data`][i][9]]
              })
          }
      }
  };
      
    render() {
        let props = {
            data: this.props[`${this.state.unitType}Data`],
            unitGroup: this.state.unitGroup,
            getUnitGroup: this.getUnitGroup,
            getUnitList: this.getUnitList,
            getUnitName: this.getUnitName,
            unitList: this.state.unitList,
            techList: this.state.techList,
            getUnitType: this.getUnitType
        }
        let statsText = ["Fire Off", "Fire Def", "Shock Off", "Shock Def", "Morale Off", "Morale Def", "Total"];
        let stats = statsText.map(item => <td key={item + Math.random()}>{item}</td>);
        let stats2 = this.state.statsList.map(item => <td key={item + Math.random()}>{item}</td>);
        
      return (
        <div className='Unit'>
            <Input {...props}/>
            <div className='table'>
              <table>
                <tbody>
                  <tr>
                    {stats}
                  </tr>
                  <tr>
                    {stats2}
                  </tr>
                </tbody>
              </table>
            </div>
        </div>
      )
    }
  }

export default Unit;