import React, { useState } from 'react';
import { Map as LeafletMap, TileLayer, Circle, Popup } from "react-leaflet";
import "./Map.css";
import { showDataonMap } from "./util";
// import { Circle,  } from "react-leaflet";


function Map({ stateInfo, rajya, center, zoom }) {

    // var px = 0;

    // stateInfo.forEach(element => {
    //     if (element['name'] == "Total") {
    //         console.log(element.confirmed);
    //     }
    //     // console.log(element);
    // });
    // var a = stateInfo.filter((data) => data.state === "Assam")
    // console.log(a.confirmed);
    // const [state, setState] = useState(0);

    return (

        <div className="map">
            <LeafletMap center={center}
                zoom={zoom}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"
                />
                {

                    rajya.map((mc) => {
                        // var px = 100000;

                        var px = [];

                        stateInfo.forEach(element => {
                            if ((element['name'].toLowerCase()).localeCompare((mc.name).toLowerCase()) === 0) {

                                px.push(Math.sqrt(element.active) * 1000);
                                console.log(element.name, mc.name, px)
                            }
                            // else {
                            //     // this.px = 0;
                            //     px.push(0);
                            // }
                            console.log(px);
                            // console.log(typeof mc.name)

                        })


                        return (
                            <Circle

                                center={[Number(mc.lat), Number(mc.lon)]}
                                color={`#000`}

                                fillOpacity={0.4}
                                radius={px[px.length - 1]

                                }


                            >
                                <Popup>
                                    <div className="info-container">
                                        <div className="info-name">{mc.name}</div>
                                        <div>Total: {Math.round(Math.pow(px[px.length - 1] / 1000, 2))}</div>
                                    </div>
                                </Popup>
                            </Circle>
                        )
                    })
                }

            </LeafletMap>

        </div>
    )
}

export default Map
