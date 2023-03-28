import logo from './logo.svg';
import React, {useState, useEffect, useRef} from 'react';
import LineChart from "./line-chart/line-chart";
import * as d3 from "d3";
import dataset from "./data.csv";
import GroupedBarChat from "./grouped-bar-chat";

function App() {
    const [data, setData] = useState([]);
    const [keys, setKeys] = useState([])
    useEffect(() => {
            d3.csv(dataset).then(data => {

                data.forEach(d => {
                    for (const [key, value] of Object.entries(d)) {
                        d[key.toLowerCase().split(' ').join('_')] = value;


                        delete d[key];
                        d.date = new Date(d.date)
                        d.profit = +d.profit
                        d.revenue = +d.revenue
                        d.expenses = +d.expenses
                        d.profit = +d.profit
                        d.website_visits = +d.website_visits
                        d.employee_count = +d.employee_count
                        d.website_visits = +d.website_visits
                        d.product_a_sales = +d.product_a_sales
                        d.product_b_sales = +d.product_b_sales
                        d.customer_satisfaction = +d.customer_satisfaction
                        d.conversion_rate = +d.conversion_rate

                        setKeys([...keys, key])
                    }
                    setData([...data, d])
                })
            })
        }, []
    )
  return (
    <div className="App">

      <header className="App-header">

          {data.length>0&&<><LineChart data={data} keys={keys}/>
              <GroupedBarChat data={data} keys={keys}/>  </>}


      </header>
    </div>
  );
}

export default App;
