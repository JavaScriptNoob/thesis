import React, {useEffect, useState} from 'react';
import LineChart from "./line-chart/line-chart";
import GroupedBarChart from "./bar-chart/grouped-bar-chart";
import Piechart from "./pie-chart/pie-chart";
import dataset from "./data.json"
import * as d3 from "d3";


function App() {
    const [data, setData] = useState(dataset);
    const [dataGrouped,setDataGrouped]=useState(dataset)
    const [dataPie,setDataPie]=useState(null)
    const [dataLine,setDataLine]=useState(null)
    useEffect(
        () => {


            let collatedValues = data.reduce((accumulator, currentValue) => {
                let existing = accumulator.find(n => n.group === currentValue.group);
                if (existing) {
                    existing.revenue += currentValue.revenue;
                    existing.profit += currentValue.profit;
                    existing.quantity += currentValue.quantity;
                    ['date', 'product', 'country', 'id', 'e'].forEach(e => delete existing[e]);
                } else {
                    accumulator.push(currentValue)
                }
                return accumulator
            }, [data])


            setDataGrouped(collatedValues)
        }, [])

    useEffect(
        () => {

            const df = d3.rollup(dataset, v => d3.sum(v, d => d.revenue), d => d.country);
            const arr = Array.from(df, function (entry) { if (!entry[0]){}
                return { country: entry[0], revenue: entry[1] };
            });
            arr.map((d, i)=>Object.keys(d).forEach(key => d[key] === undefined ? arr.splice(i, 1): {}))

            setDataPie(arr)
        }, [])


    useEffect(() => {
        return () => {

            const df = d3.rollup(dataset, v => d3.sum(v, d => d.revenue), d => d.date);

            const arr = Array.from(df, function (entry) { if (!entry[0]){}
                return { date: entry[0], revenue: entry[1] };
            });
            arr.map((d, i)=>Object.keys(d).forEach(key => d[key] === undefined ? arr.splice(i, 1): {}))

            console.log(arr,555555555555)
            setDataLine(arr)
        }
    }, [])



    return (
        <div className="App">

            {dataPie!==null&&<Piechart data={dataPie}/>}
            {dataGrouped!==null&&<GroupedBarChart data={dataGrouped}/>}]
            {dataLine!==null&&<LineChart data={dataLine}/>}

        </div>
    )
}

export default App;
