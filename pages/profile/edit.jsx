import { useState } from "react";

import Layout from "../../components/Layout";
import { SmallButton } from "../../components/CustomButton";
import { CustomInput, CustomInputComboBox } from "../../components/CustomInput";

export default function EditProfile() {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  return (
    <Layout>
      <div className="w-screen h-screen pt-10">
        <div className="grid grid-cols-1 gap-5 justify-items-center">
          <div className="font-bold text-2xl">
            <h1>Edit Profile</h1>
            <hr className="border-black w-72 dark:border-white" />
          </div>
          <div className="grid grid-cols-1 gap-5">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="grid grid-cols-1 justify-items-center gap-2">
                <CustomInput id="inputFile" type="file" />
                <CustomInput
                  id="inputFullName"
                  type="text"
                  placeholder="Full name"
                  // onChange={(e) => setFullName(e.target.value)}
                />
                <CustomInputComboBox
                  id="inputCity"
                  title="City"
                  op1="Jakarta"
                  op2="Malang"
                  op3="Semarang"
                  // onChange={(e) => setCity(e.target.value)}
                />
                <CustomInput
                  id="inputFullAddress"
                  type="text"
                  placeholder="Full address"
                  // onChange={(e) => setFullAddress(e.target.value)}
                />
                <CustomInput
                  id="inputUsername"
                  type="text"
                  placeholder="Username"
                  // onChange={(e) => setUsername(e.target.value)}
                />
                <CustomInput
                  id="inputEmail"
                  type="email"
                  placeholder="Email"
                  // onChange={(e) => setEmail(e.target.value)}
                />
                <CustomInput
                  id="inputPhoneNumber"
                  type="number"
                  placeholder="Phone number"
                  // onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="pt-20 space-x-2 flex flex-cols-2 justify-center">
                <SmallButton label="Done" loading={loading || disabled} />
                <SmallButton
                  href="/profile"
                  label="cancel"
                  className="bg-accent text-black"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
