import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { getCookie, deleteCookie } from "cookies-next";

import Layout from "../../components/Layout";
import TitlePage from "../../components/TitlePage";

export async function getServerSideProps({ req, res }) {
  const token = getCookie("token", { req, res });
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
    };
  }
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(
    `https://golangprojectku.site/species`,
    requestOptions
  );
  const data = await response.json();
  if (response.status === 200) {
    return {
      props: {
        code: data.code,
        data: data.data,
        message: data.message,
        token,
      },
    };
  } else {
    deleteCookie("token");
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
    };
  }
}

export default function OpenAdopt({ data, token }) {
  const router = useRouter();

  const [dataPet, setDataPet] = useState([]);
  const [objSubmit, setObjSubmit] = useState({});
  const fileInput = useRef(null);
  const categoryOptions = data.map((species) => {
    return { value: species.id, label: species.species };
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    for (const key in objSubmit) {
      formData.append(key, objSubmit[key]);
    }

    var requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    fetch("https://golangprojectku.site/pets", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { code, message } = result;
        if (code === 200) {
          router.push("/pets/mypets");
        }
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
  const handleUploadFile = (e) => {
    fileInput.current.click();
  };
  return (
    <Layout headTitle="Open Adopt" headDesc="Welcome to petdopter!">
      <div className="p-4 md:px-12 lg:px-24">
        <TitlePage page="Open Adopt" />
        <div className="p-4">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="flex flex-col lg:flex-row lg:justify-between">
              <div className="w-full">
                <div className="text-center">
                  <label className="label">
                    <span className="font-bold text-[#FFC700] dark:text-[#CDA000]">
                      Pet Photo <span className="text-error">*</span>
                    </span>
                  </label>
                  <div
                    className={` ${
                      dataPet.petphoto === undefined ? "hidden" : "block"
                    }`}
                  >
                    <Image
                      className={`w-full rounded`}
                      src={dataPet.petphoto}
                      alt={dataPet.petname}
                      width={1920}
                      height={1080}
                      layout={"responsive"}
                    />
                  </div>
                  <input
                    className="input input-bordered input-primary text-xs"
                    ref={fileInput}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      setDataPet({
                        ...dataPet,
                        petphoto: URL.createObjectURL(e.target.files[0]),
                      });
                      handleChange(e.target.files[0], "petphoto");
                    }}
                  />
                  <label>
                    <button
                      type="button"
                      className="my-2 btn btn-primary text-white rounded-full"
                      onClick={handleUploadFile}
                    >
                      Upload Photo
                    </button>
                  </label>
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="font-bold text-[#FFC700] dark:text-[#CDA000]">
                      Pet Name <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    required={true}
                    placeholder="Type your pet names here..."
                    className="input input-primary w-full rounded-full"
                    onChange={(e) => handleChange(e.target.value, "petname")}
                  />
                </div>
                <div className="form-control w-full my-2">
                  <label clasName="label">
                    <span className="font-bold text-[#FFC700] dark:text-[#CDA000]">
                      Pet Category <span className="text-error">*</span>
                    </span>
                  </label>
                  <select
                    className="select select-primary rounded-full my-2"
                    required={true}
                    onChange={(e) => {
                      handleChange(parseInt(e.target.value), "speciesid");
                    }}
                  >
                    <option disabled selected>
                      Choose your pet category
                    </option>
                    <option value={2}>Cat</option>
                    <option value={1}>Dog</option>
                  </select>
                </div>
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="w-full">
                    <label className="label">
                      <span className="font-bold text-[#FFC700] dark:text-[#CDA000]">
                        Gender <span className="text-error">*</span>
                      </span>
                    </label>
                    <div className="flex">
                      <div className="form-control">
                        <label className="label cursor-pointer">
                          <input
                            type="radio"
                            required={true}
                            name="radio-gender"
                            className="radio radio-primary"
                            value={1}
                            onChange={(e) => {
                              handleChange(parseInt(e.target.value), "gender");
                            }}
                          />
                          <span className="ml-2 italic">Male</span>
                        </label>
                      </div>
                      <div className="form-control mx-8">
                        <label className="label cursor-pointer">
                          <input
                            type="radio"
                            name="radio-gender"
                            required={true}
                            className="radio radio-primary"
                            value={2}
                            onChange={(e) =>
                              handleChange(parseInt(e.target.value), "gender")
                            }
                          />
                          <span className="ml-2 italic">Female</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="font-bold text-[#FFC700] dark:text-[#CDA000]">
                        Age <span className="text-error">*</span>
                      </span>
                    </label>
                    <div className="flex items-center">
                      <input
                        type="number"
                        required={true}
                        placeholder="Enter a number..."
                        className="input input-primary w-1/2 rounded-full"
                        onChange={(e) => handleChange(e.target.value, "age")}
                      />
                      <span className="ml-2 italic">month</span>
                    </div>
                  </div>
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="font-bold text-[#FFC700] dark:text-[#CDA000]">
                      Pet Color <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    required={true}
                    placeholder="Type your pet colors here..."
                    className="input input-primary w-full rounded-full"
                    onChange={(e) => handleChange(e.target.value, "color")}
                  />
                </div>
              </div>
              <div className="w-full lg:ml-16">
                <div className="form-control">
                  <label className="label">
                    <span className="font-bold text-[#FFC700] dark:text-[#CDA000]">
                      Pet Description <span className="text-error">*</span>
                    </span>
                  </label>
                  <textarea
                    className="textarea textarea-primary rounded-2xl h-32 lg:h-96"
                    required={true}
                    placeholder="Tell seeker about yout pet..."
                    onChange={(e) =>
                      handleChange(e.target.value, "description")
                    }
                  ></textarea>
                </div>
                <div className="mt-4 md:mt-12 mb-10 md:mb-0 flex justify-center px-8 gap-x-6">
                  <button
                    type="submit"
                    className="btn btn-primary rounded-full w-1/2 text-white"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-accent rounded-full w-1/2 text-white"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
