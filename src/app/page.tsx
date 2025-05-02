import prisma from "@/lib/prisma";

export default async function Home() {
  const users = await prisma.user.findMany();

  return (
    <div>
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
