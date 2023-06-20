import dayjs from 'dayjs';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';


export const AreaComponent = ({ data, options, range }) => {

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

            <AreaChart
                width={500}
                height={400}
                data={newData.length === 0 ? data.map(d => ({ ...d, fecha: dayjs(d.fecha).format('DD/MM') })) : newData}
                margin={{
                    top: 0,
                    right: 30,
                    left: 30,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fecha" />
                <YAxis />
                <Tooltip />
                <Legend />
                {options.Bogota
                    &&
                    <Area type="monotone" dataKey="Bogota" stroke="#8884d8" fill="#8884d8" />
                }
                {
                    options.Medellin &&
                    <Area type="monotone" dataKey="Medellin" stroke="#ff7300" fill="#ff7300" />
                }
            </AreaChart>
        </ResponsiveContainer>
    )
}
