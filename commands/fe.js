import axios from 'axios'
// 引用cheerio套件 要用import * as...寫法
import * as cheerio from 'cheerio'

// 處理收到'前端'時機器人的回覆
export default async (event) => {
  try {
    // 可以 const { data:a } 重新命名data為 a
    const { data } = await axios.get('https://wdaweb.github.io/')
    // cheerio 套件可以用JQ語法解析HTML文字
    const $ = cheerio.load(data)
    // 先開一個陣列放取出的內容
    const replies = []
    $('#fe .card-title').each(function () {
      // 把取出的內容放入陣列
      replies.push($(this).text().trim())
    })
    // event.reply只能跑一次 所以不能放在each裡面
    event.reply(replies)
  } catch (error) {
    console.log(error)
  }
}
