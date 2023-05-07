import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import {getAllDiscrepancies} from '../../utils/api/api';
import pairDataForGame from '../../utils/pair/pairDataForGame';
import pairDataForTeam from '../../utils/pair/pairDataForTeam';
import pairDataForPlayer from '../../utils/pair/pairDataForPlayer';
import switchUrlForType from '../../utils/pair/switchUrlForType';
import * as TeamModel from '../../model/Team';
import * as GameModel from '../../model/Game';
import * as PlayerModel from '../../model/Player';
import { GAME, generateColumns, PLAYER, TEAM } from '../../utils/common';
import { rejectObject, resolveObject } from '../../utils/pair/actionForField';

const Home = ()=> {
  const [gameData, setGameData] = useState<GameModel.Game[]>([]);
  const [teamData, setTeamData] = useState<TeamModel.Team[]>([]);
  const [playersData, setPlayersData] = useState<PlayerModel.Player[]>([]);

  useEffect(() => {
    getAllDiscrepancies().then(result=>{
      pairAll(result);
    })
  }, []);

  const getHeaderTitle = (type = 0, title = 'Title')=>{
    return <a href={switchUrlForType(type)}>{title}</a>
  }

  const resolveGameItem = (item: GameModel.Game) =>{
    resolveObject('game', item.id)
    setGameData(prevState => {
      const newState = prevState.map(obj => {
        // 👇️ if id equals 2, update the country property
        if (obj.id === item.id ) {
          return {...obj, isReject: 1};
        }
        // 👇️ otherwise return the object as is
        return obj;
      });
  
      return newState;
    });
  }
  const rejectGameItem = (item: GameModel.Game) =>{
    rejectObject('game', item.id)
    setGameData(current =>
      current.filter(obj => {
        return !(obj.id === item.id)
      }),
    );
  }

  const resolveTeamItem = (item:TeamModel.Team) =>{
    resolveObject('team', item.id);
    setTeamData(prevState => {
      const newState = prevState.map(obj => {
        // 👇️ if id equals 2, update the country property
        if (obj.id === item.id && obj.name == item.name) {
          return {...obj, isReject: 1};
        }
  
        // 👇️ otherwise return the object as is
        return obj;
      });
  
      return newState;
    });
  }
  const rejectTeamItem = (item:TeamModel.Team) =>{
    rejectObject('team', item.id);
    setTeamData(current =>
      current.filter(obj => {
        return !(obj.id === item.id && obj.name == item.name)
      }),
    );
  }

  const resolvePlayerItem = (item:PlayerModel.Player) =>{
    resolveObject(item.team+ 'players', item.id);
    setPlayersData(prevState => {
      const newState = prevState.map(obj => {
        // 👇️ if id equals 2, update the country property
        if (obj.id === item.id && obj.team == item.team) {
          return {...obj, isReject: 1};
        }
  
        // 👇️ otherwise return the object as is
        return obj;
      });
  
      return newState;
    });
  }
  const rejectPlayerItem = (item:PlayerModel.Player) =>{
    rejectObject(item.team+ 'players', item.id)
    setPlayersData(current =>
      current.filter(obj => {
        return !(obj.id === item.id && obj.team == item.team)
      }),
    );
  }

  const pairAll = (data: any) => {
    const game = pairDataForGame(data );
    setGameData(game);

    const homePlayers = pairDataForPlayer(data['homePlayers'] , data['home']['id'] , 'home');
    const awayPlayers = pairDataForPlayer(data['awayPlayers'] , data['away']['id'] , 'away');
    setPlayersData([...homePlayers,...awayPlayers]);

    const teams = pairDataForTeam(data);
    setTeamData(teams);
  }

  return (
    <div className="App">
      <p className='text-2xl font-bold text-center my-6'> All Discrepancies </p>
      <div className='px-5 my-5'>
        <Table columns={generateColumns(GAME, resolveGameItem, rejectGameItem)} dataSource={gameData} pagination={false} title={() => getHeaderTitle(0, 'Game Discrepancies')} />
        <Table columns={generateColumns(TEAM, resolveTeamItem, rejectTeamItem)} dataSource={teamData} pagination={false} title={() => getHeaderTitle(1, 'Teams Discrepancies')} />
        <Table columns={generateColumns(PLAYER, resolvePlayerItem, rejectPlayerItem)} dataSource={playersData} pagination={false}title={() => getHeaderTitle(2, 'Player Discrepancies')} />
      </div>
    </div>
  );
}

export default Home;