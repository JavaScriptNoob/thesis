import {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import {areaRadial} from "d3";
import styles from "./bar-chart.module.css"

const VizGroupChart =(props)=>{
    const ref = useRef(null);

    const [state, setState] = useState(props.data);;

    console.log(props,'VizGroupChart')
    useEffect(() => {
        return () => {


            createBar()
        };

    }, [state, props]);



 const createBar = () => {
     var container = d3.select(ref.current),
         width = 500,
         height = 300,
         margin = {top: 30, right: 20, bottom: 50, left: 50},
         barPadding = 0,
         axisTicks = {qty:10, outerSize: 50, dateFormat: '%m-%d'};

     var svg = container
         .append("svg")
         .attr("width", width)
         .attr("height", height)
         .append("g")
         .attr("transform", `translate(${margin.left},${margin.top})`);

     var xScale0 = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(barPadding);
     var xScale1 = d3.scaleBand();
     var yScale = d3.scaleLinear().range([220, 0]);

     var xAxis = d3.axisBottom(xScale0).tickSizeOuter(0);
     var yAxis = d3.axisLeft(yScale).ticks(axisTicks.qty).tickSizeOuter(0);

     xScale0.domain(props.data.map(d => d.group));
     xScale1.domain(['revenue','profit',"quantity"]).range([0, xScale0.bandwidth()]);
     console.log(yScale.domain([0, d3.max(props.data, d => d.profit)]),88888888888888)
     yScale.domain([0, d3.max(props.data, d => d.revenue+d.quantity)]);

     var model_name = svg.selectAll(".model_name")
         .data(props.data)
         .enter().append("g")
         .attr("class", "model_name")
         .attr("transform", d => `translate(${xScale0(d.group)},0)`)

     /* Add field1 bars */
     model_name.selectAll(".bar.revenue")
         .data(d => [d])
         .enter()
         .append("rect")
         .attr("class", "bar revenue")
         .style("fill","#008b8b")
         .attr("x", d => xScale1(d.revenue))
         .attr("y", d => yScale(d.revenue))
         .attr("width", xScale1.bandwidth())
         .attr("height", d => {
             return height - margin.top - margin.bottom - yScale(d.revenue)
         });

     /* Add field2 bars */
     model_name.selectAll(".bar.profit")
         .data(d => [d])
         .enter()
         .append("rect")
         .attr("class", "bar profit")
         .style("fill","#b48ead")
         .attr("x", d => xScale1('profit'))
         .attr("y", d => yScale(d.profit))
         .attr("width", xScale1.bandwidth())
         .attr("height", d => {
             return height - margin.top - margin.bottom - yScale(d.profit)
         });
     model_name.selectAll(".bar.quantity")
         .data(d => [d])
         .enter()
         .append("rect")
         .attr("class", "bar quantity")
         .style("fill","#5e81ac")
         .attr("x", d => xScale1('quantity'))
         .attr("y", d => yScale(d.quantity))
         .attr("width", xScale1.bandwidth())
         .attr("height", d => {
             return height - margin.top - margin.bottom - yScale(d.quantity)
         });

// Add the X Axis
     svg.append("g")
         .attr("class", "x axis")
         .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
         .call(xAxis).selectAll("text")
         .style("text-anchor", "end")
         .attr("dx", "-.6em")

         .attr("dy", "-0.3em")
         .attr("transform", "rotate(-65)" );

// Add the Y Axis
     svg.append("g")
         .attr("class", "y axis")
         .call(yAxis);


 }

    return <div>
        <h1>Barchart Viz</h1>
        <div ref={ref} className={styles.svg}></div>

    </div>
}
export default VizGroupChart
