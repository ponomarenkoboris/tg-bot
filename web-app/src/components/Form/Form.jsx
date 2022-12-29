import { useReducer, useEffect, useCallback } from 'react'
import { formActionTypes, formReducer, initialState } from './utils'
import useTelegram from '../../hooks/useTelegram'
import './Form.css'

export const Form = () => {
    const [{ country, street, subject }, dispatch] = useReducer(formReducer, initialState)
    const { tg } = useTelegram()

    const onChangeCountry = (e) => { dispatch({ type: formActionTypes.SET_COUNTRY, payload: e.target.value }) }
    const onChangeStreet = (e) => { dispatch({ type: formActionTypes.SET_STREET, payload: e.target.value }) }
    const onChangeSubject = (e) => { dispatch({ type: formActionTypes.SET_SUBJECT, payload: e.target.value }) }

    const onSendData = useCallback(() => { tg.sendData(JSON.stringify({ country, street, subject })) }, [country, street, subject])

    useEffect(() => { 
        if (country && street && subject) {
            tg.MainButton.show()
            tg.MainButton.setParams({
                text: 'Отправить данные'
            })
        } else {
            tg.MainButton.hide()
        }

        tg.onEvent('mainButtonClicked', onSendData)
        return () => tg.offEvent('mainButtonClicked', onSendData)
    }, [country, street, subject])

    return (
        <form className='form'>
            <h3>Введите ваши данные</h3>
            <input onChange={onChangeCountry} className='form__input' type="text" placeholder='Страна' value={country}/>
            <input onChange={onChangeStreet} className='form__input' type="text" placeholder='Улица' value={street}/>
            <select onChange={onChangeSubject} className='form__select' value={subject}>
                <option value="physical">Физ. лицо</option>
                <option value="legal">Юр. лицо</option>
            </select>
        </form>
    )
}