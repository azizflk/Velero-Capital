import { useEffect, useState } from "react";

type Row = { c: [string, string]; o: string };
const COINS: { sym: string; name: string; key: string; color: string }[] = [
  { sym: "BTC", name: "Bitcoin", key: "XXBTZUSD", color: "#f7931a" },
  { sym: "ETH", name: "Ethereum", key: "XETHZUSD", color: "#627eea" },
  { sym: "USDT", name: "Tether", key: "USDTZUSD", color: "#26a17b" },
  { sym: "XRP", name: "XRP", key: "XXRPZUSD", color: "#8b8b8b" },
  { sym: "USDC", name: "USDC", key: "USDCUSD", color: "#2775ca" },
  { sym: "SOL", name: "Solana", key: "SOLUSD", color: "#9945ff" },
  { sym: "TRX", name: "TRON", key: "TRXUSD", color: "#ef0027" },
  { sym: "ADA", name: "Cardano", key: "ADAUSD", color: "#2a6fd6" },
  { sym: "DOGE", name: "Dogecoin", key: "XDGUSD", color: "#c2a633" },
  { sym: "LINK", name: "Chainlink", key: "LINKUSD", color: "#2a5ada" },
  { sym: "DOT", name: "Polkadot", key: "DOTUSD", color: "#e6007a" },
  { sym: "ZEC", name: "Zcash", key: "XZECZUSD", color: "#ecb244" },
];
const URL = "https://api.kraken.com/0/public/Ticker?pair=XBTUSD,ETHUSD,USDTUSD,XRPUSD,USDCUSD,SOLUSD,TRXUSD,ADAUSD,DOGEUSD,LINKUSD,DOTUSD,ZECUSD";

export default function Ticker() {
  const [data, setData] = useState<Record<string, Row>>({});
  useEffect(() => {
    const load = () =>
      fetch(URL)
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => d?.result && setData(d.result))
        .catch(() => {});
    load();
    const t = setInterval(load, 60_000);
    return () => clearInterval(t);
  }, []);
  const list = COINS.filter((c) => data[c.key]);
  if (!list.length) return null;
  const items = [...list, ...list];
  const fmt = (n: number) => (n >= 1 ? n.toLocaleString("en-US", { maximumFractionDigits: 2 }) : n.toPrecision(4));
  return (
    <div className="border-y border-line bg-surface/60" aria-label="Live crypto prices (Kraken)">
      <div className="relative overflow-hidden">
        <div className="marquee flex w-max items-center gap-10 py-3 text-sm">
          {items.map((c, i) => {
            const r = data[c.key];
            const last = Number(r.c[0]);
            const open = Number(r.o);
            const pct = open ? ((last - open) / open) * 100 : 0;
            return (
              <div key={c.sym + i} className="flex items-center gap-2 whitespace-nowrap">
                <span className="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold text-white" style={{ background: c.color }}>{c.sym[0]}</span>
                <span className="text-white/90">{c.name}<span className="text-muted">({c.sym})</span></span>
                <span className="text-white">${fmt(last)}</span>
                <span className={pct >= 0 ? "text-emerald-400" : "text-rose-400"}>{pct >= 0 ? "+" : ""}{pct.toFixed(2)}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
