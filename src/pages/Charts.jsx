import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import CheckBox from '@mui/material/Checkbox';

import { AreaComponent } from "../components/charts/AreaComponent"
import { BarComponent } from "../components/charts/BarComponent"
import { CombinateComponent } from "../components/charts/CombinateComponent"
import { LineComponent } from "../components/charts/LineComponent"
import { MultiLineComponent } from "../components/charts/MultiLineComponent"
import { useCallback, useEffect, useState } from 'react';
import { Grid, TextField, Typography } from '@mui/material';

export const Charts = () => {


  const [getData, setGetData] = useState('sales')
  const [data, setData] = useState([])
  const [rangeDate, setRangeDate] = useState({
    desde: '',
    hasta: ''
  })


  const fetchData = useCallback(
    async () => {
      const response = await fetch(`/${getData}.json`);
      let body = await response.json();

      setData(body)
    },
    [getData],
  )

  useEffect(() => {
    fetchData()
  }, [getData, fetchData])


  const [chartSelected, setChartSelected] = useState('bar');

  const [region, setRegion] = useState({
    Medellin: true,
    Bogota: true
  })

  function handleChangeValues({ target }) {
    setRegion({
      ...region,
      [target.name]: target.checked
    })
  }

  function handleRadioGroup({ target }) {
    setChartSelected(target.value)
  }

  function reRenderChart(chart) {



    let dataFn = data.map(d => {
      return {
        ...d,
        fecha: d.fecha
      }
    })



    switch (chart) {
      case 'bar':

        return <BarComponent data={dataFn} options={region} range={rangeDate} />;
      case 'line':

        return <LineComponent data={dataFn} options={region} range={rangeDate} />;
      case 'multi-line':

        return <MultiLineComponent data={dataFn} options={region} range={rangeDate} />;
      case 'combinate':

        return <CombinateComponent data={dataFn} options={region} range={rangeDate} />;

      case 'area':
        return <AreaComponent data={dataFn} options={region} range={rangeDate} />
      case null:
        return <h1>Seleccione un grafico</h1>
      default:
        break;
    }

  }

  function handleChangeData({ target }) {
    setGetData(target.value)
  }

  function handleChangeDate({ target }) {
    console.log(target.value)
    setRangeDate({
      ...rangeDate,
      [target.name]: target.value
    })
  }

  return (
    <div >
      <h1 style={{ marginLeft: '2rem', marginTop: '1rem' }}>Graficos</h1>
      <Grid container direction="row"
        justifyContent="space-evenly"
        alignItems="baseline"
        gap={1}
      >

        <Grid item xs={12} md={12} lg={12} xl={4} justifyContent='center' >

          <FormControl style={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <FormLabel id="demo-row-radio-buttons-group-label">Seleccione el reporte</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={getData}
              onChange={handleChangeData}
            >
              <FormControlLabel value="sales" control={<Radio />} label="Ventas" />
              <FormControlLabel value="users" control={<Radio />} label="Usuarios" />

            </RadioGroup>
          </FormControl>

        </Grid>


        <Grid item xs={12} md={12} lg={6} xl={4} justifyContent='center' >

          <FormControl style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FormLabel id="demo-row-radio-buttons-group-label">Seleccione el grafico</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={chartSelected}
              onChange={handleRadioGroup}
              style={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >

              <FormControlLabel value="bar" control={<Radio />} label="Barras" />
              <FormControlLabel value="line" control={<Radio />} label="Lineal" />
              <FormControlLabel value="multi-line" control={<Radio />} label="Multi Linea" />
              <FormControlLabel value="combinate" control={<Radio />} label="Combinado" />
              <FormControlLabel value="area" control={<Radio />} label="Area" />

            </RadioGroup>
          </FormControl>

        </Grid>

        <Grid xs={12} md={12} lg={6} xl={4}>

          <FormControl
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
            component="fieldset" variant="standard">
            <FormLabel id="demo-row-radio-buttons-group-label">Seleccione los campos</FormLabel>
            <FormGroup
              row
            >
              <FormControlLabel control={<CheckBox checked={region.Bogota} name={"Bogota"} onChange={handleChangeValues} />} label="Bogotá" />
              <FormControlLabel control={<CheckBox checked={region.Medellin} name={"Medellin"} onChange={handleChangeValues} />} label="Medellin" />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} />

        <Grid item xs={12} md={5}
          display={'flex'} justifyContent={'center'}
          style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
          <Typography variant='body1' >
            Desde
          </Typography>
          <TextField type="date" name="desde" onChange={handleChangeDate} variant='outlined' />
        </Grid>
        <Grid item
          xs={12} md={5}
          display={'flex'} justifyContent={'center'}
          style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 10 }}
        >
          <Typography variant='body1' >
            Hasta
          </Typography>
          <TextField type="date" name="hasta" onChange={handleChangeDate} variant='outlined' />

        </Grid>
      </Grid>

      <div style={{
        width: '98vw',
        height: '65vh',
        marginTop: '0.5rem'
      }}>
        {
          reRenderChart(chartSelected)
        }
      </div>
    </div>
  )
}
