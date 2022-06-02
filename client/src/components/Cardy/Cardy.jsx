import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllPlayersFromServer } from "../../redux/actions/allPlayersAction";
import { getPlayersFromServer } from "../../redux/actions/playersAction";

function Cardy ({title, place, date, amount, id, owner}) {

  const dispatch = useDispatch();
  
  const navigate = useNavigate();
  
  const linkHandler = (link) =>{
    navigate(link)
  }
  
  // const players = useSelector(state => state.players);
  const allplayers = useSelector(state => state.allPlayersReducer);
  const currentPlayers = useMemo(() => allplayers?.find(el => el.id === id), [allplayers])
  
  // const truePlayers = useMemo(() => currentPlayers?.filter(player => player.Users[0]?.Players && player.Users[0]?.Players.flag == true), [currentPlayers])
  // console.log(allplayers);
  // const amountOfPlayers = truePlayers.length + 1;
  
  useEffect(() => {
    dispatch(getAllPlayersFromServer())
  }, [])


function formatDate(date) {
  const day = date.slice(8,10);
  const month = date.slice(5,7);
  const year = date.slice(0,4);
  const time = date.slice(11);
  return `${day}/${month}/${year} ${time}`;
}


  return(
    <>
    {owner ?
    <div className="carda carda3" onClick={()=>linkHandler(`/meeting/${id}`)} >
      <div className="boxForImg">
      <img className="img" src={`http://localhost:3001${owner.photo}`} alt="" />
      </div>
      <div className="txt">
          <p>
           <span className="span">Создатель:</span>  {owner.userName}
          </p>
          <p>
           <span className="span">Название игры:</span>  {title}
          </p>
          <p>
          <span className="span">Место проведения:</span> {place}
          </p>
          <p>
          <span className="span">Дата:</span> {formatDate(date)}
          </p>

      </div>
    </div>
    : <div>LOADING</div>}
    </>
  )
}
export default Cardy;
