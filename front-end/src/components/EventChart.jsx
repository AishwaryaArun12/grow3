import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
 
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const EventChart = ({data,text}) => {
    const options = {
        theme: localStorage.getItem('flowbite-theme-mode') == 'dark' ? "dark2" : "light2",
        animationEnabled: true,
        exportFileName: "New Year Resolutions",
        exportEnabled: true,
        title:{
            text: text
        },
        data: [{
            type: "pie",
            showInLegend: true,
            legendText: "{label}",
            toolTipContent: "{label}: <strong>{y}%</strong>",
            indexLabel: "{y}%",
            indexLabelPlacement: "inside",
            dataPoints : data
            // dataPoints: [
            //     { y: 32, label: "Health" },
            //     { y: 22, label: "Finance" },
            //     { y: 15, label: "Education" },
            //     { y: 19, label: "Career" },
            //     { y: 5, label: "Family" },
            //     { y: 7, label: "Real Estate" }
            // ]
        }]
    }
  return (
    <div>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
  )
}

export default EventChart
