import React, {Component} from 'react';
import axios from 'axios';
import {NEWYORK_MAP} from '../constants';
import {geoConicConformal} from "d3-geo";
import {geoPath, geoGraticule} from "d3-geo";
import {select as d3Select} from 'd3-selection';

const width = 960;
const height = 600;

class WorldMapSquare extends Component {
    constructor() {
        super();
        this.refMap = React.createRef();

    }

    componentDidMount() {
        axios.get(NEWYORK_MAP)
            .then( res => {
                const {data} = res;
                this.generateMap(data, data.features);
            })
            .catch (
                err => {
                    console.log("there is err", err)
                }
            )
    }

    generateMap = (ny, land) => {

        const projection = geoConicConformal()
            .fitExtent([[20, 20], [720, 360]], ny)
            .precision(0.1);


        // const graticule = geoGraticule();

        const canvas = d3Select(this.refMap.current)
            .attr("width", width)
            .attr("height", height);

        const context = canvas.node().getContext("2d")

        let path = geoPath().projection(projection).context(context)

        land.forEach( ele => {
                context.fillStyle = '#B3DDEF';
                context.strokeStyle = '#000';
                context.globalAlpha = 0.7;
                context.beginPath();
                path(ele);
                context.fill();
                context.stroke();
            }
        )

        // context.strokeStyle = 'rgba(200, 200, 200, 1)';
        // context.beginPath();
        // path(graticule());
        // context.lineWidth = 1;
        // context.stroke();
        //
        // context.beginPath();
        // context.lineWidth = 1;
        // path(graticule.outline());
        // context.stroke();

    }

    render() {
        return (
            <div className="map-box">
                <canvas className="map" ref = {this.refMap} ></canvas>
            </div>
        );
    }
}

export default WorldMapSquare;