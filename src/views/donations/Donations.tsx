// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from "react";
import CardBox from "../../components/shared/CardBox";
import { Table, Badge } from "flowbite-react";
import SimpleBar from "simplebar-react";
import { donations } from "../../utils/data/DonationData";
import PDFDownloadButton from "../../components/pdf/PDFDownloadButton";
import CSVExportButton from "../../components/export/CSVExportButton";

const Donations = () => {


  return (
    <CardBox>
      <div className="flex justify-between items-center mb-6">
        <h5 className="card-title">Donations</h5>
        <CSVExportButton 
          donations={donations}
          variant="donations"
          size="sm"
        />
      </div>
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
              <Table.HeadCell>Actions</Table.HeadCell>
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
                  <Table.Cell>
                    <PDFDownloadButton 
                      donation={donation}
                      organizationInfo={{
                        name: "AFAW Foundation",
                        address: "123 Charity Street, Lusaka, Zambia",
                        email: "info@africaaccesswater.org",
                        phone: "+260 123 456 789"
                      }}
                      size="xs"
                    />
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
