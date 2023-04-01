import React, {useState, useEffect, useRef} from 'react';
import *  as d3 from 'd3';
import dataset from "../data.json";
import {defaultKeyMap} from "@testing-library/user-event/dist/keyboard/keyMap";
import {areaRadial} from "d3";
import Viz from "./viz";

const LineChart = ({...props}) => {
    const [state, setState] = useState([]);
    const [dates,setDates]=useState([])

    const chartRef = useRef(null);
    console.log(props)

      //

    console.log(state, 'state')
// console.log(props)
//     var parseTime = d3.timeParse("%d/%m/%Y");
//
//     const arr =  props.data.map(data=>{data.date=parseTime(data.date); return data } )
//     console.log(arr)
    useEffect(() => {
        return () => {
            if (props.data.length>0){
                const df = d3.rollups(
                   props.data,
                    xs => d3.sum(xs, x => x.revenue),
                    d => d.date
                )
                    .map(([k, v]) => ({date: k, revenue: v}))
                setState([...state,df])

            }
            console.log(state)

        }
    },[])

    useEffect(() => {
        return () => {

        };
    }, []);

    return (
        <div className="line-chart" >
            {state.length>0&&<Viz data={state}></Viz>}
            <h1>LineChart</h1>
        </div>
    )
};

export default LineChart;
