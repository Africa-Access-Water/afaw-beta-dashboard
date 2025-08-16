import { Badge, Table } from "flowbite-react";
import SimpleBar from "simplebar-react";
import product1 from "/src/assets/images/products/dash-prd-1.jpg"; // Same style image

const Contacts = () => {
  // Your contacts data
  const contacts = [
    {
      id: 3,
      name: "Aniket",
      email: "ani.chopade57@gmail.com",
      message: "Test email from dev",
      created_at: "2025-08-12T01:01:33.738Z"
    },
    {
      id: 2,
      name: "Bupe Katongo",
      email: "katongobupe444@gmail.com",
      message: "Another Test using knex",
      created_at: "2025-08-08T10:48:50.308Z"
    },
    {
      id: 1,
      name: "Bupe Katongo",
      email: "katongobupe444@gmail.com",
      message: "Testing Mail Server using PostgreSQL hosted on Render.com",
      created_at: "2025-08-07T10:22:23.285Z"
    }
  ];

  return (
    <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray pt-6 px-0 relative w-full break-words">
      <div className="px-6">
        <h5 className="card-title mb-6">Contacts</h5>
      </div>
      <SimpleBar className="max-h-[450px]">
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="p-6">Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Message</Table.HeadCell>
              <Table.HeadCell>Date</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y divide-border dark:divide-darkborder">
              {contacts.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell className="whitespace-nowrap ps-6">
                    <div className="flex gap-3 items-center">
                     
                      <div className="truncate max-w-56">
                        <h6 className="text-sm">{item.name}</h6>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <p className="text-base">{item.email}</p>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge className="bg-lightsecondary text-secondary">
                      {item.message}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <h4>{new Date(item.created_at).toLocaleString()}</h4>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </SimpleBar>
    </div>
  );
};

export default Contacts;
