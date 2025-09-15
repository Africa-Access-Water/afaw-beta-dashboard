// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from "react";
import CardBox from "../../components/shared/CardBox";
import { Table, Badge, Avatar } from "flowbite-react";
import SimpleBar from "simplebar-react";
import { donors } from "src/utils/data/DonorData";
import CSVExportButton from "../../components/export/CSVExportButton";

const Donors = () => {


  return (
    <CardBox>
      <div className="flex justify-between items-center mb-6">
        <h5 className="card-title">Donors</h5>
        <CSVExportButton 
          donations={[]}
          donors={donors}
          variant="donors"
          size="sm"
        />
      </div>
      <SimpleBar className="max-h-[500px]">
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="p-6">Donor</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Total Donated</Table.HeadCell>
              <Table.HeadCell>Frequency</Table.HeadCell>
              <Table.HeadCell>Last Donation</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y divide-border dark:divide-darkborder">
              {donors.map((donor) => (
                <Table.Row key={donor.id}>
                  <Table.Cell className="flex items-center gap-3 ps-6">
                    <Avatar img={donor.avatar} rounded size="sm" />
                    {donor.name}
                  </Table.Cell>
                  <Table.Cell>{donor.email}</Table.Cell>
                  <Table.Cell>
                    <h4 className="font-semibold text-green-600">
                      ${donor.total_donated.toLocaleString()}
                    </h4>
                  </Table.Cell>
                  <Table.Cell>
                    {donor.frequency === "Monthly" && (
                      <Badge className="bg-lightprimary text-primary">
                        Monthly
                      </Badge>
                    )}
                    {donor.frequency === "Weekly" && (
                      <Badge className="bg-lightinfo text-info">Weekly</Badge>
                    )}
                    {donor.frequency === "Once-off" && (
                      <Badge className="bg-lightwarning text-warning">
                        Once-off
                      </Badge>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(donor.last_donation).toLocaleString()}
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

export default Donors;
