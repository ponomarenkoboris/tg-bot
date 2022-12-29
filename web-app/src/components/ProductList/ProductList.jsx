import { useState, useEffect, useCallback } from 'react'
import { ProductItem } from '../ProductItem/ProductItem'
import useTelegram from '../../hooks/useTelegram'
import products, { sendData } from './products'
import './ProductList.css'

export const ProductList = () => {
    const [addedProducts, setAddedProducts] = useState([])
    const { tg, queryId } = useTelegram()

    const onSendData = useCallback(() => sendData(addedProducts, queryId), [addedProducts, queryId])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => tg.offEvent('mainButtonClicked', onSendData)
    }, [onSendData])

    const onAppend = (product) => {
        const choesenProduct = products.find(prod => prod.id === product.id)
        let partialProducts = []

        if (choesenProduct) {
            partialProducts = addedProducts.filter(prod => prod.id !== choesenProduct.id)
            setAddedProducts(partialProducts)
        } else {
            partialProducts = [...addedProducts, choesenProduct]
            setAddedProducts(partialProducts)
        }

        if (partialProducts.length === 0) tg.MainButton.hide() 
        else {
            tg.MainButton.show()
            tg.MainButton.setParams({
                text: `Купить: ${partialProducts.reduce((prev, curr) => prev + curr.price, 0)}`
            })
        }
    }

    return (
        <div className='list'>
            {products.map(product => (
                <ProductItem key={product.id} className={'list__item'} product={product} onAppend={onAppend} />
            ))}
        </div>
    )
}