import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMeetingsFromServer } from "../../redux/actions/meetingAction";
import { Card } from 'react-bootstrap';

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
    })

    return (
        <>
      <p className="text-center">Meetings</p>
      <div id="mymap"></div>
      <div>{meetings ?
      meetings.map(meeting => 
        <Card className="favoriteCard" key={meeting.id}>
                  <Card.Body>
                    <Card.Title>{meeting.title}</Card.Title>
                    <Card.Text>{meeting.place}</Card.Text>
                    <Card.Text>{meeting.date}</Card.Text>
                    <Card.Text>{meeting.amount}</Card.Text>
                  </Card.Body>
                </Card>)
                :
                <div className="textnull">You have not favorites activities 😟</div>
      }
      </div>
      </>
    );
    }
  
  
  export default Meetings;