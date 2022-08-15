import { SmallButton } from "../CustomButton";

function MyAppointmentCard(data) {
  return (
    <div className="grid grid-cols-1 gap-5 ">
      <div className="w-72 text-sm md:text-lg border-l-8 border-primary pl-3">
        <table>
          <thead>
            <tr>
              <td>Date</td>
              <td className="text-primary">{data.date}</td>
            </tr>
            <tr>
              <td>Time</td>
              <td className="text-primary">{data.time}</td>
            </tr>
            <tr>
              <td>Place</td>
              <td className="text-primary">{data.place}</td>
            </tr>
            <tr>
              <td>Pet name</td>
              <td className="text-primary">{data.petname}</td>
            </tr>
            <tr>
              <td>Seeker name</td>
              <td className="text-primary">{data.seekername}</td>
            </tr>
          </thead>
        </table>
        <div className="space-x-2">
          <SmallButton
            label="Edit"
            href="/meetings/edit"
            className="bg-primary text-white font-bold"
          />
          <SmallButton label="Delete" href="#" className="bg-red-500" />
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
              <td>Date</td>
              <td className="text-primary">{data.date}</td>
            </tr>
            <tr>
              <td>Time</td>
              <td className="text-primary">{data.time}</td>
            </tr>
            <tr>
              <td>Place</td>
              <td className="text-primary">{data.place}</td>
            </tr>
            <tr>
              <td>Pet name</td>
              <td className="text-primary">{data.petname}</td>
            </tr>
            <tr>
              <td>Owner name</td>
              <td className="text-primary">{data.ownername}</td>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}

export { MyAppointmentCard, MyInvitationCard };
