import dayjs from 'dayjs';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';


import {
    ResponsiveContainer,
    ComposedChart,
    Line,
    Area,
    //Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';



export const CombinateComponent = ({ data, options, range }) => {

    const [newData, setNewData] = useState(data)

    useEffect(() => {

        let newInfo = data.map(d => {
            let fecha = new Date(d.fecha)

            if (range.desde !== '' && range.hasta === '') {

                return fecha >= new Date(dayjs(range.desde).format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ')) && {
                    ...d,
                    fecha: dayjs(d.fecha).format('DD/MM')
                }
                //     && d.fecha <= new Date() && 
            }


            if (range.desde === '' && range.hasta !== '') {

                return fecha <= new Date(dayjs(range.hasta).format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ')) && {
                    ...d,
                    fecha: dayjs(d.fecha).format('DD/MM')
                }
                //     && d.fecha <= new Date() && 
            }

            if (range.desde !== '' && range.hasta !== '') {
                return fecha >= new Date(dayjs(range.desde).format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ'))
                    && fecha <= new Date(dayjs(range.hasta).endOf('day').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ'))
                    && {
                    ...d,
                    fecha: dayjs(d.fecha).format('DD/MM')
                }
            }
            if (range.desde === '' && range.hasta === '') {
                return {
                    ...d,
                    fecha: dayjs(d.fecha).format('DD/MM')
                }
            }
            return false

        })

        newInfo = newInfo.filter(d => typeof d !== 'boolean').reverse()


        setNewData(newInfo)
    }, [range, data])


    return (

        <ResponsiveContainer>
            <ComposedChart
                width={500}
                height={400}
                data={ newData.length === 0 ?data.map(d=>({...d, fecha: dayjs(d.fecha).format('DD/MM')}) ) : newData}
                margin={{
                    top: 20,
                    right: 30,
                    bottom: 20,
                    left: 30,
                }}
            >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="fecha" scale="band" />
                <YAxis />
                <Tooltip />
                <Legend />
                {
                    options.Bogota
                    &&
                    <Area type="monotone" dataKey="Bogota" fill="#8884d8" stroke="#8884d8" />

                }
                {
                    options.Medellin
                    &&
                    <Line type="monotone" dataKey="Medellin" stroke="#ff7300" />
                    //<Bar dataKey="pv" barSize={200} fill="#413ea0" />
                }
            </ComposedChart>
        </ResponsiveContainer>

    )
}
