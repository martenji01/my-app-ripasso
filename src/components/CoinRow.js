import { useState, useEffect, useLayoutEffect } from "react"
import { getCoinDetails } from "../api/index.js"

export const CoinRow = ({coin}) => {

    const [showDetails, setShowDetails] = useState(false)

    useEffect(()=>{
        console.log(showDetails)
    }, [showDetails])

    const onClickRow = async (currentCoin)=>{
        //console.log(currentCoin)
        const currentCoinDetails = await getCoinDetails(currentCoin.id);
        console.log({currentCoinDetails})
    }

    return (
        <div className="rowItem" onClick={()=> onClickRow(coin)}
            /*onMouseEnter={setShowDetails(true)}
            onMouseLeave={setShowDetails(false)} */
        >
            <div><img src={coin.image.small}/></div>
            <div>{coin.name}</div>
            <div>{coin.symbol}</div>
        </div>
    )
}