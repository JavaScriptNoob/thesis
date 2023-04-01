import {useEffect, useRef, useState} from "react";
import * as d3 from "d3";

const VizLineChart = (props) => {
    const ref = useRef(null);

    const [state, setState] = useState(props.data.data);
    var parseTime = d3.timeParse("%d/%m/%Y");


    useEffect(() => {
        return () => {
            // setState([...state,props.data])
            console.log(props,state, state[0].date,5645674574575675678567576576575)
            // let isDate = function (input) {
            //     if (Object.prototype.toString.call(input) === "[object Date]")
            //         return true;
            //     return false;
            // };
            // if (!isDate(state[0].date)) {
            //     let arr = state.map((d, i) => {
            //         (d.date = parseTime(d.date));
            //         return d
            //     })
            //     console.log(props, arr, state, "useEffect in  xiz line chart")
            //     setState(arr)
            //     if (arr.length && arr.length > 0) {
            //         setInterval(createGraph(),400)
            //     }
            // }else{
            //     setInterval(createGraph(),400)
            //
            // }
            setInterval(createGraph,400)

    }}, []);

    const createGraph = async() => {
//         function sortByDateAscending(a, b) {
//             // Dates will be cast to numbers automagically:
//             return a.date - b.date;
//         }
//
//         const arr = state.sort(sortByDateAscending)
//         console.log(arr, 'viz')
// state.forEach(element=>console.log(element))

      //   console.log(state, ' efter sort')
      //   // set the dimensions and margins of the graph
      //   const margin = {top: 10, right: 30, bottom: 30, left: 60},
      //       width = 450 - margin.left - margin.right,
      //       height = 300 - margin.top - margin.bottom;
      //   // append the svg object to the body of the page
      //   const svg = d3.select(ref.current).append("svg")
      //       .attr("width", width + margin.left + margin.right)
      //       .attr("height", height + margin.top + margin.bottom)
      //       .append("g")
      //       .attr("transform", `translate(${margin.left},     ${margin.top})`);
      //   // const line = d3.line()
      //   //     .x(d => x(d.date))
      //   //     .y(d => y(d.revenue));
      //
      //
      //   // Add X axis --> it is a date format
      //   const x = d3.scaleTime()
      //       .domain(d3.extent(state, function (d) {
      //           return d.date;
      //       }))
      //       .range([0, width]);
      //   svg.append("g")
      //       .attr("transform", `translate(0, ${height})`)
      //       .call(d3.axisBottom(x));
      //
      //   // Add Y axis
      //   const y = d3.scaleLinear()
      //       .domain([0, d3.max(state, function (d) {
      //           return d.revenue;
      //       })])
      //       .range([height, 0]);
      //   svg.append("g")
      //       .call(d3.axisLeft(y));
      //
      //   // Add the line
      //   svg.append("path")
      //       .datum(state)
      //       .attr("fill", "none")
      //       .attr("stroke", "steelblue")
      //       .attr("stroke-width", 5.5)
      //       .attr("d", d3.line()
      //           .x(function (d) {
      //               return x(d.date)
      //           })
      //           .y(function (d) {
      //               return y(d.revenue)
      //           })
      //       )
      // return   setState(state)

        var margin = {top: 10, right: 30, bottom: 30, left: 60},
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
        var svg = d3.select("#my_dataviz")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

//Read the data


            // Now I can use this dataset:


                // Add X axis --> it is a date format
                var x = d3.scaleTime()
                    .domain(d3.extent(state, function(d) { return d.date; }))
                    .range([ 0, width ]);
                svg.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x));

                // Add Y axis
                var y = d3.scaleLinear()
                    .domain([0, d3.max(state, function(d) { return +d.value; })])
                    .range([ height, 0 ]);
                svg.append("g")
                    .call(d3.axisLeft(y));

                // Add the line
                svg.append("path")
                    .datum(state)
                    .attr("fill", "none")
                    .attr("stroke", "steelblue")
                    .attr("stroke-width", 1.5)
                    .attr("d", d3.line()
                        .x(function(d) { return x(d.date) })
                        .y(function(d) { return y(d.value) })
                    )





    }
    return <div ref={ref}></div>
}
export default VizLineChart
