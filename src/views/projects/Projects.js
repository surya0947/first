import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardGroup, CCardHeader, CWidgetStatsC } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import { cilBasket, cilChartPie, cilPeople, cilSpeedometer, cilUserFollow } from '@coreui/icons'
import ProjectCard from './ProjectCard'

const Projects = () => {
  const [products, setProducts] = useState({})

  useEffect(() => {
    let url = `${process.env.REACT_APP_API_URL}/getProducts`
    axios
      .get(url)
      .then((response) => {
        console.log('-------', response.data.products)
        setProducts(response.data.products)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Widgets</CCardHeader>
        <CCardBody>
          <CCardGroup className="mb-4">
            <CWidgetStatsC
              icon={<CIcon icon={cilPeople} height={36} />}
              value="87.500"
              title="Visitors"
              progress={{ color: 'info', value: 75 }}
            />
            <CWidgetStatsC
              icon={<CIcon icon={cilUserFollow} height={36} />}
              value="385"
              title="New Clients"
              progress={{ color: 'success', value: 75 }}
            />
            <CWidgetStatsC
              icon={<CIcon icon={cilBasket} height={36} />}
              value="1238"
              title="Products sold"
              progress={{ color: 'warning', value: 75 }}
            />
            <CWidgetStatsC
              icon={<CIcon icon={cilChartPie} height={36} />}
              value="28%"
              title="Returning Visitors"
              progress={{ color: 'primary', value: 75 }}
            />
            <CWidgetStatsC
              icon={<CIcon icon={cilSpeedometer} height={36} />}
              value="5:34:11"
              title="Avg. Time"
              progress={{ color: 'danger', value: 75 }}
            />
          </CCardGroup>
        </CCardBody>
      </CCard>
      <div className="row">
        {products && products.map((v, i) => {
          return <ProjectCard key={i} data={v} />
        })}
      </div>
    </>
  )
}

export default Projects
