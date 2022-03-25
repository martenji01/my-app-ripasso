import axios from "axios"


export const getCoinList = async () => {
    try{
        const {data : coinList} = await axios.get("/coins/") //stringa concatenata al base url di axios
        console.log({ coinList })
        return ( coinList )
    }
    catch(error)
    {
        console.log(error)
        return{}
    }

}

export const getCoinDetails = async (id) => {
    try{
        console.log(id)
        const {data: coinRequired} = await axios.get('/coins/'+ id) //stringa concatenata al base url di axios
        //console.log( {coinRequired} )
        return ( coinRequired )
    }
    catch(error)
    {
        console.log(error)
        return{}
    }

}


export const getCoinChart = async (id) => {
    try{
        console.log(id)
        const {data: coinChart} = await axios.get('/coins/'+ id + "/market_chart?vs_currency=eur&days=30") //stringa concatenata al base url di axios
        
        return ( coinChart )
    }
    catch(error)
    {
        console.log(error)
        return{}
    }

}