import { useState, useEffect } from "react";
import { ShieldCheck, Activity, Ban, Radar, Terminal } from "lucide-react";

const threatMessages = [
  "🛑 Port scan detected from 192.168.1.10",
  "⚠️ Multiple failed SSH login attempts",
  "🚨 Malware signature found in outbound traffic",
  "🧨 Brute force attack blocked on port 22",
  "📡 Unusual data exfiltration detected",
  "🔍 Suspicious DNS request to unknown domain",
  "📛 Unauthorized access to admin panel",
];

export default function NetworkSecurityAnalyzer() {
  const [monitoring, setMonitoring] = useState(false);
  const [securityScore, setSecurityScore] = useState(85);
  const [suspiciousActivity, setSuspiciousActivity] = useState(8);
  const [connectionsBlocked, setConnectionsBlocked] = useState(12);
  const [threatsDetected, setThreatsDetected] = useState(6);
  const [liveFeed, setLiveFeed] = useState<string[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (monitoring) {
      interval = setInterval(() => {
        setSuspiciousActivity((prev) => prev + Math.floor(Math.random() * 2));
        setConnectionsBlocked((prev) => prev + Math.floor(Math.random() * 2));
        setThreatsDetected((prev) => prev + Math.floor(Math.random() * 2));
        setSecurityScore((prev) =>
          prev > 50 ? prev - Math.floor(Math.random() * 2) : prev
        );

        const newThreat = threatMessages[Math.floor(Math.random() * threatMessages.length)];
        setLiveFeed((prev) => [newThreat, ...prev.slice(0, 9)]);
      }, 2500);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [monitoring]);

  const exportReport = () => {
    const content = `
      Cybersecurity Monitoring Report
      
      Security Score: ${securityScore}%
      Suspicious Activities: ${suspiciousActivity}
      Connections Blocked: ${connectionsBlocked}
      Threats Detected: ${threatsDetected}
    `;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "cybersecurity_report.txt";
    a.click();
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-white">🛡️ Cybersecurity Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card title="Security Score" value={`${securityScore}%`} icon={<ShieldCheck className="text-green-400" />} />
        <Card title="Suspicious Activity" value={suspiciousActivity} icon={<Activity className="text-yellow-400" />} />
        <Card title="Connections Blocked" value={connectionsBlocked} icon={<Ban className="text-red-400" />} />
        <Card title="Threats Detected" value={threatsDetected} icon={<Radar className="text-purple-400" />} />
      </div>

      <div className="space-x-4">
        <button
          onClick={() => setMonitoring(!monitoring)}
          className={`px-4 py-2 rounded text-white ${monitoring ? "bg-red-600" : "bg-green-600"}`}
        >
          {monitoring ? "Stop Monitoring" : "Start Monitoring"}
        </button>
        <button
          onClick={exportReport}
          className="px-4 py-2 rounded bg-blue-600 text-white"
        >
          Export Report
        </button>
      </div>

      {/* 🔥 LIVE THREAT FEED */}
      <div className="bg-zinc-900 mt-8 rounded-xl p-4 shadow-md">
        <div className="flex items-center gap-2 mb-2">
          <Terminal className="text-cyan-400" />
          <h2 className="text-xl font-semibold">🔴 Live Threat Feed</h2>
        </div>
        <div className="h-48 overflow-y-auto space-y-2 text-sm font-mono text-gray-200">
          {liveFeed.map((log, index) => (
            <div key={index} className="bg-zinc-800 p-2 rounded-md border border-zinc-700">
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Card({ title, value, icon }: { title: string; value: string | number; icon: React.ReactNode }) {
  return (
    <div className="bg-zinc-900 p-4 rounded-2xl shadow-md flex items-center justify-between">
      <div>
        <div className="text-sm text-gray-400">{title}</div>
        <div className="text-2xl font-bold text-white">{value}</div>
      </div>
      <div>{icon}</div>
    </div>
  );
}
