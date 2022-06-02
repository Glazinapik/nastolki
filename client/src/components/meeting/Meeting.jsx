import { useEffect, useMemo, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneMeeting } from "../../redux/actions/oneMeetingAction";
import { confirmPlayerFlag, createNewPlayer, deleteOnePlayer, getPlayersFromServer } from "../../redux/actions/playersAction";


function Meeting() { 
    const {id} = useParams();
    console.log(id)
    const [showModal, setShowModal] = useState(false);
    // const [showButton, setShowButton] = useState(true);
    
    const dispatch = useDispatch();
    const meeting = useSelector(state => state.meeting);

    useEffect(() => {
      dispatch(getOneMeeting(id))
      dispatch(getPlayersFromServer(id))
    }, [])

   
    const user = useSelector(state => state.user);
    const players = useSelector(state => state.players);
    console.log(meeting)
    console.log(players, 11111)

    const truePlayers = players?.filter(player => player.Players && player.Players.flag == true)

    const falsePlayers = players?.filter(player => player.Players && player.Players.flag == false)

    // console.log(players,'players!!!!!!!!!!!')

    const isPlayer = players?.filter(player => player.Players && player.id == user.id)
    // console.log(isPlayer,'isplayers')
    
  
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
    if(!meeting){
      return <div>LOADING</div>
    } else {
  
    return (
        <>

        {user.id === meeting.owner_id ?
        (meeting ?

         <Card className="favoriteCard">
                  <Card.Body>
                    <Card.Title>Название игры: {meeting.title}</Card.Title>
                    <Card.Text>Адрес :{meeting.place}</Card.Text>
                    <Card.Text>Дата проведения :{meeting.date}</Card.Text>
                    <Card.Text>Количество участников :{meeting.amount}</Card.Text>
                    <Card.Text>Хотят участвовать : {falsePlayers.length ? falsePlayers.map(player => <div><p>{player.userName}</p><Button onClick={() => addPlayer(player.id)} >Подтвердить участие</Button><Button onClick={() => deletePlayerHandler(player.id)}>Отклонить</Button></div>) : <div>Нет заявок на участие</div>}</Card.Text>
                    <Card.Text>Участники : {truePlayers.length ? truePlayers.map(player => <div><p>{player.userName}</p></div>) : <div>Нет участников</div>}</Card.Text>
                  </Card.Body>
                </Card>
                : <div>LOADING...</div>) :
                (meeting ?
                    <Card className="favoriteCard">
                             <Card.Body>
                               <Card.Title>Название игры : {meeting.title}</Card.Title>
                               <Card.Text>Адрес : {meeting.place}</Card.Text>
                               <Card.Text>Дата проведения : {meeting.date}</Card.Text>
                               <Card.Text>Количество участников : {meeting.amount}</Card.Text>
                               <Card.Text>Участники : {truePlayers.length ? truePlayers.map(player => <div><p>{player.userName}</p></div>) : <div>Нет участников</div>}</Card.Text>
                               {!isPlayer.length && <Button onClick={takePartHandler}>Хочу учавствовать !</Button>}
                             </Card.Body>
                           </Card>
                           : <div>LOADING...</div>)}

<Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <p style={{color: "black"}}>
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

             
