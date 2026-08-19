import React from 'react';
import { Hero } from '../components/home/Hero';
import { FeaturedSection } from '../components/home/FeaturedSection';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { LocationsGrid } from '../components/home/LocationsGrid';
import { Testimonials } from '../components/home/Testimonials';
import { CtaBanner } from '../components/home/CtaBanner';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      {/* Fullscreen Hero */}
      <Hero />

      {/* Featured Properties Swiper Carousel */}
      <FeaturedSection />

      {/* Why Choose Us 4 Pillars */}
      <WhyChooseUs />

      {/* World's Most Coveted Addresses / Locations */}
      <LocationsGrid />

      {/* Client Endorsements Swiper Slider */}
      <Testimonials />

      {/* Private Acquisition CTA Banner */}
      <CtaBanner />
    </div>
  );
};
