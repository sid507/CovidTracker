import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { MenuItem, FormControl, Select, Card, CardContent, Typography, colors } from '@material-ui/core';
// import { Card, CardContent, Typography } from '@material-ui/core';


import './App.css';
import Infobox from './Infobox';
import Map from './Map';
import Table from './Table';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";


import { sortData } from './util';

function App() {
  const Maharashtra = 'Maharashtra';

  const [states, setStates] = useState([]);
  const [govlab, setGovlab] = useState([]);
  const [currentstate, setstate] = useState('Total');
  const [stateInfo, setStateInfo] = useState({});
  const [tabledata, settabledata] = useState([]);
  const [center, setcenter] = useState({ lat: 20.5937, lng: 78.9629 });
  const [zoom, setzoom] = useState(5);

  const [rajya, setRajya] = useState([
    {
      name: 'Maharashtra',
      lat: '19.7515',
      lon: '75.7139'
    },
    {
      name: 'Arunachal Pradesh',
      lat: '28.21',
      lon: '94.72'
    },
    {
      name: 'Nagaland',
      lat: '26.15',
      lon: '94.56'
    },
    {
      name: 'Manipur',
      lat: '24.66',
      lon: '93.90'
    },
    {
      name: 'Assam',
      lat: '26.20',
      lon: '92.93'
    },
    {
      name: 'Mizoram',
      lat: '23.16',
      lon: '92.93'
    },
    {
      name: 'Tripura',
      lat: '23.94',
      lon: '91.98'
    },
    {
      name: 'Meghalaya',
      lat: '25.46',
      lon: '91.36'
    },
    {
      name: 'Sikkim',
      lat: '27.53',
      lon: '88.51'
    },
    {
      name: 'West Bengal',
      lat: '22.98',
      lon: '87.85'
    },
    {
      name: 'Bihar',
      lat: '25.09',
      lon: '85.31'
    },
    {
      name: 'Jharkhand',
      lat: '23.61',
      lon: '85.27'
    },
    {
      name: 'Odisha',
      lat: '20.95',
      lon: '85.09'
    },
    {
      name: 'Uttar Pradesh',
      lat: '26.84',
      lon: '80.94'
    },
    {
      name: 'Andhra Pradesh',
      lat: '15.91',
      lon: '79.74'
    },
    {
      name: 'Uttarakhand',
      lat: '30.06',
      lon: '79.01'
    },
    {
      name: 'Himachal Pradesh',
      lat: '31.1048',
      lon: ' 77.17'
    },
    {
      name: 'Kerala',
      lat: '10.85',
      lon: '76.27'
    },
    {
      name: 'Karnataka',
      lat: '15.31',
      lon: '75.71'
    },
    {
      name: 'Punjab',
      lat: '31.14',
      lon: '75.34'
    },
    {
      name: 'Rajasthan',
      lat: '27.02',
      lon: '74.21'
    },
    {
      name: 'Goa',
      lat: '15.29',
      lon: '74.12'
    },
    {
      name: 'Gujarat',
      lat: '22.25',
      lon: '71.19'
    },
    {
      name: 'Jammu and Kashmir',
      lat: '33.7782',
      lon: '76.57'
    },

    {
      name: 'Delhi',
      lat: '28.7041',
      lon: '77.1025'
    },
    {
      name: 'Tamil Nadu',
      lat: '11.059821',
      lon: '78.387451'
    },
    {
      name: 'Telangana',
      lat: '17.123184',
      lon: '79.208824'
    },
    {
      name: 'Madhya Pradesh',
      lat: '23.473324',
      lon: '77.947998'

    },
    {
      name: 'Haryana',
      lat: '29.065773',
      lon: '76.040497'

    },
    {
      name: 'Chhattisgarh',
      lat: '21.295132',
      lon: '81.828232'
    }
  ])



  useEffect(() => {
    fetch('https://data.covid19india.org/data.json')
      .then((response) => response.json())
      .then((data) => {
        const a = data.statewise;
        const b = a.filter((data) => data.state === `Total`)
        setStateInfo(b[0]);
      })
  }, []);


  // useEffect(() => {
  //   fetch('https://covid-19india-api.herokuapp.com/v2.0/icmr_lab_details')
  //     // .then((response) => response.json())
  //     .then((response) => {
  //       setGovlab(response);
  //       console.log(response)
  //     })
  // })


  useEffect(() => {
    const getstatesData = async () => {
      await fetch("https://data.covid19india.org/data.json")
        .then((response) => response.json())
        .then((data) => {
          const a = data.statewise;
          const b = a.map((c) => ({
            name: c.state,
            active: c.active
          }));
          // console.log(b);
          const sortedData = sortData(b);
          setStates(sortedData);

          settabledata(sortedData);



        });
    };
    getstatesData();
  }, []);

  const onStateChange = (event) => {
    const statecode = event.target.value;
    setstate(statecode);
    const getStateInfo = async () => {
      await fetch("https://data.covid19india.org/data.json")
        .then((response) => response.json())
        .then((data) => {
          const a = data.statewise;
          const b = a.filter((data) => data.state === `${statecode}`)
          setStateInfo(b[0]);
          // console.log(b[0]);

        })
    }
    getStateInfo();
  }
  return (
    <div className="App">
      <div className="App__left">
        <div className='app__header'>
          <h1>Covid-19 Tracker</h1>
          <FormControl className='app__dropdown'>
            <Select variant='outlined' value={currentstate} onChange={onStateChange} >
              {
                states.map(state => {
                  return (
                    <MenuItem value={state.name}>{state.name}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <Infobox title="Coronavirus Cases" cases={stateInfo.deltaconfirmed} total={stateInfo.confirmed} date={stateInfo.lastupdatedtime} ></Infobox>
          <Infobox title="Recoverd" cases={stateInfo.deltarecovered} total={stateInfo.recovered} date={stateInfo.lastupdatedtime}  ></Infobox>
          <Infobox title="Death" cases={stateInfo.deltadeaths} total={stateInfo.deaths} date={stateInfo.lastupdatedtime}   ></Infobox>

        </div>
        {/* <div>
          <Card className="infobox">
            <CardContent>
              <Typography className='infobox__title' color="textPrimary">
                Goverment Lab:
              </Typography>

              <Typography className='infobox__total' color="textSecondary">
                HelpLine No.
                </Typography>
            </CardContent>
          </Card>
        </div> */}
        <div>
          <Map stateInfo={states} rajya={rajya} center={center} zoom={zoom} />

        </div>
        <div >
          <div className="credit">
            Made with <i class="fa fa-heart" style={{ color: `red` }} aria-hidden="true"></i> by sid507
          </div>
          <div className="github">
            <a href="https://github.com/sid507/"><i class="fa fa-github" aria-hidden="true"></i></a>
          </div>
        </div>
      </div>
      <Card className="App_right">

        <CardContent>
          <Table states={tabledata} />
          <h1 >Active</h1>
          <LineGraph casetype={"dailyconfirmed"} />
          <h1>Recovered</h1>
          <LineGraph casetype={"dailyrecovered"} />
        </CardContent>
      </Card>



    </div>
  );
}

export default App;
