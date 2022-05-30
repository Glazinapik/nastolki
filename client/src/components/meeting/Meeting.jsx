import { useEffect, useMemo, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneMeeting } from "../../redux/actions/oneMeetingAction";
import { createNewPlayer } from "../../redux/actions/playersAction";


function Meeting() { 
    const {id} = useParams();
    console.log(id, '<-----------')
    
    const dispatch = useDispatch();

    const meeting = useSelector(state => state.meeting);
    const user = useSelector(state => state.user);
    const players = useSelector(state => state.players);
    const truePlayers = players.filter(player => player.flag === true);
    

    useEffect(() => {
      dispatch(getOneMeeting(id))
    },[])
  

    const addPlayer = () => {

    }

    const takePartHandler = () => {
      dispatch(createNewPlayer(meeting.id))
    }

  
    return (
        <>
        {user.id == meeting.owner_id ?
        (meeting ?
         <Card className="favoriteCard">
                  <Card.Body>
                    <Card.Title>{meeting.title}</Card.Title>
                    <Card.Text>{meeting.place}</Card.Text>
                    <Card.Text>{meeting.date}</Card.Text>
                    <Card.Text>{meeting.amount}</Card.Text>
                    <Card.Text>Хотят участвовать : {players ? players.map(player => <div><p>{player.userName}</p><Button onClick={addPlayer} >Подтвердить участие</Button></div>) : <div>Никто пока не хочет учавствоать 😟</div>}</Card.Text>
                    <Card.Text>Участники : {truePlayers.length ? truePlayers.map(truePlayer => <div><p>{truePlayer.userName}</p></div>) : <div>Никто пока не хочет учавствоать 😟</div>}</Card.Text>
                  </Card.Body>
                </Card>
                : <div>LOADING...</div>) :
                (meeting ?
                    <Card className="favoriteCard">
                             <Card.Body>
                               <Card.Title>{meeting.title}</Card.Title>
                               <Card.Text>{meeting.place}</Card.Text>
                               <Card.Text>{meeting.date}</Card.Text>
                               <Card.Text>{meeting.amount}</Card.Text>
                               <Button onClick={takePartHandler}>Хочу учавствовать !</Button>
                             </Card.Body>
                           </Card>
                           : <div>LOADING...</div>)}
      </>
    );
    }
  
  
  export default Meeting;