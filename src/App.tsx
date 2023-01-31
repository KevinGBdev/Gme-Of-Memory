import  * as C  from './App.styles'
import logoImg from './assets/devmemory_logo.png'
import Button from './components/Button'
import { InfoItem } from './components/InfoItem'
import ReinstarIcon from './svgs/restart.svg'
import {useEffect,useState} from 'react'
import { GridItemType } from './types/GridItemTypes'
import { items } from './data/Items'
import { GridItem } from './components/GridItem'
import { FormatTime } from './helpers/FomatTime'

const App = () =>{
  const [playing, setPlaying] = useState<boolean>(false)
  const [timeElepsed, setTimeElepsed] = useState<number>(0)
  const [moveCount, setMoveCount] = useState<number>(0)
  const [showCount, setShowCount] = useState<number>(0)
  const [gridItem, setGridItem] = useState<GridItemType[]>([])
  

    useEffect(()=>{
      resetAndCreateGrid()
    }, [])

    useEffect(()=>{
    
      const time = setInterval(()=>{
        if(playing){
          setTimeElepsed(timeElepsed + 1)
        }
      }, 1000)

      return ()  => clearInterval(time)
    }, [playing, timeElepsed])

    //verify if opened are equal
    useEffect(()=>{
      if(showCount === 2){
        let opened = gridItem.filter(item=>item.shown === true )

          if(opened.length === 2){
            //v1 - of both are equal, make every 'shown' permanet
            
            if(opened[0].item === opened[1].item){
              let tmpGrid = [...gridItem]
              for(let i in tmpGrid){
                if(tmpGrid[i].shown){
                  tmpGrid[i].permanentShow = true
                  tmpGrid[i].shown = false
                }
              }
              setGridItem(tmpGrid)
              setShowCount(0)
            }else{
              setTimeout(()=>{
                // v2 - of they are not equal, close all 'shown'
                let tmpGrid = [...gridItem]
                for(let i in tmpGrid){
                  tmpGrid[i].shown = false
                }
                setGridItem(tmpGrid)
                setShowCount(0)
              },1000)
            }
              setMoveCount( moveCount => moveCount + 1)
          }
        
      }
    }, [showCount, gridItem])

    //verify if game is over
    useEffect(()=>{
     if(moveCount > 0 && gridItem.every(item => item.permanentShow === true)){
      setPlaying(false)
     }
    }, [moveCount, gridItem])


  const resetAndCreateGrid = ()=>{
    //step one - reset the game
    setTimeElepsed(0)
    setMoveCount(0)
    setShowCount(0)

    //step 2 - create the grid

    // step 2.1 - create a ampyt grid
    let tempGrid: GridItemType[] = []
    for(let i = 0; i < items.length * 2; i++){
      tempGrid.push({
        item:null,
        shown: false,
        permanentShow: false,
      })
    }

    // 2.2 - preencher the grid
    for(let w = 0; w < 2; w++){
      for(let i = 0; i < items.length; i++){
        let pos = -1
        while(pos < 0 || tempGrid[pos].item !== null){
          pos = Math.floor(Math.random() * (items.length * 2))
        }
        tempGrid[pos].item = i
      }
    }
    //2.3 - jogar no state
    setGridItem(tempGrid)
    //step 3 - start the game
    setPlaying(true)

  }

  const handleItemClick = (index:number)=>{
    if(playing && index !== null && showCount < 2){
      let tmpGrid = [...gridItem]
      if(tmpGrid[index].permanentShow === false && tmpGrid[index].shown === false){
        tmpGrid[index].shown = true
        setShowCount(showCount + 1)
      }
      setGridItem(tmpGrid)
    }
  }

  return(
    <C.Container>
      <C.Info>
        <C.LogoLink>
          <img src={logoImg} width='200' alt="" />
        </C.LogoLink>

        <C.InfoArea>
          <InfoItem label='Tempo' value={FormatTime(timeElepsed)}/>
          <InfoItem label='Movimentos' value={moveCount.toString()}/>
        </C.InfoArea>

        <Button label='Reiniciar' icon={ReinstarIcon} onClick={resetAndCreateGrid}/>
      </C.Info>
      <C.GridArea>
        <C.Grid>
          {gridItem.map((item, index)=>(
            <GridItem
              key={index}
              item={item}
              onClick={()=>handleItemClick(index)}
            />
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  )
}

export default App;