import dayjs from "dayjs";
import { useEffect } from "react";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";

export const BarComponent = ({ data, options, range }) => {


    const [newData, setNewData] = useState([])

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
                    && fecha <= new Date(dayjs(range.hasta).endOf('day').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ') )
                    && {
                    ...d,
                    fecha: dayjs(d.fecha).format('DD/MM')
                }
            }
            if (range.desde === '' && range.hasta === '') {
                return{
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
            
            <BarChart

                data={ newData.length === 0 ?data.map(d=>({...d, fecha: dayjs(d.fecha).format('DD/MM')}) ) : newData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 30,
                    bottom: 5
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
                    <Bar dataKey="Bogota" fill="#8884d8" />

                }
                {
                    options.Medellin
                    &&
                    <Bar dataKey="Medellin" fill="#82ca9d" />
                }
            </BarChart>
        </ResponsiveContainer>
    )
}
