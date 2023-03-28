import {useEffect, useRef} from "react";
import * as d3 from "d3";


const GroupedBarChat=({...props})=>{
const data = props.data;
const barRef = useRef(null)
    var formatTime = d3.timeFormat("%B %d, %Y");
    console.log(formatTime(data[0].date))
    var formatTime = d3.timeFormat("%B");


    const createBar =()=>{

        const margin = {top: 10, right: 30, bottom: 20, left: 60},
            width = 860 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom,
            barPadding = .2,
            axisTicks = {qty: 8, outerSize: 5, dateFormat: '%m-%d'};


        const svg= d3.select(barRef.current).append("svg").attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        const g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var xScale0 = d3.scaleBand().range([0,width-margin.left-margin.right])
            .padding(barPadding)
        const xScale1 = d3.scaleBand()
        const yScale =d3.scaleLinear().range([height-margin.top-margin.bottom,0])
        const xAxis = d3.axisBottom(xScale0).tickSizeOuter(axisTicks.outerSize)
        const yAxis = d3.axisLeft(yScale).ticks(axisTicks.qty)
            .tickSizeOuter(axisTicks.outerSize)

        xScale0.domain(props.data.map(d => formatTime(d.date)))
        xScale1.domain(['profit','revenue']).range([0,xScale0.bandwidth()])
        yScale.domain([0,d3.max(data, d => d.revenue)])

        var groups = svg.selectAll(".groups")
            .data(data)
            .enter().append("g")
            .attr("class", "model_name")
            .attr("transform", d => `translate(${xScale0(formatTime(d.date))},0)`);

        groups.selectAll(".bar.field1")
            .data(d => [d])
            .enter()
            .append("rect")
            .attr("class", "bar field1")
            .style("fill","blue")
            .attr("x", d => xScale1("profit"))
            .attr("y", d => yScale(d.profit))
            .attr("width", xScale1.bandwidth())
            .attr("height", d => {
                return height - margin.top - margin.bottom - yScale(d.profit)
            });
        groups.selectAll(".bar.field2")
            .data(d => [d])
            .enter()
            .append("rect")
            .attr("class", "bar field2")
            .style("fill","red")
            .attr("x", d => xScale1('revenue'))
            .attr("y", d => yScale(d.revenue))
            .attr("width", xScale1.bandwidth())
            .attr("height", d => {
                return height - margin.top - margin.bottom - yScale(d.revenue)
            });

// Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
            .call(xAxis);

// Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);
    }

    let isDate = function (input) {
        return Object.prototype.toString.call(input) === "[object Date]";

    };

    useEffect(

        ()=>{
            if (data.length && data[0].date){   if (isDate(data.length && data[0].date))
                createBar()
            };





        },[])
return (

        <div>
              <div ref={barRef} > </div>
        </div>
)


}
export  default GroupedBarChat