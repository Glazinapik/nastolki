import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMeetingsFromServer } from "../../redux/actions/meetingsAction";
import { useNavigate } from "react-router-dom";
import Cardy from "../Cardy/Cardy";
import { Map, Placemark, YMaps } from "react-yandex-maps";



function Meetings() {

  const { REACT_APP_API_KEY: key } = process.env;
  
  const dispatch = useDispatch();

  const meetings = useSelector(state => state.meetings);

  const navigate = useNavigate();

  const linkHandler = (link) => {
    navigate(link)
  }

  useEffect(() => {
    dispatch(getMeetingsFromServer())
  }, [])

  meetings.sort((a, b) => new Date(a.date) - new Date(b.date))

  const [searchInput, setSearchInput] = useState('')
  const [searchByGame, setSearchByGame] = useState('')

  const searchBySortedMeetings = useMemo(() => {
    const sortedMeetengs = meetings.filter(meeting => new Date(meeting.date) > new Date()).sort((a, b) => new Date(a.date) - new Date(b.date))
    if (searchInput && !searchByGame) return sortedMeetengs.filter(meeting => meeting.place.toLowerCase().includes(searchInput.toLowerCase()))
    if (searchByGame && !searchInput) return sortedMeetengs.filter(meeting => meeting.title.toLowerCase().includes(searchByGame.toLowerCase()))
    if (searchByGame && searchInput) return sortedMeetengs.filter(meeting => (meeting.title.toLowerCase().includes(searchByGame.toLowerCase()) && meeting.place.toLowerCase().includes(searchInput.toLowerCase())))
    return meetings
  }, [searchInput, searchByGame, meetings])

  function formatDate(date) {
    const day = date?.slice(8, 10);
    const month = date?.slice(5, 7);
    const year = date?.slice(0, 4);
    const time = date?.slice(11);
    return `${day}/${month}/${year} ${time}`;
  }

  return (
    <>
      {meetings.length ? <div className="meetings">
        <YMaps query={{ ns: "use-load-option", apikey: key, load: "package.full" }}>
          <Map width='100%'
            height='80vh' defaultState={{ center: ['55.75', '37.57'], zoom: 9, controls: [] }} >
            {meetings?.map((meeting) => (
              <Placemark
                key={meeting.id}
                geometry={meeting.coords}
                properties={{
                  hintContent: `<div class="point">${meeting?.title}</div><div class="point">${formatDate(meeting?.date)}</div>`,
                }}
                options={{
                  iconLayout: 'default#image',
                  iconImageHref: '/img/metka.svg',
                  iconImageSize: [46, 57],
                  iconImageOffset: [-23, -57],
                }}
                onClick={() => linkHandler(`/meeting/${meeting.id}`)}
              />
            ))}
          </ Map>
        </YMaps>
        <div className="list-meetings" ><h1 >ближайшие события</h1><div className="meet">
          {searchBySortedMeetings.length ?
            searchBySortedMeetings.map(meeting => <Cardy key={meeting.id} {...meeting}></Cardy>)
            :
            <div className="textnull">В ближайшее время нет новых встреч 😟</div>
          }
        </div>
          <div className="search-form">
            <input value={searchInput} onChange={e => setSearchInput(e.target.value)} className="form-control search-input" type="text" placeholder="Поиск по адресу" />
            <input value={searchByGame} onChange={e => setSearchByGame(e.target.value)} className="form-control search-input" type="text" placeholder="Поиск по игре" />
          </div>
        </div>

      </div> : <div>LOADING</div>}
    </>
  );
}


export default Meetings;


