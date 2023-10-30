import {useEffect, useState} from "react";
import Gallery from "../Gallery/Gallery";
import Ring from "../Ring/Ring";

let isBattleFinished = false;
export default function Arena() {
    const [characters, setCharacters] = useState()
    const [players, setPlayers] = useState({playerOne: {}, playerTwo: {}})
    const [isShowingStartBattleButton, setIsShowingStartBattleButton] = useState(false)

    const [hits, setHits] = useState([])
    const selectCharacter = (selectedCharacter) => {
        const copyPlayers = {...players};
        if (copyPlayers.playerOne.name) {
            copyPlayers.playerTwo = selectedCharacter;
            setIsShowingStartBattleButton(true)
        } else {
            copyPlayers.playerOne = selectedCharacter
        }

        setPlayers(copyPlayers)
    }

    const nextRound = (playerOne, playerTwo, hits, setHits) => {

        const totalDamage = calcDamage(playerOne.damage, playerOne.critic)

        const copyPlayerTwo = {...playerTwo};

        const realTotalDamage = totalDamage - copyPlayerTwo.defense;

        copyPlayerTwo.vitality -= realTotalDamage


        setTimeout(() => {
            if (copyPlayerTwo.vitality > 0) {
                const newHits = [...hits, `${playerOne.name} did ${realTotalDamage} of damage to ${copyPlayerTwo.name}. ${copyPlayerTwo.name} have now ${copyPlayerTwo.vitality} PV`]
                setHits(newHits)
                nextRound(copyPlayerTwo, playerOne, newHits, setHits)
            } else {
                setHits([...hits, `${copyPlayerTwo.name} have been defeat. ${playerOne.name} is the winner`])
                isBattleFinished = true;
            }
        }, 700)
    }

    const calcDamage = (damages, critic) => {
        let totalDamage = 0;

        for (const damage of damages) {
            const stats = damage.split("d");
            const count = stats[0]
            const dice = stats[1];
            for (let i = 0; i < count; i++) {
                const diceDamage = Math.floor(Math.random() * dice) + 1;
                totalDamage += diceDamage === critic ? diceDamage * 2 : diceDamage;

            }
        }

        return totalDamage;

    }

    useEffect(() => {
        const getCharacters = async () => {
            const data = await (await fetch("http://localhost:3000/characters")).json()
            setCharacters(data)
        }
        getCharacters();
    }, []);
    return <div>
        {characters && hits.length === 0 &&
            <Gallery data={characters} onClick={selectCharacter} selectedPlayers={players}/>}

        {hits.length > 0 && <>
            <Ring players={players} hits={hits} isPlayerOneAttacking={!(hits.length % 2 === 0)}
                  isPlayerOneWinner={isBattleFinished ? players.playerOne.vitality > 0 : null}/>
        </>}

        {hits.length === 0 && isShowingStartBattleButton &&
            <div className={"u-display-flex u-justify-content-center u-margin-top-xl"}>
                <button className={"b-btn"}
                        onClick={() => nextRound(players.playerOne, players.playerTwo, hits, setHits)}>Start
                    battle
                </button>
            </div>}

    </div>
}
