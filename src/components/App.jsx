import React, {useState} from 'react';
import LineChart from "./line-chart/line-chart";
import * as d3 from "d3";

import GroupedBarChart from "./bar-chart/grouped-bar-chart";
import Piechart from "./pie-chart/pie-chart";

import dataset from "./data.json"


function App() {
    const [data, setData] = useState(dataset);
    const [sales, setSales] = useState([]);
    const [keys, setKeys] = useState([]);
    var parseTime = d3.timeParse("%d/%m/%Y");





    return (
        <div className="App">

            <div>{data&&<LineChart data={dataset} keys={keys}/>}</div>
            <div> {<GroupedBarChart data={data} keys={keys}/>}</div>
            <div> <Piechart data={data}/></div>








        </div>
    )
}

export default App;
