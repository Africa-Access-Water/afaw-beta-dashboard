import { Link } from "react-router";

const RecentDonations = () => {
  const DonationActivity = [
   
    {
      Time: "09:58",
      action: "K1,500.00,  Green Earth Foundation",
      color: "bg-green-500",
      line: "h-full w-px bg-border",
    },
    {
      Time: "09:40",
      action: "K500.00, Mary Banda",
      color: "bg-blue-500",
      line: "h-full w-px bg-border",
    },
    {
      Time: "09:22",
      action: "K5,000.00, Zambezi Bank",
      color: "bg-yellow-500",
      line: "h-full w-px bg-border",
    },
    {
      Time: "09:05",
      action: "K200.00, anonymous donor",
      color: "bg-gray-400",
      line: "h-full w-px bg-border",
    },
    
  ];

  return (
    <div className="rounded-xl shadow-md bg-white dark:bg-darkgray p-6 w-full">
      <h5 className="card-title mb-6 text-lg font-semibold">Recent Donations</h5>
      <div className="flex flex-col mt-2">
        <ul>
          {DonationActivity.map((item, index) => (
            <li key={index}>
              <div className="flex gap-4 min-h-16">
                <div>
                  <p className="text-sm font-medium text-gray-500">{item.Time}</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className={`rounded-full ${item.color} p-1.5 w-fit`}></div>
                  {item.line && <div className={`${item.line}`}></div>}
                </div>
                <div>
                  <p className="text-dark text-start">{item.action}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecentDonations;
