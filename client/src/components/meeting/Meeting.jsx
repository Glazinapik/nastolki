import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOneMeeting } from "../../redux/actions/oneMeetingAction";
import { confirmPlayerFlag, createNewPlayer, deleteOnePlayer, getPlayersFromServer } from "../../redux/actions/playersAction";



function Meeting() {
  
  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const meeting = useSelector(state => state.meeting);

  const user = useSelector(state => state.user);

  const players = useSelector(state => state.players);

  const truePlayers = players?.filter(player => player.Players && player.Players.flag == true)

  const falsePlayers = players?.filter(player => player.Players && player.Players.flag == false)

  const isPlayer = players?.filter(player => player.Players && player.id == user.id);

  const amountOfPlayers = truePlayers.length + 1;

  const navigate = useNavigate();

  const linkHandler = (link) => {
    navigate(link)
  }

  useEffect(() => {
    dispatch(getOneMeeting(id))
  }, [])

  useEffect(() => {
    dispatch(getPlayersFromServer(id))
  }, [falsePlayers])

  const addPlayer = (playerId) => {
    dispatch(confirmPlayerFlag(playerId, id))
  }

  const takePartHandler = () => {
    setShowModal(true);
    dispatch(createNewPlayer(id));
  }

  const deletePlayerHandler = (playerId) => {
    dispatch(deleteOnePlayer(playerId, id))
  }

  function formatDate(date) {
    const day = date?.slice(8, 10);
    const month = date?.slice(5, 7);
    const year = date?.slice(0, 4);
    const time = date?.slice(11);
    return `${day}/${month}/${year} ${time}`;
  }


  if (!meeting) {
    return <div>LOADING</div>
  } else {
    return (
      <>
        {user.id === meeting.owner_id ?
          <div className="gamesPage one-game">
            <div className="carda carda-game" >
              <div className="txt"  >
                <p>
                  <span className="span-title">Название игры: <span className="span-item">{meeting.title}</span></span>
                </p>
                <p>
                  <span className="span-title">Адрес :<span className="span-item">{meeting.place}</span></span>
                </p>
                <p>
                  <span className="span-title">Дата проведения :<span className="span-item">{formatDate(meeting.date)}</span></span>
                </p>
                <p>
                  <span className="span-title">Количество участников :<span className="span-item">{amountOfPlayers}/{meeting.amount}</span></span>
                </p>
                <span className="span-title">Хотят участвовать : <span className="span-item">{falsePlayers.length ? falsePlayers.map(player => <div className="player"><p onClick={() => linkHandler(`/user/${player.id}`)}><div className="div-player"><div className="div-player-items"><img className="player-photo" src={`http://localhost:3001${player.photo}`} alt="" /></div><div className="player-name">{player.userName}</div></div></p><button className="btn btn-primary button butt" onClick={() => addPlayer(player.id)} >Подтвердить участие</button><button className="btn btn-primary button butt" onClick={() => deletePlayerHandler(player.id)}>Отклонить</button></div>) : <div>Нет заявок на участие</div>}</span></span>
                <span className="span-title">Участники :<span className="span-item"><div className="player" onClick={() => linkHandler(`/user/${meeting.owner_id}`)}><div className="div-player"><div className="div-player-items"><img className="player-photo" src={`http://localhost:3001${meeting?.owner?.photo}`} alt="" /></div><div className="player-name">{meeting?.owner?.userName}(это Вы)</div></div></div> {truePlayers.map(player => <div className="player"><p onClick={() => linkHandler(`/user/${player.id}`)}><div className="div-player"><div className="div-player-items"><img className="player-photo" src={`http://localhost:3001${player.photo}`} alt="" /></div><div className="player-name">{player.userName}</div></div></p></div>)}</span></span>
              </div>
            </div>
            <div className="fake">
              <img className="lastPhoto" src="/img/pic.png" alt="" />
            </div>
          </div>
          :
          <div className="gamesPage one-game">
            <div className="carda carda-game" >
              <div className="txt">
                <p>
                  <span className="span-title">Название игры: <span className="span-item">{meeting.title}</span></span>
                </p>
                <p>
                  <span className="span-title">Адрес :<span className="span-item">{meeting.place}</span></span>
                </p>
                <p>
                  <span className="span-title">Дата проведения :<span className="span-item">{formatDate(meeting.date)}</span></span>
                </p>
                <p>
                  <span className="span-title">Количество участников :<span className="span-item">{amountOfPlayers}/{meeting.amount}</span></span>
                </p>
                <span className="span-title">Участники :<span className="span-item"><div className="player" onClick={() => linkHandler(`/user/${meeting.owner_id}`)}><div className="div-player"><div className="div-player-items"><img className="player-photo" src={`http://localhost:3001${meeting?.owner?.photo}`} alt="" /></div><div className="player-name">{meeting?.owner?.userName}(создатель встречи)</div></div></div>{truePlayers.map(player => <div className="player"><p onClick={() => linkHandler(`/user/${player.id}`)}><div className="div-player"><div className="div-player-items"><img className="player-photo" src={`http://localhost:3001${player.photo}`} alt="" /></div><div className="player-name">{player.userName}</div></div></p></div>)}</span></span>
                {!isPlayer.length && <button className="btn btn-primary button butt butt-add-player" onClick={takePartHandler}>Хочу учавствовать !</button>}
              </div>
            </div>
            <div className="fake">
              <img className="lastPhoto" src="/img/pic.png" alt="" />
            </div>
          </div>}


        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <p style={{ color: "black" }}>
              Вы отправили заявку на участие в данной встрече!
              Статус заявки можно отслеживать во вкладке "Мои встречи" !
            </p>
          </Modal.Body>
        </Modal>
      </>

    );
  }
}


export default Meeting;


