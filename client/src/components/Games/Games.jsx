import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGamesFromServer } from "../../redux/actions/gameAction";




function Games() {
  const games = useSelector(state => state.games);
  // const themes = useSelector(state => state.themes)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGamesFromServer())
    // dispatch(getThemesFromServer())
  },[])
  console.log(games);
return (
  <>
<div className="gamesPage">
  <div className="themes">
    Темы
    {/* {themes.map((theme)=><div className="theme">{theme}</div>)} */}
  </div>
  <div>
  <div className="games">
  {games.length ? games.map(games =><div className="oneGame"><div><img className='picture' src={games.img} alt="" /></div> <div className="opis">{games.title}</div></div> ) : <div>Пока нет игр</div>}
    </div>
    <div >
      <input/>
      </div>
    </div>
</div>
  
  </>
)
}



export default Games;
