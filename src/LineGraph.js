import React, { useEffect, useState } from 'react'
import { Line } from "react-chartjs-2";
import numeral from "numeral";




function LineGraph({ casetype }) {
    const [data, setData] = useState({});
    console.log(`${casetype}`);
    const options = {
        legend: {
            display: false,
        },
        elements: {
            point: {
                radius: 0,
            },
        },
        maintainAspectRatio: false,
        tooltips: {
            mode: "index",
            intersect: false,
            callbacks: {
                label: function (tooltipItem, data) {
                    return numeral(tooltipItem.value).format("+0,0");
                },
            },
        },
        scales: {
            xAxes: [
                {
                    type: "time",
                    time: {
                        format: "DD MM",
                        tooltipFormat: "ll",
                    },
                },
            ],
            yAxes: [
                {
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values) {
                            return numeral(value).format("0a");
                        },
                    },
                },
            ],
        },
    };
    useEffect(() => {
        fetch('https://api.covid19india.org/data.json')
            .then((Response) => Response.json())
            .then((data) => {
                const a = data.cases_time_series;
                const b = buildChartData(a, { casetype });
                setData(b);


            })
    }, []);

    const buildChartData = (data, casestype = "dailyconfirmed") => {
        const X = [], Y = [];
        let lastDatapoint;
        data.forEach(element => {

            X.push(element.date);
            Y.push(element[`${casetype}`])
        });
        return { X, Y };
    }
    const state = {
        labels: data['X'],
        datasets: [
            {
                label: 'Cases',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(255,0,0,1)',
                borderWidth: 1,
                data: data['Y']
            }
        ]
    }

    return (
        <div>
            <Line
                data={state}
                options={{
                    title: {
                        display: true,
                        text: 'Increase in Cases',
                        fontSize: 2
                    },
                    legend: {
                        display: false,

                    },
                    tooltips: {
                        mode: "index",
                        intersect: false,
                        callbacks: {
                            label: function (tooltipItem, data) {
                                return numeral(tooltipItem.value).format("+0,0");
                            },
                        },
                    }
                }}
            />
        </div>
    )
}

export default LineGraph
