import TestClientComponent from "@common/TestClientComponent";

import { api } from "~trpc/server";

export default async function Home() {
  const users = await api.users.getAll();

  const hello = await api.hello({ text: "server" });

  return (
    <div>
      {<h1>{hello.greeting}</h1>}
      <TestClientComponent />
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name || user.username || user.email || "Anonymous User"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export const revalidate = 10;
