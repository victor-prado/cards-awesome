import axios from "axios";

export async function fetchRss() {
  try {
    const url = 'http://localhost:8002/rss';
    const res = await axios.get(url);
    // console.log('res', res)
    return res.data.items
  } catch (error) {
    console.log('Error  fetching or parsing RSS feed: ', error);
  }
  return []
}

export async function fetchCollection() {
  try {
    const url = 'http://localhost:8002/cards';
    const res = await axios.get(url);
    // console.log('cards', res.data)
    return res.data
  } catch (error) {
    console.log('Error  fetching or parsing cards: ', error);
  }
  return []
}

export async function fetchMostValuable(page, pageSize) {
  try {
    const cards = await fetchCollection()
    //console.log('cards', cards)
    const start = (page - 1) * pageSize
    console.log('start', start)
    const end = start + pageSize
    console.log('end', end)
    const mostValuable = cards.toSorted((a, b) => {
      return b.prices.usd - a.prices.usd
    }).slice(start, end)
    console.log('mostValuable', mostValuable)
    // console.log('expensives: ', mostValuable.map(c => c.prices.usd))
    return mostValuable
  } catch (error) {
    console.log('Error  fetching or parsing valuable cards: ', error);
  }
  return []
}

function toTitleFormat(text) {
  const words = text.split(' ').map((w) => {
    return w.charAt(0).toUpperCase() + w.slice(1)
  })
  return words.join(' ')
}

export async function fetchCard(cardId) {
  try {
    const cards = await fetchCollection()
    const card = cards.find(c => c.id === cardId)
    card.legalities = Object.entries(card.legalities).map((item, index) => {
      //const legality = item.replace('_', ' ')
      const value = toTitleFormat(item[1].replace('_', ' '))
      const prop = toTitleFormat(item[0])
      console.log(prop + ': ' + value)
      const obj = {}
      obj[prop] = value
      return [prop, value]
    })
    console.log('card.legalities ', card.legalities)
    return card
  } catch (error) {
    console.log('Error  fetching or parsing card: ', error);
  }
  return null
}
