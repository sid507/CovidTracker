import { Circle } from "leaflet";
import React from "react";
// import { Circle, Popup } from "react-leaflet";



export const sortData = (data) => {
    const sortedData = [...data];

    sortedData.sort((a, b) => {
        if (Number(a.active) > Number(b.active)) {
            return -1;
        }
        else {
            return 1;
        }
    })

    return sortedData;
}
// export const showDataonMap = (data) => {
//     return (

//     )
// }