import reactLogo from "@/assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useRef, useState } from "react";
import { Button } from "./components/ui/button";

export function Component() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [imgU, setImgU] = useState(["", ""]);
  const ref1 = useRef<HTMLImageElement | null>(null);
  const ref2 = useRef<HTMLImageElement | null>(null);
  async function greet() {
    setGreetMsg(await invoke("greet", { name }));
  }
  useEffect(() => {
    const i1 = ref1?.current?.src ?? "";
    const i2 = ref2?.current?.src ?? "";
    setImgU([i1, i2]);
  }, [ref1, ref2]);
  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>
      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img
            src="/tauri.svg"
            ref={ref1}
            className="logo tauri"
            alt="Tauri logo"
          />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img
            src={reactLogo}
            ref={ref2}
            className="logo react"
            alt="React logo"
          />
        </a>
      </div>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>
      <p className="text-red-400">React Logo: {reactLogo}</p>
      <p>Image 1 src {imgU[0]}</p>
      <p>Image 2 src {imgU[1]}</p>
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
        <Button>Shadcn</Button>
      </form>
      <p>{greetMsg}</p>
    </div>
  );
}
