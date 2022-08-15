import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "../../components/Layout";
import { CustomInput } from "../../components/CustomInput";
import { SmallButton } from "../../components/CustomButton";

export default function AddMeeting() {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (date && time) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [date, time]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const body = {
      date,
      time,
    };
    var requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    fetch("https://golangprojectku.site/meetings", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { message } = result;
        if (result.code === 200) {
          router.push("/meetings");
        }
        alert(message);
      })
      .catch((error) => {
        alert(error.toString());
      })
      .finally(() => setLoading(false));
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
                  onChange={(e) => setDate(e.target.value)}
                />
                <CustomInput
                  id="inputTime"
                  type="time"
                  placeholder="Time"
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <div className="pt-20 space-x-2 flex flex-cols-2 justify-center">
                <SmallButton
                  label="Add"
                  loading={loading || disabled}
                  type="submit"
                  className="bg-primary text-white font-bold"
                />
                <SmallButton
                  href="/adoptions"
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
