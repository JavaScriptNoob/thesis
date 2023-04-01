import * as React from 'react';
import {useEffect,useState} from "react";

import * as d3 from "d3";

import Viz from "./viz";


const Piechart = (props) => {
    const data = props.data;
    const [arrangedData, setArrangedData] = useState(null)
    const [mutated, setMutated] = useState(false)

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
            setMutated(true)

        };

    }, []);


    return (
        <div>
            <div>{mutated && arrangedData.map(data => {
                return  <button>{data.country}</button>
            })}
            </div>
            {mutated && <Viz data={arrangedData}/>
            }


        </div>


    );

}
export default Piechart
