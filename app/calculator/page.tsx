import LeftRightWrapper from "@/components/calculator/leftRightWrapper";
import RightAds from "@/components/calculator/RightAds";

export default function SolarDashboardPage() {
  return (
    <div className="grid grid-cols-12 gap-4 mt-24  text-green-400 p-4">
      <LeftRightWrapper/>

      {/* RIGHT GRID */}
      <RightAds />
    </div>
  );
}
