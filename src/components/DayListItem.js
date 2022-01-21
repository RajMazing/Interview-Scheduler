import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  
const {  name, spots, selected, setDay } = props;
  const dayClass = classNames("day-list__item", { "day-list__item--selected": props.selected, "day-list__item--full": props.spots === 0});
  console.log(dayClass);

  const formatSpots = (spots) => {
    if (spots === 0) {
      return "no spots remaining";
    } else if (spots === 1) {
      return `${spots} spot remaining`;
    } else {
      return `${spots} spots remaining`;
    }
  };

  return (
    <li onClick={() => setDay(name)} className={dayClass} selected={selected}>
      <h2 className="text--regular">{name}</h2> 
      {formatSpots(spots)}
    </li>
  );
}