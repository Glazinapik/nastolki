import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllPlayersFromServer } from "../../redux/actions/allPlayersAction";


function Cardy({ title, place, date, id, owner }) {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const linkHandler = (link) => {
    navigate(link)
  }

  const allplayers = useSelector(state => state.allPlayersReducer);
  useMemo(() => allplayers?.find(el => el.id === id), [allplayers])

  useEffect(() => {
    dispatch(getAllPlayersFromServer())
  }, [])


  function formatDate(date) {
    const day = date.slice(8, 10);
    const month = date.slice(5, 7);
    const year = date.slice(0, 4);
    const time = date.slice(11);
    return `${day}/${month}/${year} ${time}`;
  }


  return (
    <>
      {owner ?
        <div className="carda" onClick={() => linkHandler(`/meeting/${id}`)} >
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
