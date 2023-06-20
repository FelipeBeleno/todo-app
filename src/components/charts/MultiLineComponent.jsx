import dayjs from "dayjs";
import { useEffect } from "react";
import { useState } from "react";
import { LineChart, Line, Tooltip, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts";




export const MultiLineComponent = ({ data, options, range }) => {

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

  function renderData() {
      return data.map(d => ({ ...d, fecha: dayjs(d.fecha).format('DD/MM') }))
  }

  return (

    <ResponsiveContainer >
      <LineChart
        data={newData.length === 0 ? renderData() : newData}
        width={500}
        height={400}
        margin={{
          top: 20,
          right: 30,
          bottom: 20,
          left: 30,
        }}
      >
        <XAxis dataKey="fecha" />
        <YAxis />
        <Tooltip />
        <Legend />

        {
          options.Bogota
          &&
          <Line type="monotone" dataKey="Bogota" stroke="#8884d8" strokeWidth={2} />

        }
        {
          options.Medellin
          &&
          <Line type="monotone" dataKey="Medellin" stroke="#ff7300" strokeWidth={2} />

        }
      </LineChart>
    </ResponsiveContainer>

  )
}
