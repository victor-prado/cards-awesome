import { searchCard } from './api.js';

async function testeSearchCard() {
    const data = await searchCard(val)
    console.log(data)
}

testeSearchCard()