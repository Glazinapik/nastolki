// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGamesFromServer } from "../../redux/actions/gameAction";



function Games() {
  const games = useSelector(state => state.games);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGamesFromServer())
  },[])
  console.log(games);
return (
  <>
  
  {/* {games.length ? games.map(games => <div>{games.title}</div>) : <div>Пока нет игр</div>} */}
  <div ><h1>Пока карты обновляются</h1>
   </div>
  </>
)
}


export default Games;
