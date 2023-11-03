import React, { PureComponent, useEffect, useRef, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios'


const chartData = [];


axios.post("/product/chart",{
    id: sessionStorage.getItem("productId")
}).then((response) => {
    if(response.data["rsltList"] !== null){
        console.log(response.data["rsltList"]);
        
        for(let i=0;i<response.data["rsltList"].length;i++){
            const itemData = {
                name: response.data["rsltList"][i].name
               , co2eq: response.data["rsltList"][i].co2eq  

            }
            chartData.push(itemData);
        }
    }
    //chartData = response.data["rsltList"];
    console.log(chartData);
})
.catch((error) => {
    console.log(error);
});


const getIntroOfPage = (label) => {
  if (label === 'Page A') {
    return "Page A is about men's clothing";
  }
  if (label === 'Page B') {
    return "Page B is about women's dress";
  }
  if (label === 'Page C') {
    return "Page C is about women's bag";
  }
  if (label === 'Page D') {
    return 'Page D is about household goods';
  }
  if (label === 'Page E') {
    return 'Page E is about food';
  }
  if (label === 'Page F') {
    return 'Page F is about baby food';
  }
  return '';
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="intro">{getIntroOfPage(label)}</p>
        <p className="desc">&nbsp;</p>
      </div>
    );
  }

  return null;
};

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/tooltip-with-customized-content-lyxvs';
  
  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5, 
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="co2eq" barSize={20} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
