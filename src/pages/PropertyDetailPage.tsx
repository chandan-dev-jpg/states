import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Bed,
  Bath,
  Move,
  Calendar,
  MapPin,
  CheckCircle,
  Phone,
  Mail,
  Share2,
  Heart,
  ArrowLeft,
  ShieldCheck,
  Building,
  Layers
} from 'lucide-react';
import { propertiesData } from '../data/properties';
import { PropertyGallery } from '../components/property/PropertyGallery';
import { ScheduleVisitForm } from '../components/forms/ScheduleVisitForm';
import { PropertyCard } from '../components/property/PropertyCard';
import { Badge } from '../components/common/Badge';
import { formatNumber } from '../lib/utils';

export const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const property = propertiesData.find((p) => p.id === id);

  // Scroll to top when property changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!property) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] pt-40 pb-20 px-4 text-center">
        <h2 className="text-3xl font-serif-luxury text-[#0D0F12] mb-4">Estate Not Found</h2>
        <p className="text-sm text-[#5A5E66] mb-8">
          The requested property dossier does not exist or may have been concluded off-market.
        </p>
        <Link
          to="/properties"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#0D0F12] text-white text-xs uppercase tracking-widest rounded-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Portfolio</span>
        </Link>
      </div>
    );
  }

  // Similar properties for bottom recommendations
  const similarEstates = propertiesData
    .filter((p) => p.id !== property.id && (p.propertyType === property.propertyType || p.featured))
    .slice(0, 3);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: property.tagline,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share dismissed');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Private Dossier link copied to clipboard.');
    }
  };

  return (
    <div className="w-full bg-[#FAF8F5] pt-24 sm:pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumbs & Top Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-[#EAE6DF]">
          <div className="flex items-center gap-2 text-xs text-[#7A7E85]">
            <Link to="/" className="hover:text-[#0D0F12] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/properties" className="hover:text-[#0D0F12] transition-colors">
              Properties
            </Link>
            <span>/</span>
            <span className="text-[#0D0F12] font-medium truncate max-w-[200px] sm:max-w-xs">
              {property.title}
            </span>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#EAE6DF] hover:border-[#C5A880] text-xs text-[#0D0F12] rounded-sm transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Share Dossier</span>
            </button>

            <button
              onClick={() => navigate('/properties')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#EAE6DF] hover:border-[#0D0F12] text-xs text-[#0D0F12] rounded-sm transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          </div>
        </div>

        {/* Header Title & Pricing Block */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-8">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant="gold">{property.status}</Badge>
              <span className="bg-[#0D0F12] text-white text-[11px] uppercase tracking-wider px-3 py-1 rounded-sm font-medium">
                {property.propertyType}
              </span>
              <span className="text-xs text-[#7A7E85] flex items-center gap-1 ml-1">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                {property.location.address}, {property.location.city}, {property.location.country}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-normal text-[#0D0F12] leading-tight">
              {property.title}
            </h1>

            <p className="text-sm sm:text-base text-[#5A5E66] font-light leading-relaxed">
              {property.tagline}
            </p>
          </div>

          <div className="bg-white border border-[#EAE6DF] p-5 sm:p-6 rounded-sm shadow-sm min-w-[280px] lg:text-right">
            <span className="text-[11px] uppercase tracking-widest text-[#8C6D45] font-semibold block mb-1">
              Acquisition Price
            </span>
            <span className="text-3xl sm:text-4xl font-serif-luxury font-medium text-[#0D0F12]">
              {property.formattedPrice}
            </span>
            <span className="text-xs text-[#9CA3AF] block mt-1">
              Estimated Taxes & Advisory Escrow on request
            </span>
          </div>
        </div>

        {/* Large Swiper Image Gallery */}
        <PropertyGallery images={property.images} title={property.title} />

        {/* Key Specification Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 bg-white border border-[#EAE6DF] p-6 rounded-sm my-10 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-[#FAF8F5] flex items-center justify-center text-[#C5A880] border border-[#EAE6DF]">
              <Bed className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#9CA3AF] block">Bedrooms</span>
              <span className="text-sm font-semibold text-[#0D0F12]">{property.bedrooms} Suites</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-[#FAF8F5] flex items-center justify-center text-[#C5A880] border border-[#EAE6DF]">
              <Bath className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#9CA3AF] block">Bathrooms</span>
              <span className="text-sm font-semibold text-[#0D0F12]">{property.bathrooms} Full Baths</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-[#FAF8F5] flex items-center justify-center text-[#C5A880] border border-[#EAE6DF]">
              <Move className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#9CA3AF] block">Interior Area</span>
              <span className="text-sm font-semibold text-[#0D0F12]">{formatNumber(property.areaSqFt)} Sq Ft</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-[#FAF8F5] flex items-center justify-center text-[#C5A880] border border-[#EAE6DF]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#9CA3AF] block">Lot Size</span>
              <span className="text-sm font-semibold text-[#0D0F12]">
                {property.lotSizeAcres ? `${property.lotSizeAcres} Acres` : 'Deeded Parcel'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-[#FAF8F5] flex items-center justify-center text-[#C5A880] border border-[#EAE6DF]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#9CA3AF] block">Year Built</span>
              <span className="text-sm font-semibold text-[#0D0F12]">{property.yearBuilt}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-[#FAF8F5] flex items-center justify-center text-[#C5A880] border border-[#EAE6DF]">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#9CA3AF] block">Typology</span>
              <span className="text-sm font-semibold text-[#0D0F12]">{property.propertyType}</span>
            </div>
          </div>
        </div>

        {/* Two Column Layout: Main Content (Left) & Agent / Visit Booking (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Details, Description, Highlights, Amenities */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Description */}
            <div className="bg-white border border-[#EAE6DF] p-8 rounded-sm shadow-sm space-y-4">
              <h2 className="text-xl font-serif-luxury text-[#0D0F12] pb-3 border-b border-[#EAE6DF]">
                Architectural Statement & Narrative
              </h2>
              <p className="text-sm sm:text-base font-light text-[#4B5563] leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Architectural Highlights */}
            <div className="bg-white border border-[#EAE6DF] p-8 rounded-sm shadow-sm space-y-4">
              <h3 className="text-xl font-serif-luxury text-[#0D0F12] pb-3 border-b border-[#EAE6DF]">
                Architectural Highlights & Engineering
              </h3>
              <ul className="space-y-3.5">
                {property.architecturalHighlights.map((hl, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#374151] font-light">
                    <span className="w-5 h-5 rounded-full bg-[#FAF8F5] border border-[#C5A880] flex items-center justify-center shrink-0 mt-0.5 text-[#8C6D45] text-xs font-serif font-bold">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Amenities Grid */}
            <div className="bg-white border border-[#EAE6DF] p-8 rounded-sm shadow-sm space-y-4">
              <h3 className="text-xl font-serif-luxury text-[#0D0F12] pb-3 border-b border-[#EAE6DF]">
                Estate Amenities & Private Infrastructure
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                {property.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 bg-[#FAF8F5] border border-[#EAE6DF] rounded-sm text-xs font-medium text-[#1F2937]"
                  >
                    <CheckCircle className="w-4 h-4 text-[#C5A880] shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Assigned Partner Profile & Booking Form */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Assigned Partner Profile Card */}
            <div className="bg-[#0D0F12] text-white p-6 sm:p-8 rounded-sm border border-white/10 shadow-xl">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold mb-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Assigned Private Client Lead</span>
              </div>

              <div className="flex items-start gap-4 pb-6 border-b border-white/10">
                <img
                  src={property.agent.avatar}
                  alt={property.agent.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#C5A880]"
                />
                <div>
                  <h4 className="text-lg font-serif-luxury text-white">
                    {property.agent.name}
                  </h4>
                  <p className="text-xs text-[#C5A880] font-light mt-0.5">
                    {property.agent.title}
                  </p>
                  <p className="text-[11px] text-[#9CA3AF] mt-1 font-light">
                    {property.agent.experience}
                  </p>
                </div>
              </div>

              <div className="py-4 space-y-2.5 text-xs text-[#DCD6CD]">
                <a
                  href={`tel:${property.agent.phone}`}
                  className="flex items-center gap-3 p-2 bg-white/5 hover:bg-white/10 rounded-sm transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>{property.agent.phone}</span>
                </a>
                <a
                  href={`mailto:${property.agent.email}`}
                  className="flex items-center gap-3 p-2 bg-white/5 hover:bg-white/10 rounded-sm transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span className="truncate">{property.agent.email}</span>
                </a>
              </div>

              <div className="pt-2 text-[11px] text-[#A0A3A8] font-light">
                Fluent in {property.agent.languages.join(', ')}
              </div>
            </div>

            {/* Embedded Schedule a Visit Form */}
            <div className="sticky top-28">
              <ScheduleVisitForm initialPropertyId={property.id} />
            </div>

          </div>

        </div>

        {/* Bottom Recommendations: Similar Flagship Estates */}
        {similarEstates.length > 0 && (
          <div className="mt-24 pt-16 border-t border-[#EAE6DF]">
            <div className="flex justify-between items-end mb-8">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#C5A880] block mb-1">
                  Syndicate Portfolio
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif-luxury text-[#0D0F12]">
                  Similar Architectural Masterpieces
                </h3>
              </div>

              <Link
                to="/properties"
                className="text-xs uppercase tracking-wider font-semibold text-[#0D0F12] hover:text-[#8C6D45] pb-1 border-b border-[#0D0F12]"
              >
                View All
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similarEstates.map((item) => (
                <PropertyCard key={item.id} property={item} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
