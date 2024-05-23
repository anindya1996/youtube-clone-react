import React from "react";
import Button from "../Button";

const list = [
  "All",
  "News",
  "Movies",
  "Series",
  "Java",
  "Drama",
  "Vlogs",
  "JavaScript",
  "Live",
  "Podcasts",
  "React",
  "Tourism",
];

const ButtonLists = () => {
  return (
    <div className="flex mx-4">
      {list.map((itemName, index) => (
        <Button key={index} name={itemName} />
      ))}
    </div>
  );
};

export default ButtonLists;
