import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMeetingsFromServer } from "../../redux/actions/meetingAction";
import { addMeeting } from "../../redux/actions/meetingAction";
import Cardy from "../Cardy/Cardy";
function Meetings() {
    
    ymaps.ready(init);
    function init(){
        const myMap = new ymaps.Map("mymap", {
            center: [55.76, 37.64],
            zoom: 7,
            controls: ['zoomControl']
        });

        const placemark = new ymaps.Placemark([55.76, 37.64], {
      
        });

        myMap.geoObjects.add(placemark);
    }

    const dispatch = useDispatch();
    

    const meetings = useSelector(state => state.meeting);

    useEffect(() => {
      dispatch(getMeetingsFromServer())
    }, [])

    return (
        <>
        <div className="meetings">
        <div id="mymap"></div>
      <div className="meet"><h1>ближайшие события</h1>

      {meetings ?
      meetings.map(meeting => <Cardy key={meeting.date} ></Cardy>) 
        // <Card className="favoriteCard" key={meeting.id}>
        //   <div></div>
        //           <Card.Body>
        //             <Card.Title>{meeting.title}</Card.Title>
        //             <Card.Text>{meeting.place}</Card.Text>
        //             <Card.Text>{meeting.date}</Card.Text>
        //             <Card.Text>{meeting.amount}</Card.Text>
        //           </Card.Body>
        //         </Card>)
                :
                <div className="textnull">You have not favorites activities 😟</div>
      }
      </div>
        </div>
      </>
    );
    }
  
  
  export default Meetings;
