import { GridItemType } from '../../types/GridItemTypes'
import * as C from './styles'
import B7 from'../../svgs/b7.svg'
import { items } from '../../data/Items'

type Props = {
    item: GridItemType,
    onClick: ()=> void
}

export const GridItem = ({item,  onClick}: Props)=>{
    return(
        <C.Container 
            showBackGround = {item.permanentShow || item.shown}
            onClick={onClick}
        >
            {item.permanentShow === false && item.shown === false &&
                <C.Icon src={B7} alt='' opacity={.1}/>
            }
            {(item.permanentShow || item.shown) && item.item !== null &&
                <C.Icon src={items[item.item].icon} alt=''/>
            }
        </C.Container>
    )
}