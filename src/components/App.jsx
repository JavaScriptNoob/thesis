import React, {useState, useEffect} from 'react';
import LineChart from "./line-chart/line-chart";
import * as d3 from "d3";

import GroupedBarChart from "./bar-chart/grouped-bar-chart";
import {Chart} from "./chart/chart";
import {Another} from "./another/another";
import dataset from "./data.json"
import {areaRadial} from "d3";

function App() {
    const [data, setData] = useState(dataset);
    const [sales, setSales] = useState([]);
    const [keys, setKeys] = useState([]);
    var parseTime = d3.timeParse("%d/%m/%Y");
    useEffect(() => {
        return () => {
            const arr = data.map(d => {
               parseTime(d.date);
                function isValidDate(date) {
                    return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);
                }
                // console.log(isValidDate(d.date))

                return d
            })
            // console.log(arr)
        }

    }, []);




    return (
        <div className="App">
            {data.length > 0 &&
                <>
                    <LineChart data={data} keys={keys}/>
                    <GroupedBarChart data={data} keys={keys}/>
                    {
                        data.length > 0 &&
                        <Chart data={data}/>
                    }
                    {
                        sales.length > 0 &&
                        <Another data={data}/>
                    }
                </>
            }


        </div>
    )
}

export default App;
