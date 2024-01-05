import { RiEditBoxFill } from "react-icons/ri";

const AccountDetails = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { id, name, email, payload } = user;

  const fields = [
    { title: "Name", content: name, id: "name" },
    { title: "Email", content: email, id: "email" },
    { title: "Password", content: "********", id: "password" },
  ];

  return (
    <div className="mt-10">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        {fields.map((field) => (
          <div
            key={field.id}
            className="flex justify-between items-center mb-8"
          >
            <div>
              <p className="text-sm font-normal">{field.title}</p>
              <p className="mt-1 text-lg font-semibold">{field.content}</p>
            </div>
            <button className="flex items-center bg-transparent border border-mintGreen text-black font-medium text-sm px-4 py-3 rounded-md">
              <RiEditBoxFill className="mr-1" />
              Change
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountDetails;
