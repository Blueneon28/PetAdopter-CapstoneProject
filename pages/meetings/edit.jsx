import { useState } from "react";

import Layout from "../../components/Layout";
import { CustomInput } from "../../components/CustomInput";
import { SmallButton } from "../../components/CustomButton";

export default function EditMeeting() {
  const [dataMeeting, setDataMeeting] = useState({});
  const [loading, setLoading] = useState(false);
  const [objSubmit, setObjSubmit] = useState({});

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const raw = new JSON.stringify();
    for (const key in objSubmit) {
      raw.append(key, objSubmit[key]);
    }
    var requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: raw,
    };

    fetch("https://golangprojectku.site/meetings", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { message } = result;
        alert(message);
        setObjSubmit({});
      })
      .catch((error) => alert(error.toString()))
      .finally(() => setLoading(false));
  };

  const handleChange = (value, key) => {
    let temp = { ...objSubmit };
    temp[key] = value;
    setObjSubmit(temp);
  };
  return (
    <Layout>
      <div className="pt-10">
        <div className="grid grid-cols-1 gap-5 justify-items-center">
          <div className="font-bold text-xl md:text-2xl pr-24 md:pr-40 border-b-2 border-black dark:border-white">
            <h1>Meeting Invitation</h1>
          </div>
          <div className="grid grid-cols-1 gap-5 md:w-96">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="grid grid-cols-1 justify-items-center gap-2">
                <CustomInput
                  id="inputDate"
                  type="date"
                  placeholder="Date"
                  value={dataMeeting.date}
                  onChange={(e) => handleChange(e.target.value, "date")}
                />
                <CustomInput
                  id="inputTime"
                  type="time"
                  placeholder="Time"
                  value={dataMeeting.time}
                  onChange={(e) => handleChange(e.target.value, "time")}
                />
              </div>
              <div className="pt-20 space-x-2 flex flex-cols-2 justify-center">
                <SmallButton
                  label="Update"
                  loading={loading}
                  className="text-white bg-primary font-bold"
                />
                <SmallButton
                  href="/meetings"
                  label="cancel"
                  className="bg-accent"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
