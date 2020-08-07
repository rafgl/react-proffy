import React from "react";

import "./style.css";
import whatsappIcon from "../../assets/images/icons/whatsapp.svg";
import api from "../../services/api";

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  course: string;
  whatsapp: number;
}

interface TeacherItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FunctionComponent<TeacherItemProps> = ({
  teacher,
}) => {
  const createNewConnection = () => {
    api.post("connections", {
      user_id: teacher.id,
    });
  };

  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt="Teacher profile avatar" />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.course}</span>
        </div>
      </header>
      <p>{teacher.bio}</p>
      <footer>
        <p>
          Price/hour
          <strong>${teacher.cost}</strong>
        </p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={createNewConnection}
          href={`https://wa.me/${teacher.whatsapp}?text=Hello%20There`}
        >
          <img src={whatsappIcon} alt="Whatsapp" />
          Get in touch
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
