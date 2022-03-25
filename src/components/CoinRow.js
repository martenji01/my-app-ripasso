import { useState, useEffect } from "react"
import { getCoinDetails } from "../api/index.js"
import { getCoinChart } from "../api/index.js"
import Chart from "react-apexcharts"
import CircularProgress from "@mui/material/CircularProgress"
export const CoinRow = ({coin}) => {

    const [showDetails, setShowDetails] = useState(false);
    const [showChart, setShowChart] = useState(false);  
    const [showLoader, setShowLoader] = useState(false);    
    
      const defaultChart = {
        options:  {
            chart: {
              id: "basic-bar"
            },
            xaxis: {
              categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
            }
          } 
        ,series:[
            {
              name: "series-1",
              data: [30, 40, 45, 50, 49, 60, 70, 91]
            }
          ]}
      const [coinChart, setCoinChart] = useState([]);
      const [coinChartSettings, setCoinChartSettings] = useState(defaultChart);
      const chartEffect = ()=>{
          
      }
      
    useEffect(()=>{
        console.log({showDetails})
        console.log({showChart})
    }, [showDetails,showChart])
    useEffect(async ()=>{
        console.log({coinChart})
        
    }, [coinChart])
    useEffect(async ()=>{
        console.log({coinChartSettings})
        
    }, [coinChartSettings])

    const onClickRow = async (currentCoin)=>{
        const currentCoinDetails = await getCoinDetails(currentCoin.id);
        console.log({currentCoinDetails})
        const currentCoinChart = await getCoinChart(currentCoin.id);
        setCoinChart(currentCoinChart);
        
        
        //console.log({categories})
        const newChartSettings = {
            options: {
                chart: {
                  id: "basic-bar"
                },
                xaxis: {
                  categories: currentCoinChart.prices.map(price=>price[0])
                }
              },
            series:{
                name: "series-1",
                data: currentCoinChart.prices.map(price=>price[1])
            }
        }
        console.log({newChartSettings})
        //setCoinChartSettings(newChartSettings);
    }
    const chartLoad = async (currentCoin)=>{
        if(showChart===true){
            setShowChart(false)
        } else {
            setShowLoader(true)
            const currentCoinChart = await getCoinChart(currentCoin.id);
            const newChartSettings ={
                options:  {
                    chart: {
                      id: "basic-bar"
                    },
                    xaxis: {
                      categories: currentCoinChart.prices.map(price=>price[0])
                    }
                  } 
                ,series:[
                    {
                      name: "series-1",
                      data: currentCoinChart.prices.map(price=>price[1])
                    }
                  ]}
            console.log({newChartSettings})
            setCoinChartSettings(newChartSettings);
            setShowLoader(false)
            setShowChart(true)
        }
       
        
    }
    
    return (
        <div className="containerRow">
            <div className="rowItem" onClick={()=> onClickRow(coin)}
            onMouseEnter={()=>{setShowDetails(true)}}
            onMouseLeave={()=> setShowDetails(false)}
            >
            <div><img src={coin.image.small}/></div>
            <div>{coin.name}</div>
            <div>{coin.symbol}</div>
            <button type="button" onClick={()=>chartLoad(coin)}>Show Chart</button>
            </div>
            {showLoader
            &&
            <div className="bg-white">
                <CircularProgress color="secondary"/>
            </div>
            
            }
            
            {showChart &&
            <Chart className="chart-set" options={coinChartSettings.options} series={coinChartSettings.series} type="line" height={380} width={500}/>
            }
            {showDetails &&
            <div className="rowDetails">{coin.market_data.circulating_supply} Pezzi</div>
            }
        </div>
        
    )
}