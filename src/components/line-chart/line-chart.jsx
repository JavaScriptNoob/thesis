import React, {useState, useEffect, useRef} from 'react';
import *  as d3 from 'd3';
import dataset from "../../data.csv";
import {defaultKeyMap} from "@testing-library/user-event/dist/keyboard/keyMap";

const LineChart = ({...props}) => {
    const data = props.data;

    const chartRef = useRef(null);


    console.log(props.data)
    let isDate = function (input) {
        return Object.prototype.toString.call(input) === "[object Date]";

    };
    const createGraph = async () => {

        // set the dimensions and margins of the graph
        const margin = {top: 20, right: 20, bottom: 50, left: 70},
            width = 960 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;
        // append the svg object to the body of the page
        const svg = d3.select(chartRef.current).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},     ${margin.top})`);
        const line = d3.line()
            .x(d => x(d.date))
            .y(d => y(d.profit));
        const x = d3.scaleTime().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);
        x.domain(d3.extent(data, (d) => {
            return d.date;
        }));
        y.domain([0, d3.max(data, (d) => {
            return d.profit;
        })]);
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x));
        svg.append("g")
            .call(d3.axisLeft(y));
        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line);




    }

    useEffect(() => {
        return () => {
            if (isDate(data.length && data[0].date))
                createGraph()
        };
    },[]);


    return (
        <div className="line-chart" ref={chartRef}>

        </div>
    )
};

export default LineChart;