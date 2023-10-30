import "./Gallery.scss"
import Card from "../Card/Card";

export default function Gallery({data, onClick, selectedPlayers}) {
    return <div className={"c-gallery"}>
        {data.map((item, index) => <Card key={index} data={item} onClick={onClick} isSelected={selectedPlayers.playerOne.name === item.name || selectedPlayers.playerTwo.name === item.name}/>)}
    </div>
}
