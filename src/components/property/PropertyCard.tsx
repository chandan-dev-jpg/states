import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bed, Bath, Move, MapPin, Heart, ArrowUpRight } from 'lucide-react';
import { Property } from '../../types/property';
import { Badge } from '../common/Badge';
import { formatNumber } from '../../lib/utils';

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, className = '' }) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const getBadgeVariant = (status: Property['status']) => {
    switch (status) {
      case 'Exclusive':
        return 'gold';
      case 'New Release':
        return 'emerald';
      case 'Pending':
        return 'sand';
      default:
        return 'obsidian';
    }
  };

  return (
    <div
      className={`group relative bg-white border border-[#EAE6DF] hover:border-[#C5A880]/60 transition-all duration-500 overflow-hidden rounded-sm flex flex-col hover:shadow-xl ${className}`}
    >
      {/* Image Container with Zoom & Badge */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#1A1C20]">
        <img
          src={property.images[0]}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Dark subtle overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Status Badge */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
          <Badge variant={getBadgeVariant(property.status)}>
            {property.status}
          </Badge>
          <span className="bg-black/60 backdrop-blur-sm text-white/90 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-sm">
            {property.propertyType}
          </span>
        </div>

        {/* Favorite Save Button */}
        <button
          onClick={handleSaveToggle}
          aria-label="Save property to favorites"
          className={`absolute top-3.5 right-3.5 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
            isSaved
              ? 'bg-[#C5A880] text-black shadow-md'
              : 'bg-black/50 text-white/80 hover:bg-black hover:text-white'
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform ${isSaved ? 'fill-black scale-110' : ''}`}
          />
        </button>

        {/* Bottom image caption / price banner */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between text-white">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#C5A880] font-medium block">
              Investment Offering
            </span>
            <span className="text-xl sm:text-2xl font-serif-luxury font-semibold tracking-tight">
              {property.formattedPrice}
            </span>
          </div>
        </div>
      </div>

      {/* Details Container */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Location Line */}
          <div className="flex items-center gap-1.5 text-xs text-[#7A7E85] mb-2">
            <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
            <span className="truncate">
              {property.location.city}, {property.location.country}
            </span>
          </div>

          {/* Title */}
          <Link to={`/properties/${property.id}`}>
            <h3 className="text-lg sm:text-xl font-serif-luxury text-[#0D0F12] group-hover:text-[#8C6D45] transition-colors leading-snug line-clamp-1">
              {property.title}
            </h3>
          </Link>

          {/* Short tagline */}
          <p className="text-xs text-[#6B7280] font-light mt-1.5 line-clamp-2 leading-relaxed">
            {property.tagline}
          </p>
        </div>

        {/* Specification Stats Strip */}
        <div className="mt-6 pt-4 border-t border-[#EAE6DF] flex items-center justify-between text-xs text-[#4B5563]">
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4 text-[#C5A880]" />
            <span className="font-medium">{property.bedrooms}</span>
            <span className="text-[#9CA3AF] text-[11px]">Beds</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4 text-[#C5A880]" />
            <span className="font-medium">{property.bathrooms}</span>
            <span className="text-[#9CA3AF] text-[11px]">Baths</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Move className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="font-medium">{formatNumber(property.areaSqFt)}</span>
            <span className="text-[#9CA3AF] text-[11px]">Sq Ft</span>
          </div>

          <Link
            to={`/properties/${property.id}`}
            aria-label={`View details for ${property.title}`}
            className="w-8 h-8 rounded-full bg-[#FAF8F5] group-hover:bg-[#C5A880] flex items-center justify-center text-[#0D0F12] transition-colors ml-2"
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
