import { useEffect, useMemo, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneMeeting } from "../../redux/actions/meetingAction";

function Meeting() { 
    const {id} = useParams();
    console.log(id, '<-----------')
    
    const dispatch = useDispatch();

    const meeting = useSelector(state => state.meeting);
    const user = useSelector(state => state.user);
    const players = useSelector(state => state.player);

 const oneMeeting = useMemo(() => {
if (meeting.length) {
  console.log(meeting)
  return meeting.find((el) => el.id == id)
}
 },[id, meeting]);
  

    const addPlayer = () => {

    }

    const takePartHandler = () => {

    }

  
    return (
        <>
        {user.id == oneMeeting.owner_id ?
        (oneMeeting ?
         <Card className="favoriteCard">
                  <Card.Body>
                    <Card.Title>{oneMeeting.title}</Card.Title>
                    <Card.Text>{oneMeeting.place}</Card.Text>
                    <Card.Text>{oneMeeting.date}</Card.Text>
                    <Card.Text>{oneMeeting.amount}</Card.Text>
                    <Card.Text>Хотят участвовать : {players ? players.map(player => <div><p>{player.userName}</p><Button onClick={addPlayer} >Подтвердить участие</Button></div>) : <div>Никто пока не хочет учавствоать 😟</div>}</Card.Text>
                    <Card.Text>Участники : {players ? players.map(player => <div><p>{player.userName}</p></div>) : <div>Никто пока не хочет учавствоать 😟</div>}</Card.Text>
                  </Card.Body>
                </Card>
                : <div>LOADING...</div>) :
                (oneMeeting ?
                    <Card className="favoriteCard">
                             <Card.Body>
                               <Card.Title>{oneMeeting.title}</Card.Title>
                               <Card.Text>{oneMeeting.place}</Card.Text>
                               <Card.Text>{oneMeeting.date}</Card.Text>
                               <Card.Text>{oneMeeting.amount}</Card.Text>
                               <Button onClick={takePartHandler}>Хочу учавствовать !</Button>
                             </Card.Body>
                           </Card>
                           : <div>LOADING...</div>)}
      </>
    );
    }
  
  
  export default Meeting;