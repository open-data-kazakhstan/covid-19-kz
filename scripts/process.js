const fs = require('fs')
const fetch = require('node-fetch')
const cheerio = require('cheerio')


fetch('https://www.coronavirus2020.kz/')
  .then(res => {
    if (!res.ok) {
      console.log('Failed to load the page.')
      return
    }
    res.text().then(page => {
      const $ = cheerio.load(page)
      const confirmed = parseInt($('span.number_cov').text())
      const recovered = $('span', 'div.recov_bl').text().split(':')[1]
      const deaths = 0 // TODO: handle deaths once we have confirmed death cases
      const now = (new Date()).toISOString() // GMT+0
      fs.appendFileSync('../data/kz.csv', [now, confirmed, recovered, deaths].join(',') + '\n')
    })
  })
