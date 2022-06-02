import { useNavigate } from "react-router-dom";

function Cardy ({title, place, date, amount, id, owner}) {

  const navigate = useNavigate();

  const linkHandler = (link) =>{
  navigate(link)
}


  return(
    <>
    {owner ?
    <div className="carda" onClick={()=>linkHandler(`/meeting/${id}`)}>
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
          <span className="span">Дата:</span> {date}
          </p>
          <p>
          <span className="span">Количество участников:</span>{amount}
          </p>
      </div>
    </div>
    : <div>LOADING</div>}
    </>
  )
}
export default Cardy
