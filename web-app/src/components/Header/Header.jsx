import { Button } from '../Button/Button'
import useTelegram from '../../hooks/useTelegram'
import './Header.css'

export const Header = () => {
    const { onClose, user } = useTelegram()
    
    return (
        <div className='header'>
            <Button onClick={onClose}>Закрыть</Button>
            <span className='header__username'>{user?.username}</span>
        </div>
    )
}