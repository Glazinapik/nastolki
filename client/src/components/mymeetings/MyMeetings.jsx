import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMeetingsFromServer } from "../../redux/actions/meetingsAction";
import { getUserMeetings } from "../../redux/actions/userMeetingsAction";

function MyMeetings() {

  const {id} = useParams();
    
  const dispatch = useDispatch();


    useEffect(() => {
      dispatch(getMeetingsFromServer())
      dispatch(getUserMeetings(id))
    }, [])

  const navigate = useNavigate();

  const linkHandler = (link) => {
    navigate(link)
  }

  const meetings = useSelector(state => state.meetings);
  const user = useSelector(state => state.user);
  const usermeetings = useSelector(state => state.usermeetings);
  
  const myMeetings = meetings.filter(meeting => meeting.owner_id == user.id)
 

  // const userMeetingsTrue = 
  // const userMeetingsFalse = 

  return (
    <>
      <div>Мои встречи:</div>
      {myMeetings.length ?
        myMeetings.map(meeting =>
            <div className="carda" onClick={() => linkHandler(`/meeting/${meeting.id}`)}>
              <div className="txt">
                <p>
                  <span className="span">Название игры:</span>  {meeting.title}
                </p>
                <p>
                  <span className="span">Место проведения:</span> {meeting.place}
                </p>
                <p>
                  <span className="span">Дата:</span> {meeting.date}
                </p>
              </div>
            </div>)
        : <div>Пока нет встреч 😟</div>}

      <div>Встречи, которые вы бы хотели посетить:</div>
      {usermeetings.length ? 
      usermeetings.map(meeting => 
      (meeting.Players.flag === true) ? 
      (<div style={{backgroundColor: 'green'}} onClick={() => linkHandler(`/meeting/${meeting.id}`)}>{meeting.title} - заявка на участие одобрена</div>) : 
      (meeting.Players.flag === false) ? 
      (<div style={{backgroundColor: 'grey'}} onClick={() => linkHandler(`/meeting/${meeting.id}`)}>{meeting.title} - заявка на участие ожидает подтверждения</div>) : 
      (<div style={{backgroundColor: 'red'}} onClick={() => linkHandler(`/meeting/${meeting.id}`)}>{meeting.title} - заявка на участие отклонена</div>)) : 
      <div>Пока нет встреч 😟</div>}
    </>
  );
}


export default MyMeetings;