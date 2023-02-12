import {useEffect, useState} from 'react'
import {IProduct} from '../models'
import axios, {AxiosError} from 'axios'
import {prouctsObj} from "../data/products";

export function useProducts() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function fetchProducts() {
    try {
      setError('')
      setLoading(true)
      const response = await axios.get<IProduct[]>('https://fakestoreapi.com/products?limit=5')
      setProducts(response.data)
      setLoading(false)
    } catch (e: unknown) {
      const error = e as AxiosError
      setLoading(false)
      setError(error.message)
      setProducts(prouctsObj)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return { products, error, loading }
}