import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMeetingsFromServer } from "../../redux/actions/meetingsAction";
import { getUserMeetings } from "../../redux/actions/userMeetingsAction";

function MyMeetings() {

  const { id } = useParams();

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

  function formatDate(date) {
    const day = date?.slice(8, 10);
    const month = date?.slice(5, 7);
    const year = date?.slice(0, 4);
    const time = date?.slice(11);
    return `${day}/${month}/${year} ${time}`;
  }

  return (
    <>
      <div className="myMeetings">
        <div className="half"><h1>Ваши встречи:</h1>
          {myMeetings.length ?
            myMeetings.map(meeting =>
              <div className="carda my" onClick={() => linkHandler(`/meeting/${meeting.id}`)}>
                <div className="txt">
                  <p className="p">
                    <span className="span">Название игры:</span>  {meeting.title}
                  </p>
                  <p>
                    <span className="span">Место проведения:</span> {meeting.place}
                  </p>
                  <p>
                    <span className="span">Дата:</span> {formatDate(meeting.date)}
                  </p>
                </div>
              </div>)
            : <div>Пока нет встреч 😟</div>}
        </div>
        <div className="half"><h1>Встречи, на которые вы хотите пойти:</h1>
          {usermeetings.length ?
            usermeetings.map(meeting =>
              (meeting.Players.flag === true) ?
                (<div style={{ backgroundColor: 'green' }} className="carda my" onClick={() => linkHandler(`/meeting/${meeting.id}`)}>
                  <div className="txt">
                    <p className="p">
                      <span className="span">Название игры:</span>  {meeting.title}
                    </p>
                    <p className="p">
                      <span className="span">Место проведения:</span> {meeting.place}
                    </p>
                    <p className="p">
                      <span className="span">Дата:</span> {formatDate(meeting.date)}
                    </p>
                    <p className="pg">Заявка на участие одобрена</p>
                  </div>
                </div>) :
                (meeting.Players.flag === false) ?
                  (<div className="carda my" onClick={() => linkHandler(`/meeting/${meeting.id}`)}>
                    <div className="txt">
                      <p className="p">
                        <span className="span">Название игры:</span>  {meeting.title}
                      </p>
                      <p className="p">
                        <span className="span">Место проведения:</span> {meeting.place}
                      </p>
                      <p className="p">
                        <span className="span">Дата:</span> {formatDate(meeting.date)}
                      </p>
                      <p className="ps">Заявка на участие ожидает подтверждения</p>
                    </div>
                  </div>) :
                  (<div className="carda my" onClick={() => linkHandler(`/meeting/${meeting.id}`)}>
                    <div className="txt">
                      <p className="p">
                        <span className="span">Название игры:</span>  {meeting.title}
                      </p>
                      <p className="p">
                        <span className="span">Место проведения:</span> {meeting.place}
                      </p>
                      <p className="p">
                        <span className="span">Дата:</span> {formatDate(meeting.date)}
                      </p>
                      <p className="pr">Заявка на участие отклонена</p>
                    </div>
                  </div>)) :
            <div>Пока нет встреч 😟</div>}
        </div>
      </div>
    </>
  );
}


export default MyMeetings;
