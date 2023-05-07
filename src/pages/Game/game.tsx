import React, { useState, useEffect } from 'react';
import { Table, Tag } from 'antd';
import { getDiscrepanciesByGame } from '../../utils/api/api';
import pairDataForGame from '../../utils/pair/pairDataForGame';
import { rejectObject, resolveObject } from '../../utils/pair/actionForField';
import * as GameModel from '../../model/Game';
import { GAME, generateColumns } from '../../utils/common';

const Game = ()=> {
  const [gameData, setGameData] = useState<GameModel.Game[]>([]);

  useEffect(() => {
    getDiscrepanciesByGame().then(result=>{
      const game = pairDataForGame(result);
      setGameData(game);
    })
  }, []);

  const resolveItem = (item: GameModel.Game) =>{
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

  const rejectItem = (item: GameModel.Game) =>{
    rejectObject('game', item.id)
    setGameData(current =>
      current.filter(obj => {
        return !(obj.id === item.id)
      }),
    );
  }
  
  return (
    <div className="App">
      <p className='text-2xl font-bold text-center my-6'> Discrepancies For Game </p>
      <div className='px-5'>
        <Table columns={generateColumns(GAME, resolveItem, rejectItem)} dataSource={gameData} />
      </div>
    </div>
  );
}

export default Game;