export default function RightAds() {
  return (
    <div className="col-span-2 p-4 space-y-4 sticky top-24 self-start">
      <h2 className="text-xl font-bold">Sponsored</h2>
      <div className="bg-black/70 p-4 rounded-xl border border-green-500">
        <p className="font-bold">SKYGREEN Premium Panels</p>
        <p className="text-sm">High-efficiency 575W TOPCon. Limited offer.</p>
      </div>
      <div className="bg-black/70 p-4 rounded-xl border border-green-500">
        <p className="font-bold">Referral Program</p>
        <p className="text-sm">Earn ₹5,000 by referring a friend.</p>
      </div>
      <div className="bg-black/70 p-4 rounded-xl border border-green-500">
        <p className="text-sm text-center text-green-300">[Google Ad Block]</p>
      </div>
    </div>
  );
}
