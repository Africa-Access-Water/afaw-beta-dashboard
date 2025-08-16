// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from "react";
import CardBox from "../../components/shared/CardBox";
import { Table, Badge } from "flowbite-react";
import SimpleBar from "simplebar-react";

const Donations = () => {
  // Sample donations data
  const donations = [
    {
      id: 1,
      name: "John Banda",
      email: "johnbanda@example.com",
      amount: 250,
      message: "Happy to support your cause!",
      created_at: "2025-08-12T10:15:00.000Z",
      method: "PayPal"
    },
    {
      id: 2,
      name: "Bupe Katongo",
      email: "katongobupe444@gmail.com",
      amount: 500,
      message: "Keep up the great work.",
      created_at: "2025-08-10T14:35:00.000Z",
      method: "Bank Transfer"
    },
    {
      id: 3,
      name: "Grace Mwansa",
      email: "gracemwansa@example.com",
      amount: 120,
      message: "Small contribution but from the heart.",
      created_at: "2025-08-08T09:00:00.000Z",
      method: "Mobile Money"
    }
  ];

  return (
    <CardBox>
      <h5 className="card-title mb-6">Donations</h5>
      <SimpleBar className="max-h-[500px]">
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="p-6">Donor Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Amount</Table.HeadCell>
              <Table.HeadCell>Payment Method</Table.HeadCell>
              <Table.HeadCell>Message</Table.HeadCell>
              <Table.HeadCell>Date</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y divide-border dark:divide-darkborder">
              {donations.map((donation) => (
                <Table.Row key={donation.id}>
                  <Table.Cell className="whitespace-nowrap ps-6">
                    {donation.name}
                  </Table.Cell>
                  <Table.Cell>{donation.email}</Table.Cell>
                  <Table.Cell>
                    <h4 className="font-semibold text-green-600">
                      ${donation.amount.toFixed(2)}
                    </h4>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge className="bg-lightprimary text-primary">
                      {donation.method}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge className="bg-lightsecondary text-secondary">
                      {donation.message}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(donation.created_at).toLocaleString()}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </SimpleBar>
    </CardBox>
  );
};

export default Donations;
