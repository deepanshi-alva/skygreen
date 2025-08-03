"use client";

import React from "react";

const HeroSection = () => {
  return (
    <section className="hero-wrapper">
      <div className="sticky-hero">
        <video
          src="/images/products/HeaderFlower.mp4"
          autoPlay
          muted
          playsInline
          className="bg-video"
        />
        <div className="hero-content">
          <h1 className="text-[100px]">OUR PORTFOLIO</h1>
          <p className="text-green-400 text-[30px]">
            Goes beyond standard products.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
