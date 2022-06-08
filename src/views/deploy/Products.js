import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardGroup, CCardHeader, CWidgetStatsC } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import { cilBasket, cilChartPie, cilPeople, cilSpeedometer, cilUserFollow } from '@coreui/icons'
import ProductCard from './ProductCard'

const Products = () => {
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
        {products && products.length > 0 && products.map((v, i) => {
          return <ProductCard key={i} data={v} />
        })}
      </CCard>
    </>
  )
}

export default Products
