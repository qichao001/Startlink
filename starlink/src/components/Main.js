import React, {Component} from 'react';
import axios from 'axios';
import SatSetting from'./SatSetting';
import SatelliteList from "./SatelliteList"
import {NEARBY_SATELLITE, SAT_API_KEY, STARLINK_CATEGORY} from "../constants";
import WorldMap from "./WorldMap";
import WorldMapSquare from "./WorldMapSquare";

class Main extends Component {
    state ={
        satInfo: null,
        settings: null,
        satList: null,
        isLoadingList: false
    }

    render() {
        const {satInfo, settings, satList, isLoadingList} = this.state;
        return (
            <div className = "main">
                <div className='left-side'>
                    <SatSetting onShow={this.showSatellite}/>
                    <SatelliteList satInfo={satInfo}
                                   isLoading={isLoadingList}
                                   onShowMap={this.showMap}
                    />
                </div>
                <div className='right-side'>
                    <WorldMap satData={satList} observerData={settings}/>
                    {/*<WorldMapSquare />*/}
                </div>

            </div>
        );
    }

    showSatellite = setting => {
        console.log('setting ->', setting)
        this.setState({settings:setting})

        //fetch satellite data
        this.fetchSatellite(setting);
    }

    fetchSatellite = setting => {
        // fetch data from N2YO
        //setp1: get setting values
        const {latitude, longitude, elevation, altitude} = setting;

        //step2: prepare url
        const url = `/api/${NEARBY_SATELLITE}/${latitude}/${longitude}/${elevation}/${altitude}/${STARLINK_CATEGORY}/&apiKey=${SAT_API_KEY}`;

        this.setState(
            {isLoadingList:true}
        )
        //step3: make ajax call
        axios.get(url)
            .then(response => {
                console.log(response)
                this.setState({
                    satInfo: response.data,
                    isLoadingList:false
                })
            })
            .catch(err => {
            console.log('err in fetch satellite list ->', err);
            this.setState({isLoadingList:false});
        })
    }

    showMap = (satList) => {
        console.log("show on the map", satList);
        this.setState({satList : [...satList]})
    }
}

export default Main;