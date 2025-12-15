export default async function Login() {
  await new Promise((resolve) => setTimeout(resolve, 10000));

  throw new Error("Test error");
}
