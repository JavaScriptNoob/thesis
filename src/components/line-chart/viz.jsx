import {useEffect, useRef, useState} from "react";
import * as d3 from "d3";

const Viz =(props)=>{
    const ref = useRef(null);
    const [state, setState] = useState(props.data);
    var parseTime = d3.timeParse("%d/%m/%Y");






    useEffect(() => {
        return () => {


           let arr =state[0].map((d,i)=> {(d.date =parseTime(d.date)); return d})
                arr[0] =

            setState(arr[0])

            if (arr.length && arr.length>0){

                setTimeout(createGraph, 200);
            }

        };
    }, []);

    const createGraph =  () => {
    function sortByDateAscending(a, b) {
        // Dates will be cast to numbers automagically:
        return a.date - b.date;}

        const    arr = state[0].sort(sortByDateAscending)
            console.log(arr, 'viz')


        console.log(state)
        // set the dimensions and margins of the graph
        const margin = {top: 10, right: 30, bottom: 30, left: 60},
            width = 450 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;
        // append the svg object to the body of the page
        const svg = d3.select(ref.current).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},     ${margin.top})`);
        // const line = d3.line()
        //     .x(d => x(d.date))
        //     .y(d => y(d.revenue));



            // Add X axis --> it is a date format
            const x = d3.scaleTime()
                .domain(d3.extent(state[0], function(d) { return d.date; }))
                .range([ 0, width ]);
            svg.append("g")
                .attr("transform", `translate(0, ${height})`)
                .call(d3.axisBottom(x));

            // Add Y axis
            const y = d3.scaleLinear()
                .domain([0, d3.max(state[0], function(d) { return d.revenue; })])
                .range([ height, 0 ]);
            svg.append("g")
                .call(d3.axisLeft(y));

            // Add the line
            svg.append("path")
                .datum(state[0])
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 5.5)
                .attr("d", d3.line()
                    .x(function(d) { return x(d.date) })
                    .y(function(d) { return y(d.revenue) })
                )



    }
    return <div ref={ref}></div>
}
export default Viz
