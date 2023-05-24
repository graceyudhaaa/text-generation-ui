import { ChangeEvent, useState } from "react";
// bruh
// @ts-ignore: Unreachable code error
import { Pace, WindupChildren } from "windups";


function App() {
  const [startText, setStartText] = useState('');
  const [numGenerate, setNumGenerate] = useState(100);
  const [temperature, setTemperature] = useState(0.1);
  const [result, setResult] = useState('')


  const handleStartText = (event: ChangeEvent<{ value: string }>) => {
    setStartText(event?.currentTarget?.value);
  }

  const handleNumGenerate = (event: ChangeEvent<{ value: string }>) => {
    setNumGenerate(event?.currentTarget?.value as unknown as number);
  }

  const handleTemperature = (event: ChangeEvent<{ value: string }>) => {
    setTemperature(parseFloat(event?.currentTarget?.value as string));
  }

  const handleGenerateClick = () => {
    if (startText === ''){
      return null
    }
    fetch("/api/generate", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        start_text: startText,
        temperature: temperature,
        num_generate: numGenerate
      }),
    })
    .then((response) => response.json())
    .then((response) => {
      setResult(response['generated_text']);
      console.log(result)
    })
  }

  return (
    <>
    <div className=" bg-[#343541]">
      <div className="max-w-5xl mx-auto h-10 flex items-center px-5 text-white">
        ChatGPT
      </div>
    </div>
    <div className="max-w-5xl mx-auto px-5">
      <div className="h-screen mt-4">
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
          <div className="col-span-3 md:col-span-2 grow">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Text</label>
            <input onChange={handleStartText} title="text" id="start_text" placeholder="start text" className="rounded w-full bg-[#40414f] border border-[#303139] h-10 p-4 text-white"></input>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Text Length</label>
            <select defaultValue={100} onChange={handleNumGenerate} className="rounded bg-[#40414f] w-full border border-[#303139] h-10 px-4 text-white appearance-none">
              <option value={100}>100</option>
              <option value={200}>200</option>
              <option value={300}>300</option>
              <option value={400}>400</option>
              <option value={600}>600</option>
              <option value={800}>800</option>
              <option value={1000}>1000</option>
              <option value={1200}>1200</option>
              <option value={1400}>1400</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fuzziness</label>
            <select defaultValue={0.1} onChange={handleTemperature} className="rounded bg-[#40414f] w-full border border-[#303139] h-10 px-4 text-white appearance-none">
              <option value={0.1}>0.1</option>
              <option value={0.2}>0.2</option>
              <option value={0.3}>0.3</option>
              <option value={0.4}>0.4</option>
              <option value={0.6}>0.6</option>
              <option value={0.8}>0.8</option>
              <option value={1}>1</option>
              <option value={1.2}>1.2</option>
              <option value={1.4}>1.4</option>
            </select>
          </div>
          <button onClick={handleGenerateClick} className="rounded self-end bg-[#202123] hover:bg-[#2c2d30] transition-all duration-500 text-white h-10">Generate</button>
        </div>
        <div className="bg-[#343541] whitespace-pre-wrap h-4/5 my-2 rounded-lg overflow-auto p-5 text-white">
        <WindupChildren>
          <Pace getPace={(char:string) => (char === " " ? 100 : 40)}>
            {result}
          </Pace>
        </WindupChildren>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
