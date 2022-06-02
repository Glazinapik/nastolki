

import { useParams } from "react-router-dom";


import { useEffect, useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getGamesFromServer } from "../../redux/actions/gameAction";
import { getThemesFromServer } from "../../redux/actions/themesAction";
import GamesModal from "./GamesModal";




function Games() {


  const dispatch = useDispatch();
  const [newThemes, setNewThemes] = useState([])
  const [newGames, setNewGames] = useState([])
  const [inputValue, setInputValue] = useState('')
  useEffect(() => {
    dispatch(getGamesFromServer());
    const t = games.map(themes => themes.theme)
    const g = games.map(themes => themes.Games).flat()
    setNewThemes(t)
    setNewGames(g)
  },[])

  const games = useSelector(state => state.games);


  const chooseTheme =(them) => {
    const gamesByOneTheme = games.filter(theme => theme.theme === them)
    setNewGames(gamesByOneTheme[0].Games) 
  }
  const search = useMemo(() => {
    if(inputValue)return newGames.filter(game => game.title.toLowerCase().includes(inputValue.toLowerCase()))
    return newGames
  }, [inputValue, newGames])

return (
  <>
<div className="gamesPage">
  <div className="themes">

   <h1 className='theme' onClick={() => setNewGames(games.map(themes => themes.Games).flat())}> Темы</h1>
 {newThemes?.map((theme)=><div onClick={() => chooseTheme(theme)}  className="theme">{theme}</div>)} 
  </div>
  <div>
  <div className="games">
  <div className='gameI' >
      <input value={inputValue} type="text" onChange={(e) => setInputValue(e.target.value)} className="form-control inp" placeholder=" поиск по названию"/>
      </div>
  {search.length ? search.map(game => <div className="oneGame"><GamesModal {...game}><div><img className='picture' src={game.img} alt="" /></div></GamesModal> <div className="opis">{game.title}</div></div> ) : <div>Пока нет игр</div>}
    </div>
   

    </div>
</div>
  
  </>
)
}



export default Games;
