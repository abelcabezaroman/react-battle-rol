import "./Card.scss"
export default function Card({data, onClick = () => {}, isSelected}){
    return <div className={"c-card" + (isSelected ? " c-card--selected" : "")} onClick={() => onClick(data)}>
        <h2 className={"c-card__title"}>{data.name}</h2>
        <img className={"c-card__img"} src={data.avatar} alt={data.name}/>
    </div>
}
