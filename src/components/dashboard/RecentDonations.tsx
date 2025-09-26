import { DonationActivity } from '../../utils/data/DonationData'

const RecentDonations = () => {
  
  return (
    <div className="card-elevated card-spacing w-full">
      <h5 className="heading-5 mb-6">Recent Donations</h5>
      <div className="flex flex-col mt-2">
        <ul>
          {DonationActivity.map((item, index) => (
            <li key={index}>
              <div className="flex gap-4 min-h-16">
                <div>
                  <p className="text-caption">{item.Time}</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className={`rounded-full ${item.color} p-1.5 w-fit`}></div>
                  {item.line && <div className={`${item.line}`}></div>}
                </div>
                <div>
                  <p className="text-body">{item.action}</p>
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
