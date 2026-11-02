import { PrimaryButton } from "@/components/ui/PrimaryButton";

export function Hero() {
  return (
    <div className="hero">
      <div className="hero-image" />
      <div className="hero-copy">
        <span className="hero-tag">
          <i /> THE GOOD STUFF IS CLOSE
        </span>
        <h1>
          Good food.
          <br />
          <em>Good mood.</em>
        </h1>
        <p>
          Big cravings, meet their match.
          <br />
          Find your new favorite around the corner.
        </p>
        <PrimaryButton onClick={() => document.getElementById("restaurants")?.scrollIntoView({ behavior: "smooth" })}>
          Explore restaurants <span>→</span>
        </PrimaryButton>
        <div className="hero-foot">
          <span>✳</span> Made for your kind of hungry
        </div>
      </div>
      <div className="hero-note">
        <b>Today’s mood</b>
        <span>Something fresh & feel-good</span>
        <i>↗</i>
      </div>
    </div>
  );
}
