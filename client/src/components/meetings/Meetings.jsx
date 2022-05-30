import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMeetingsFromServer } from "../../redux/actions/meetingAction";
import { Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function Meetings() { 

    
    
    const dispatch = useDispatch();

    const meetings = useSelector(state => state.meeting);

    const navigate = useNavigate();

    const linkHandler = (link) =>{
    navigate(link)
 }
    useEffect(() => {
      dispatch(getMeetingsFromServer())
    },[])
    // const meetings =[
    //   {id: 1,
    //    title: 'Мафия',
    //    place: 'улица Кубанская, дом 23',
    //    date: '27/05/2022',
    //    amount: 10
    //   },
    //   {id: 2,
    //     title: 'UNO',
    //     place: 'улица красного маяка, дом 13, корпус 5',
    //     date: '27/05/2022',
    //     amount: 6
    //    },
    //    {id: 3,
    //     title: 'MONOPOLIA',
    //     place: 'улица Часовая, дом 8',
    //     date: '27/05/2022',
    //     amount: 5
    //    },
    //   ]

    ymaps.ready(init);
    function init(){
        const myMap = new ymaps.Map("mymap", {
            center: [55.76, 37.64],
            zoom: 8,
            controls: ['zoomControl']
        });

        meetings.forEach(meeting => 
        ymaps.geocode(meeting.place, {
          results: 1
      }).then(function (res) {
              const firstGeoObject = res.geoObjects.get(0),
              coords = firstGeoObject.geometry.getCoordinates();

              const myPlacemark = new ymaps.Placemark(coords, {
                hintContent: meeting.title,
                }, 
                {
                preset: 'islands#violetStretchyIcon'
                });
                myPlacemark.events.add('click', function (e) {
                  window.location = e.get('target').options.get(linkHandler(`/meeting/${meeting.id}`));
                });

                myMap.geoObjects.add(myPlacemark);
   
      }));
    }

    console.log(meetings)

    return (
        <>
      <p className="text-center">Meetings</p>
      {meetings.length ? <div id="mymap"></div> : <div>LOADING</div>}
      <div>{meetings.length && Array.isArray(meetings) ?
      meetings.map(meeting => 
        <Card className="favoriteCard" key={meeting.id}>
                  <Card.Body>
                    <Card.Title onClick={()=>linkHandler(`/meeting/${meeting.id}`)}>{meeting.title}</Card.Title>
                    <Card.Text>{meeting.place}</Card.Text>
                    <Card.Text>{meeting.date}</Card.Text>
                    <Card.Text>{meeting.amount}</Card.Text>
                  </Card.Body>
                </Card>)
                :
                <div className="textnull">В ближайшее время нет новых встреч 😟</div>
      }
      </div>
      </>
    );
    }
  
  
  export default Meetings;