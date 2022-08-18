import Link from "next/link";

function MyAppointmentCard(data, id) {
  const handleDelete = async (e) => {
    setLoading(true);
    e.preventDefault();

    var requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(`https://golangprojectku.site/meetings/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const { message } = result;
        alert(message);
      })
      .catch((error) => {
        alert(error, toString());
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className="grid grid-cols-1 gap-5 ">
      <div className="w-72 text-sm md:text-lg border-l-8 border-primary pl-3">
        <table>
          <thead>
            <tr>
              <td className="font-medium">Date</td>
              <td className="text-primary">{data.date}</td>
            </tr>
            <tr>
              <td className="font-medium">Time</td>
              <td className="text-primary">{data.time}</td>
            </tr>
            <tr>
              <td className="font-medium">Place</td>
              <td className="text-primary">{data.place}</td>
            </tr>
            <tr>
              <td className="font-medium">Pet name</td>
              <td className="text-primary">{data.petname}</td>
            </tr>
            <tr>
              <td className="font-medium">Seeker name</td>
              <td className="text-primary">{data.seekername}</td>
            </tr>
          </thead>
        </table>
        <div className="space-x-1 dark:text-black">
          <Link href={`/meetings/edit/${id}`}>
            <button className="w-16 md:w-20 text-md md:text-lg rounded-lg font-Poppins bg-primary">
              Edit
            </button>
          </Link>
          <button className="w-16 md:w-20 text-md md:text-lg rounded-lg font-Poppins bg-primary">
            Done
          </button>
          <button
            onClick={(e) => handleDelete(e)}
            className="w-16 md:w-20 text-md md:text-lg rounded-lg font-Poppins bg-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function MyInvitationCard(data) {
  return (
    <div className="grid grid-cols-1 gap-5 ">
      <div className="w-72 text-sm md:text-lg border-l-8 border-primary pl-3">
        <table>
          <thead>
            <tr>
              <td className="font-medium">Date</td>
              <td className="text-primary">{data.date}</td>
            </tr>
            <tr>
              <td className="font-medium">Time</td>
              <td className="text-primary">{data.time}</td>
            </tr>
            <tr>
              <td className="font-medium">Place</td>
              <td className="text-primary">{data.place}</td>
            </tr>
            <tr>
              <td className="font-medium">Pet name</td>
              <td className="text-primary">{data.petname}</td>
            </tr>
            <tr>
              <td className="font-medium">Owner name</td>
              <td className="text-primary">{data.ownername}</td>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}

export { MyAppointmentCard, MyInvitationCard };
