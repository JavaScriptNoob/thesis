import * as React from 'react';
import {useEffect, useRef} from "react";

import * as d3 from "d3";

export const Another = (props) => {

    const ref = useRef(null)
    const dataset = props.data[0]
    useEffect(() => {
        return () => {
            const svg = d3.select(ref.current);

            const margin = {top: 20, right: 20, bottom: 30, left: 40};
            const width = 500 - margin.left - margin.right;
            const height = 400 - margin.top - margin.bottom;

            const x = d3.scaleBand()
                .domain(dataset.map(d => d.country))
                .range([margin.left, width - margin.right])
                .padding(0.1);

            const y = d3.scaleLinear()
                .domain([0, d3.max(dataset, d => d.revenue)])
                .nice()
                .range([height - margin.bottom, margin.top]);

            svg.append('g')
                .attr('fill', 'steelblue')
                .selectAll('rect')
                .data(dataset)
                .join('rect')
                .attr('x', d => x(d.country))
                .attr('y', d => y(d.revenue))
                .attr('height', d => y(0) - y(d.revenue))
                .attr('width', x.bandwidth());

            svg.append('g')
                .attr('transform', `translate(0,${height - margin.bottom})`)
                .call(d3.axisBottom(x))
                .selectAll('text')
                .attr('x', -10)
                .attr('y', 0)
                .attr('dy', '.35em')
                .attr('transform', 'rotate(-90)')
                .style('text-anchor', 'start');

            svg.append('g')
                .selectAll("g")
                // Enter in data = loop group per group
                .data(dataset)
                .enter()
                .attr('transform', `translate(${margin.left},0)`)
                .call(d3.axisLeft(y))
                .append('text')
                .attr('fill', '#000')
                .attr('transform', 'rotate(-90)')
                .attr('y', 6)
                .attr('dy', '0.71em')
                .attr('text-anchor', 'end')
                .text('Revenue');

        }
    }, []);

    return (
        <div ref={ref}>

        </div>
    );
};