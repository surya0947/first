import React from 'react'
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CCol,
  CLink,
  CRow,
  CWidgetStatsB,
  CWidgetStatsC,
  CWidgetStatsE,
  CWidgetStatsF,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cilArrowRight,
  cilBasket,
  cilBell,
  cilChartPie,
  cilMoon,
  cilLaptop,
  cilPeople,
  cilSettings,
  cilSpeech,
  cilSpeedometer,
  cilUser,
  cilUserFollow,
} from '@coreui/icons'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import { DocsExample } from 'src/components'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'

const Projects = () => {
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

  return (
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
  )
}

export default Projects
