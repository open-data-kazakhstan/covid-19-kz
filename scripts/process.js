const fs = require('fs')
const fetch = require('node-fetch')
const cheerio = require('cheerio')


fetch('https://www.coronavirus2020.kz/')
  .then(res => {
    if (!res.ok) {
      console.error('Failed to load the page.')
      return
    }
    res.text().then(page => {
      const $ = cheerio.load(page)
      const confirmed = parseInt($('span.number_cov', 'div.last_info_covid_bl').text())
      const recovered = parseInt($('span', 'div.red_line_covid_bl').text().split(':')[1])
      const deaths = parseInt($('span', 'div.deaths_bl').text().split(':')[1])
      const now = (new Date()).toISOString() // GMT+0
      const region = 'Казахстан'
      fs.appendFileSync('../data/kz.csv', [now, confirmed, recovered, deaths, region].join(',') + '\n')
      const regions = ['Нур-Султан', 'Алматы', 'Шымкент',
        'Акмолинская область', 'Алматинская область', 'Атырауская область',
        'Актюбинская область', 'Жамбылская область', 'Павлодарская область',
        'Северо-Казахстанская область', 'Мангистауская область',
        'Восточно-Казахстанская область', 'Западно-Казахстанская область',
        'Карагандинская область', 'Костанайская область',
        'Кызылординская область', 'Туркестанская область'
      ]
      regions.forEach(region => {
        let confirmed = 0
        let recovered = 0
        let deaths = 0
        $('div.city_cov', 'div.last_info_covid_bl').children().map((index, element) => {
          if($(element).text().includes(region)) {
            confirmed = parseInt($(element).text().split('–')[1].trim())
          }
        })
        $('div.city_cov', 'div.red_line_covid_bl').children().map((index, element) => {
          if($(element).text().includes(region)) {
            recovered = parseInt($(element).text().split('–')[1].trim())
          }
        })
        // Data by region for deaths doesn't exist yet so we're guessing the page structure.
        if ($('div.city_cov', 'div.deaths_bl') && $('div.city_cov', 'div.deaths_bl').children().length) {
          $('div.city_cov', 'div.deaths_bl').children().map((index, element) => {
            if($(element).text().includes(region)) {
              deaths = parseInt($(element).text().split('–')[1].trim())
            }
          })
        } else {
          // For now we know that only 1 death happened in city of Nur-Sultan
          deaths = region === 'Нур-Султан' ? 1 : 0
        }
        fs.appendFileSync('../data/kz.csv', [now, confirmed, recovered, deaths, region].join(',') + '\n')
      })
    })
  })
