const TelegramBot = require('node-telegram-bot-api')
const token = '5809742473:AAEJ1hzQ8Nl7QXvaR_URZFD8lEjFfUW8m_g'
const cors = require('cors')
const express = require('express')
const bot = new TelegramBot(token, { polling: true })

const app = express()

app.use(express.json)
app.use(cors())

bot.on('message', async (msg) => {
    const chatId = msg.chat.id
    const webAppUrl = 'https://classy-shortbread-e0b177.netlify.app'

    if (msg.text === '/start') {
        await bot.sendMessage(chatId, 'Ниже появятся кнопки создать форму', {
            reply_markup: {
                keyboard: [
                    [{text: 'App', web_app: {url: webAppUrl + '/form'}}],
                    [{text: 'Store', web_app: {url: webAppUrl}}]
                ]
            }
        })
        await bot.sendMessage(chatId, 'Ниже появятся кнопка перехода на гугл', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Application', web_app: {url: webAppUrl + '/form'}}]
                ]
            }
        })

    }

    // Only for inline keyboard
    if (msg?.web_app_data?.data) {
        try {
            const data = JSON.parse(msg.web_app_data.data)
            await bot.sendMessage(chatId, 'Спасибо за обратную связь')
            await bot.sendMessage(chatId, `Страна: ${data.country}`)
            await bot.sendMessage(chatId, `Улица: ${data.street}`)

            setTimeout(async () => {
                await bot.sendMessage(chatId, 'Всю информацию вы получите в этом чате')
            }, 2000)
        } catch (error) {
            console.log(error)
        }
    }
})

app.post('/web-app', async (req, res) => {
    const { queryId, products, totalPrice } = req.body

    try {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Успешная покупка',
            input_message_content: {
                message_text: 'Покупка на сумму: ' + totalPrice
            }
        })
        return res.status(200).json({})
    } catch (error) {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Не удалось преобрести товар',
            input_message_content: {
                message_text: 'Не удалось преобрести товар'
            }
        })
        return res.status(500).json({})
    }
})

const PORT = 3000
app.listen(PORT, () => console.log(`Server has been started on port: ${PORT}`))