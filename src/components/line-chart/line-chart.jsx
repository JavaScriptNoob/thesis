import React, {useEffect, useRef, useState} from 'react';
import *  as d3 from 'd3';
import VizLineChart from "./viz-line-chart";

const LineChart = (props) => {
    const [state, setState] = useState(props);
const [isReady, setIsReady] =useState(false)





setTimeout(()=>{setIsReady(true)},500)
    useEffect(() => {
        return () => {
        console.log(state,"inLineChart")
        };
    }, []);

    return (
        <div className="line-chart">
          <VizLineChart data={state}/>

            <h1>LineChart</h1>
        </div>
    )
};

export default LineChart;
