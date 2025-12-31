export const dynamic = "force-dynamic";

export default async function Login() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return <div>Login</div>;
}
