import { useState } from "react";

import Layout from "../../components/Layout";
import { CustomInput } from "../../components/CustomInput";
import { SmallButton } from "../../components/CustomButton";

export default function EditMeeting() {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  return (
    <Layout>
      <div className="w-screen h-screen pt-10">
        <div className="grid grid-cols-1 gap-5 justify-items-center">
          <div className="font-bold text-2xl">
            <h1>Meeting Invitation</h1>
            <hr className="border-black w-72 dark:border-white" />
          </div>
          <div className="grid grid-cols-1 gap-5">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="grid grid-cols-1 justify-items-center gap-2">
                <CustomInput
                  id="inputDate"
                  type="text"
                  placeholder="Date"
                  // onChange={(e) => setDate(e.target.value)}
                />
                <CustomInput
                  id="inputTime"
                  type="text"
                  placeholder="Time"
                  // onChange={(e) => setPhoneTime(e.target.value)}
                />
              </div>
              <div className="pt-20 space-x-2 flex flex-cols-2 justify-center">
                <SmallButton
                  label="Update"
                  loading={loading || disabled}
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
