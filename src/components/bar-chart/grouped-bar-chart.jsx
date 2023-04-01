import {useEffect, useRef, useState} from "react";
import styles from "./bar-chart.module.css"
import VizGroupChart from "./viz-group-chart";
const GroupedBarChart=(props)=> {
   ;
    const [state,setState] = useState(props)




    return (

        <div className={styles.container}>

            <VizGroupChart data={state.data}/>
        </div>
    )
    }
export  default GroupedBarChart
