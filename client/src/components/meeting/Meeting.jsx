import { useEffect, useMemo, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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

  const amountOfPlayers = truePlayers.length + 1


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


// function Meeting() { 
//     const {id} = useParams();
//     console.log(id)
//     const [showModal, setShowModal] = useState(false);
//     // const [showButton, setShowButton] = useState(true);
    
//     const dispatch = useDispatch();
//     const meeting = useSelector(state => state.meeting);

//     useEffect(() => {
//       dispatch(getOneMeeting(id))
//       dispatch(getPlayersFromServer(id))
//     }, [])

   
//     const user = useSelector(state => state.user);
//     const players = useSelector(state => state.players);
//     console.log(meeting)
//     console.log(players, 11111)

//     const truePlayers = players?.filter(player => player.Players && player.Players.flag == true)

//     const falsePlayers = players?.filter(player => player.Players && player.Players.flag == false)

//     // console.log(players,'players!!!!!!!!!!!')

//     const isPlayer = players?.filter(player => player.Players && player.id == user.id)
//     // console.log(isPlayer,'isplayers')
    
  
//     const addPlayer = (playerId) => {
//       dispatch(confirmPlayerFlag(playerId, id))
//     }

//     const takePartHandler = () => {
//       setShowModal(true);
//       dispatch(createNewPlayer(id));
      
//     }

//     const deletePlayerHandler = (playerId) => {
//       dispatch(deleteOnePlayer(playerId, id))
//     }
//     if(!meeting){
//       return <div>LOADING</div>
//     } else {
  

    return (
      <>

        {user.id === meeting.owner_id ?
        <div className="gamesPage hhh">

          <div className="carda carda2" >
            <div className="txt"  >
              <p>
                <span className="span2">Название игры: <span className="span3">{meeting.title}</span></span>
              </p>
              <p>
                <span className="span2">Адрес :<span className="span3">{meeting.place}</span></span>
              </p>
              <p>
                <span className="span2">Дата проведения :<span className="span3">{formatDate(meeting.date)}</span></span>
              </p>
              <p>
                <span className="span2">Количество участников :<span className="span3">{amountOfPlayers}/{meeting.amount}</span></span>
              </p>
                <span className="span2">Хотят участвовать : <span className="span3">{falsePlayers.length ? falsePlayers.map(player => <div><p>{player.userName}</p><button className="btn btn-primary button butt" onClick={() => addPlayer(player.id)} >Подтвердить участие</button><button className="btn btn-primary button butt" onClick={() => deletePlayerHandler(player.id)}>Отклонить</button></div>) : <div>Нет заявок на участие</div>}</span></span>
                <span className="span2">Участники :<span className="span3"><div>{meeting?.owner?.userName}(это Вы)</div> {truePlayers.map(player => <div><p>{player.userName}</p></div>)}</span></span> 
              </div>
          </div>
          <div className="fake">
              <img className="lastPhoto" src="/img/pic.png" alt="" />
          </div>
        </div>
          
          :
          <Card className="favoriteCard">
            <div className="txt">
              <Card.Title>Название игры : {meeting.title}</Card.Title>
              <Card.Text>Адрес : {meeting.place}</Card.Text>
              <Card.Text>Дата проведения : {formatDate(meeting.date)}</Card.Text>
              <Card.Text>Количество участников : {amountOfPlayers}/{meeting.amount}</Card.Text>
              <Card.Text>Участники : <div>{meeting?.owner?.userName}(создатель встречи)</div>{truePlayers.map(player => <div><p>{player.userName}</p></div>)}</Card.Text>
              {!isPlayer.length && <button className="btn btn-primary button butt" onClick={takePartHandler}>Хочу учавствовать !</button>}
            </div>
          </Card>}
          

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


