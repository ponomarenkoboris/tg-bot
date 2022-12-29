import {Button} from '../Button/Button'
import './ProductItem.css'

export const ProductItem = ({ product, className, onAppend }) => {
    const onAppendHandler = () => onAppend(product)
    return (
        <div className={'product' + className}>
            <div className={"product__image" + className}></div>
            <div className={"product__title" + className}>{product.title}</div>
            <div className={"product__description" + className}>{product.description}</div>
            <div className={"product__price" + className}>
                <span>Стоимость: <b></b>{product.price}</span>
            </div>
            <Button className='product__button' onClick={onAppendHandler}>Добавитьв корзину</Button>
        </div>
    )
}