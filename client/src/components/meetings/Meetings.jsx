import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMeetingsFromServer } from "../../redux/actions/meetingsAction";
import { useNavigate } from "react-router-dom";
import Cardy from "../Cardy/Cardy";
const ymaps = window.ymaps


function init(meetings, linkHandler) {
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

function Meetings() {

  const dispatch = useDispatch();

  const meetings = useSelector(state => state.meetings);

  const navigate = useNavigate();

  const linkHandler = (link) => {
    navigate(link)
  }
 const sortedMeetengs = meetings.sort((a, b) => new Date(a.date)-new Date(b.date))
 console.log(sortedMeetengs, '==========');

  const [searchInput, setSearchInput] = useState('')
  const [searchByGame, setSearchByGame] = useState('')

  const searchBySortedMeetings = useMemo(() => {
    if(searchInput && !searchByGame)return sortedMeetengs.filter(meeting => meeting.place.includes(searchInput))
    if(searchByGame && !searchInput)return sortedMeetengs.filter(meeting => meeting.title.includes(searchByGame))
    if(searchByGame && searchInput)return sortedMeetengs.filter(meeting => (meeting.title.includes(searchByGame)&& meeting.place.includes(searchInput)))
    return meetings
  }, [searchInput, sortedMeetengs, searchByGame, meetings])


  useEffect(() => {
    dispatch(getMeetingsFromServer())
    if (meetings.length){ 
      ymaps.ready(() => init(meetings, linkHandler))
    }
  }, [])
  
  
  return (
    <>
      <div className="meetings">
        {meetings.length ? <div id="mymap"></div> : <div>LOADING</div>}
        <div className="title2" ><h1 >ближайшие события</h1><div className="meet">
        {sortedMeetengs.length ?
            searchBySortedMeetings.map(meeting => <Cardy key={meeting.id} {...meeting}></Cardy>)
            :
            <div className="textnull">В ближайшее время нет новых встреч 😟</div>   
          }
          </div>
          <div className="sss">
          <input value={searchInput} onChange={e => setSearchInput(e.target.value)} className="form-control line2" type="text" placeholder="Поиск по городу" />
          <input value={searchByGame} onChange={e => setSearchByGame(e.target.value)} className="form-control line2" type="text" placeholder="Поиск по игре"/>
          </div>
        </div>
       
      </div>

    </>
  );
}


export default Meetings;
