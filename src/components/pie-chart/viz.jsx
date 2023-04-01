import * as d3 from "d3";
import {useEffect, useRef} from "react";

const Viz= (props)=>{
    const arrangedData=props.data;
    const ref = useRef(null);
    useEffect(() => {
        return () => {
            console.log(100000)
            var margin = { top: 30, right: 120, bottom: 30, left: 50 },
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom,
                tooltip = { width: 100, height: 100, x: 10, y: -30 };
            //initialize margin end
            var svg1 =d3.select('svg').remove()
            var svg = d3.select(ref.current)

                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + width/2 + "," + height/2+ ")");

            var pie = d3.pie()
                .sort(null)
                .value(d => d.revenue);

            var arc = d3.arc()
                .innerRadius(0)
                .outerRadius(Math.min(width, height) / 2 - 1);

            var arcLabel = function(){
                const radius = Math.min(width, height) / 2 * 0.8;
                return d3.arc().innerRadius(radius).outerRadius(radius);
            }



            var color = d3.scaleOrdinal()
                .domain(arrangedData.map(d => d.country))
                .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), arrangedData.length).reverse())
            const arcs = pie(arrangedData);
            svg.append("g")
                .attr("stroke", "white")
                .selectAll("path")
                .data(arcs)
                .enter().append("path")
                .attr("fill", d => color(d.data.country))
                .attr("d", arc)
                .append("title")
                .text(d => `${d.data.country}: ${d.data.revenue.toLocaleString()}`);

            svg.append("g")
                .attr("font-family", "sans-serif")
                .attr("font-size", 12)
                .attr("text-anchor", "middle")
                .selectAll("text")
                .data(arcs)
                .enter().append("text")
                .attr("transform", d => `translate(${arcLabel().centroid(d)})`)
                .call(text => text.append("tspan")
                    .attr("y", "-0.4em")
                    .attr("font-weight", "bold")
                    .text(d => d.data.age))
                .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
                    .attr("x", 0)
                    .attr("y", "0.7em")
                    .attr("fill-opacity", 0.7)
                    .text(d => d.data.revenue.toLocaleString()));



        };
    }, []);

return <div ref={ref}></div>
}
export default Viz
