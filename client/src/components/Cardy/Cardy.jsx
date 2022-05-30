import { useNavigate } from "react-router-dom";

function Cardy ({title, place, date, amount, id}) {

  const navigate = useNavigate();

  const linkHandler = (link) =>{
  navigate(link)
}


  return(
    <>
    <div className="carda" onClick={()=>linkHandler(`/meeting/${id}`)}>
      <img className="img" src="https://avatars.mds.yandex.net/get-pdb/1996600/d1725ec1-41d3-4b2c-ab24-91ec603557bf/s375" alt="" />
      <div className="txt">
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
    </>
  )
}
export default Cardy
