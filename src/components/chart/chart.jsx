import * as React from 'react';
import {useEffect, useRef, useState} from "react";

import * as d3 from "d3";
import {create} from "d3";

export const Chart = (props) => {
    const data = props.data;
    const [arrangedData, setArrangedData]=useState(null)
    const ref = useRef(null)
    console.log();
    useEffect(() => {
        return () => {
            const df = d3.rollups(
                data,
                xs => d3.sum(xs, x => x.revenue),
                d => d.country
            )
                .map(([k, v]) => ({country: k, revenue: v}))
            console.log(df);
            setArrangedData(df)
        };

    }, []);

    const createPie= ()=>{


    }

    return (
        <div ref={ref}>
        Hello
        </div>
    );

}
