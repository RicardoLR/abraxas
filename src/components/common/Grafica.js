import React from "react"
import {
    ResponsiveContainer,
    Legend,
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip
} from 'recharts'
import moment from 'moment'
import { Col, Row } from 'react-bootstrap'

const Grafica = ({ data, color }) => {

    let terminadas, totales, proceso, 
        inicioSemana =  moment().isoWeek( moment(new Date()).isoWeek() ).startOf("isoweek").date(),
        finSemana =  moment().isoWeek( moment(new Date()).isoWeek() ).endOf("isoweek").date()
    
    terminadas = totales = proceso = 0


    data.map( item =>{
        if( 
            inicioSemana 
            <=
            moment().isoWeek( moment(new Date(item.date)).isoWeek() ).startOf("isoweek").date() 
            &&
            finSemana
            >=
            moment().isoWeek( moment(new Date(item.date)).isoWeek() ).startOf("isoweek").date()
            ){
                if( item.estado === 3 ) terminadas++
                else if( item.estado === 1 || item.estado === 2 )  proceso++

                totales++
            }
            
        // console.log(moment().isoWeek( moment(new Date(item.date)).isoWeek() ).startOf("isoweek").date() );
        // console.log(moment().isoWeek( moment(new Date(item.date)).isoWeek() ).endOf("isoweek").date() );
        
    })

    const dataFilter = [
        {name: 'Tareas totales', estado: totales},
        {name: 'En proceso', estado: proceso},
        {name: 'Terminadas', estado: terminadas}
    ];
    
    
    return (
        <div>
        <Row className="container">

            <Col xs={12}>
                <legend>{`Progreso semanal de ${inicioSemana} al ${finSemana}`}</legend>
            </Col>

            <Col xs={12} md={12} className="mb12">

                <ResponsiveContainer width="100%" height={300}>
                        
                    <BarChart 
                        width={600} 
                        height={300} 
                        data={dataFilter}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}
                    >
                        
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend />
                        <Bar dataKey='estado' fill={color} />
                    </BarChart>

                </ResponsiveContainer>
            
            </Col>
        </Row>
        </div>
    )
}

export default Grafica
