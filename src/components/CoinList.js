import { useState, useEffect, useMemo } from "react"
import { getCoinList } from "../api/index.js"
import { getCoinDetails } from "../api/index.js"
import {CoinRow} from "../components/CoinRow";

export const CoinList = () => {

    const [coins, setCoins] = useState([])

    const [search, setSearch] = useState("")

    const refreshData = async () =>{

        const coinsList = await getCoinList()
        setCoins(coinsList)
        console.log({coins})
    }   

    useEffect(()=>{refreshData()}, [])

    const filteredCoins = useMemo(()=>{
        const searched = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()))
        return searched.splice(0,100)
    },[coins, search])

    const onTextChange = (event) => {
        setSearch(event.target.value)
        console.log({search})
    }

    const onClickRow = async (currentCoin)=>{
        //console.log(currentCoin)
        const currentCoinDetails = await getCoinDetails(currentCoin.id);

        console.log({currentCoinDetails})
    }

    const coinRow = (coin) => {
        return(<CoinRow coin={coin} key={coin.id} />)
        /*
        return (
            <div className="rowItem" key={coin.id} onClick={()=> onClickRow(coin)}>
                <div><img src={coin.image.small}/></div>
                <div>{coin.name}</div>
                <div>{coin.symbol}</div>
            </div>
        )
        */
    }
    
    return (
        <div className="coin-list">
            <input placeholder={"Search"} onChange={onTextChange}></input>
            {filteredCoins.map(coinRow)}
        </div>
    )
}