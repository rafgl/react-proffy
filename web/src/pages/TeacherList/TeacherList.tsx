import React, { useState, FormEvent } from "react";

import "./style.css";
import PageHeader from "../../components/PageHeader";
import TeacherItem from "../../components/TeacherItem";
import Input from "../../components/Input";
import Select from "../../components/Select";
import api from "../../services/api";
import { Teacher } from "../../components/TeacherItem/TeacherItem";

export default function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [course, setCourse] = useState("");
  const [week_day, setWeekDay] = useState("");
  const [time, setTime] = useState("");
  console.log(teachers);
  const getTeachers = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.get("classes", {
        params: {
          course,
          week_day,
          time,
        },
      });
      if (response.data.length === 0) {
        alert("No matchs for your search!");
        return;
      }
      setTeachers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title={"These are the available proffys"}>
        <form id="search-teachers" onSubmit={getTeachers}>
          <Select
            name="course"
            label="Course"
            value={course}
            onChange={(event) => setCourse(event.target.value)}
            options={[
              { value: "English", label: "English" },
              { value: "Spanhish", label: "Spanhish" },
              { value: "Portuguese", label: "Portuguese" },
              { value: "Chinese", label: "Chinese" },
              { value: "Greek", label: "Greek" },
              { value: "Old Hebraic", label: "Old Hebraic" },
              { value: "Arts", label: "Arts" },
              { value: "Spanish", label: "Spanish" },
              { value: "German", label: "German" },
              { value: "French", label: "French" },
              { value: "Chemistry", label: "Chemistry" },
              { value: "Physics", label: "Physics" },
            ]}
          />
          <Select
            name="week_day"
            label="Week day"
            value={week_day}
            onChange={(event) => setWeekDay(event.target.value)}
            options={[
              { value: "0", label: "Sunday" },
              { value: "1", label: "Monday" },
              { value: "2", label: "Tuesday" },
              { value: "3", label: "Wednesday" },
              { value: "4", label: "Thursday" },
              { value: "5", label: "Friday" },
              { value: "6", label: "Saturday" },
            ]}
          />
          <Input
            type="time"
            name="time"
            label="Time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </PageHeader>
      <main>
        {(teachers.length === 0 && (
          <h2 style={{ textAlign: "center", marginTop: "15%" }}>
            Nothing here yet :(
            <br />
            Try a search!
          </h2>
        )) ||
          teachers.map((teacher: Teacher) => (
            <TeacherItem key={teacher.id} teacher={teacher} />
          ))}
      </main>
    </div>
  );
}
