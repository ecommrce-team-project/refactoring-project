"use client"
import { useState, useEffect } from 'react'
import Products from './Products'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async (signal) => {
      try {
        const response = await fetch('http://localhost:3000/api/estate/getall', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          signal,
        })

        if (!response) {
          throw new Error('Network response was not received')
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setProducts(data)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError(err.message || 'Failed to fetch products')
      } finally {
        setLoading(false)
      }
    }

    const controller = new AbortController()
    fetchProducts(controller.signal).catch(err => {
      console.error('Fatal fetch error:', err)
      setError('Failed to initialize product fetch')
      setLoading(false)
    })

    return () => {
      controller.abort()
      setLoading(false)
    }
  }, [])

  const retryFetch = () => {
    setLoading(true)
    setError(null)
    const controller = new AbortController()
    fetchProducts(controller.signal)
    return () => controller.abort()
  }

  return (
    <Products
      products={products}
      loading={loading}
      error={error}
      onRetry={retryFetch}
      handleAddProduct={() => console.log('Add product')}
      handleEditProduct={(id) => console.log('Edit product:', id)}
      handleDeleteProduct={(id) => console.log('Delete product:', id)}
    />
  )
}