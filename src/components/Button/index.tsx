import * as C from './styles'
type Props = {
    label:string
    icon?: any
    onClick: React.MouseEventHandler<HTMLDivElement>
}
const Button = ({label, icon, onClick}:Props)=>{
    return(
        <C.Container onClick={onClick}>
            {icon && 
                <C.IconArea>
                    <C.Icon src={icon}/>
                </C.IconArea>
            }
            <C.label>{label}</C.label>
        </C.Container>
    )
}

export default Button;