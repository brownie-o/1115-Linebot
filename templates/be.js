// export default: 把JSON變成js檔
export default () => {
  // 包成function 每次呼叫都可以return一個乾淨的模板 就不會被前一份改的模板影響
  return {
    type: 'bubble',
    hero: {
      type: 'image',
      url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png',
      size: 'full',
      aspectRatio: '20:13',
      aspectMode: 'cover'
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: 'Brown Cafe',
          weight: 'bold',
          size: 'xl'
        }
      ]
    }
  }
}
