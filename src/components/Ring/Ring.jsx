import Card from "../Card/Card";
import Hits from "../Hits/Hits";

import "./Ring.scss";

export default function Ring({players, hits, isPlayerOneAttacking, isPlayerOneWinner}) {
    return <div className={"c-ring"}>
        <div
            className={"c-ring__player" + (isPlayerOneAttacking ? " c-ring__player--attacking" : " c-ring__player--defending") + (isPlayerOneWinner === true ? " c-ring__player--winner" : isPlayerOneWinner === false ? " c-ring__player--loser" : "")}>
            <Card data={players.playerOne}/>
        </div>
        <Hits data={hits}/>
        <div
            className={"c-ring__player" + (!isPlayerOneAttacking ? " c-ring__player--attacking" : " c-ring__player--defending") + (isPlayerOneWinner === false ? " c-ring__player--winner" : isPlayerOneWinner === true ? " c-ring__player--loser" : "")}>
            <Card data={players.playerTwo}/>
        </div>
    </div>
}
