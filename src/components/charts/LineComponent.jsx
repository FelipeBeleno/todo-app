
import dayjs from 'dayjs';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";




export const LineComponent = ({ data, options, range }) => {

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
        <ResponsiveContainer >
            <LineChart
                width={500}
                height={300}
                data={newData.length === 0 ? data.map(d => ({ ...d, fecha: dayjs(d.fecha).format('DD/MM') })) : newData} margin={{
                    top: 5,
                    right: 30,
                    left: 30,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fecha" />
                <YAxis />
                <Tooltip />
                <Legend />
                {
                    options.Bogota
                    &&
                    <Line type="monotone" dataKey="Bogota" stroke="#8884d8" strokeDasharray="5 5" />

                }
                {
                    options.Medellin
                    &&
                    <Line type="monotone" dataKey="Medellin" stroke="#82ca9d" strokeDasharray="3 4 5 2" />
                }
            </LineChart>
        </ResponsiveContainer >
    )
}
