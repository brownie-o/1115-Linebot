// 沒有from 單純執行
import 'dotenv/config'
// 有from 執行並拉進來
import linebot from 'linebot'
import fe from './commands/fe.js'
import be from './commands/be.js'
import anime from './commands/anime.js'
import { scheduleJob } from 'node-schedule'
import * as usdtwd from './data/usdtwd.js'

// https://crontab.guru/every-day
scheduleJob('0 0 * * *', () => {
  // 每天0點更新
  usdtwd.update()
})
// 剛開啟機器人的時候要更新
// ctrl + 點擊 就會跑到該function
usdtwd.update()

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

// bot.on('message') => 代表收到訊息時
// https://www.npmjs.com/package/linebot
bot.on('message', event => {
  if (process.env.DEBUG === 'true') {
    console.log(event)
  }

  if (event.message.type === 'text') {
    if (event.message.text === '前端') {
      fe(event)
    } else if (event.message.text === '後端') {
      be(event)
      // .startsWith('') 訊息是以''開頭
    } else if (event.message.text.startsWith('動畫')) {
      anime(event)
    } else if (event.message.text === '匯率') {
      event.reply(usdtwd.exrate.toString())
    }
  }
})

// '/' -> 路徑
bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
