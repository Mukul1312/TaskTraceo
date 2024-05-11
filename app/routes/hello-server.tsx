import { json } from "@remix-run/node"; // or cloudflare/deno

export const loader = async () => {
  return json({ ok: true });
};

export default function HelloServer() {
  return (
    <div className="bg-white flex justify-center items-center h-screen">
      <div className="">Hi</div>
    </div>
  );
}
