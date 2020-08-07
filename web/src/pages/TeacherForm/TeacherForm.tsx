import React, { useState, FormEvent } from "react";
import PageHeader from "../../components/PageHeader";

import "./style.css";
import warningIcon from "../../assets/images/icons/warning.svg";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import Select from "../../components/Select";
import api from "../../services/api";
import { useHistory } from "react-router-dom";

export default function TeacherForm() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");
  const [course, setCourse] = useState("");
  const [cost, setCost] = useState("");
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: "", to: "" },
  ]);

  const addNewScheduleItem = () => {
    setScheduleItems([...scheduleItems, { week_day: 0, from: "", to: "" }]);
  };

  const setScheduleItemValue = (
    position: number,
    field: string,
    value: string
  ) => {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  };

  const handleCreateClass = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await api.post("classes", {
        name,
        avatar,
        whatsapp,
        bio,
        course,
        cost: Number(cost),
        schedule: scheduleItems,
      });

      alert("Success!");
      history.push("/");
    } catch (err) {
      alert("Error");
      console.error(err);
    }
  };

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="How amazing you want to teach."
        description="The first step is to fill out this application form."
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Your data</legend>
            <Input
              name="name"
              label="Full name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />

            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(event) => setAvatar(event.target.value)}
            />

            <Input
              name="whatsapp"
              label="Whatsapp"
              value={whatsapp}
              onChange={(event) => setWhatsapp(event.target.value)}
            />

            <TextArea
              name="bio"
              label="Bio"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>About class</legend>
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
            <Input
              name="cost"
              label="Cost per hour"
              type="number"
              value={cost}
              onChange={(event) => setCost(event.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>
              Avaiable times
              <button type="button" onClick={addNewScheduleItem}>
                + New time
              </button>
            </legend>
            {scheduleItems.map((scheduleItem, index) => (
              <div className="schedule-item" key={scheduleItem.week_day}>
                <Select
                  name="week_day"
                  label="Week day"
                  value={scheduleItem.week_day}
                  onChange={(event) =>
                    setScheduleItemValue(index, "week_day", event.target.value)
                  }
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
                  name="from"
                  label="From"
                  type="time"
                  value={scheduleItem.from}
                  onChange={(event) =>
                    setScheduleItemValue(index, "from", event.target.value)
                  }
                />
                <Input
                  name="to"
                  label="To"
                  type="time"
                  value={scheduleItem.to}
                  onChange={(event) =>
                    setScheduleItemValue(index, "to", event.target.value)
                  }
                />
              </div>
            ))}
          </fieldset>
          <footer>
            <p>
              <img src={warningIcon} alt="Important warning" />
              Warning! <br />
              Fill in all fields
            </p>
            <button>Apply</button>
          </footer>
        </form>
      </main>
    </div>
  );
}
