
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Award, Clock, Heart } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, number: '150+', label: 'Happy Clients' },
    { icon: Award, number: '200+', label: 'Projects Completed' },
    { icon: Clock, number: '5+', label: 'Years Experience' },
    { icon: Heart, number: '98%', label: 'Client Satisfaction' }
  ];

  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-red-500">DevotedZen Web</span>
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              We are a passionate team of web designers and developers dedicated to creating 
              exceptional digital experiences for businesses of all sizes. With over 5 years 
              of experience, we've helped hundreds of clients establish their online presence.
            </p>
            <p className="text-lg text-gray-400 mb-8">
              Our expertise spans across various industries including education, hospitality, 
              restaurants, and small businesses. We believe every business deserves a 
              professional website that reflects their unique brand and drives results.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-300">Custom web design and development</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-300">Mobile-responsive and SEO-optimized</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-300">Ongoing support and maintenance</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-300">Fast turnaround and competitive pricing</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-red-500 rounded-full mb-4">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">{stat.number}</h3>
                  <p className="text-gray-300">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
