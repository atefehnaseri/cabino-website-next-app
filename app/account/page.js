import { auth } from "../_lib/auth";

export const metadata = {
  title: "Account",
};

export default async function page() {
  const {
    user: { name },
  } = await auth();

  return <h1>Welcome, {name}</h1>;
}
