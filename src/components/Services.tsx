
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Building, UtensilsCrossed, Store, Smartphone, Search } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: GraduationCap,
      title: 'Educational Websites',
      description: 'Custom websites for schools, colleges, and educational institutions with student portals, course management, and online learning features.',
      features: ['Student Management', 'Online Learning', 'Event Calendar', 'News & Updates']
    },
    {
      icon: Building,
      title: 'Hotel & Hospitality',
      description: 'Beautiful booking websites for hotels, resorts, and hospitality businesses with reservation systems and virtual tours.',
      features: ['Online Booking', 'Room Management', 'Guest Reviews', 'Virtual Tours']
    },
    {
      icon: UtensilsCrossed,
      title: 'Restaurant Websites',
      description: 'Appetizing websites for restaurants, cafes, and food businesses with online ordering and menu management.',
      features: ['Online Ordering', 'Menu Display', 'Table Reservations', 'Customer Reviews']
    },
    {
      icon: Store,
      title: 'Small Business',
      description: 'Professional websites for small businesses to establish their online presence and attract more customers.',
      features: ['Business Showcase', 'Contact Forms', 'Service Listings', 'Local SEO']
    },
    {
      icon: Smartphone,
      title: 'Mobile Responsive',
      description: 'All our websites are fully responsive and optimized for mobile devices, tablets, and desktops.',
      features: ['Mobile First', 'Touch Friendly', 'Fast Loading', 'Cross Browser']
    },
    {
      icon: Search,
      title: 'SEO Optimization',
      description: 'Built-in SEO optimization to help your website rank higher in search engines and attract more visitors.',
      features: ['Keyword Research', 'On-Page SEO', 'Local SEO', 'Analytics Setup']
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            Our <span className="text-red-500">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We specialize in creating custom websites tailored to your industry needs. 
            From educational institutions to hospitality businesses, we've got you covered.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-red-500 rounded-full w-fit group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-black">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
