import { Game } from "../../model/Game";
import { getSubFieldValue } from "./actionForField";

const pairDataForGame = (data: any): Game[] =>{
    let games: Game[] = [];
    var isReject = getSubFieldValue('game', data.game.id)??0
    if(isReject>=0){
        let game:Game = {
            id: data.game.id,
            home: data.home.id,
            away: data.away.id,
            attendance: data.game.attendance,
            isReject: isReject
        }
        games.push(game);
    }
    return games;
}

export default pairDataForGame;
