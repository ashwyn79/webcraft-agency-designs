
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Basic',
      price: 'Rs 10,250',
      originalPrice: 'Rs 12,500',
      stars: 1,
      color: 'bg-amber-600',
      features: [
        'Analysis Integration',
        'Blogs/Note Section',
        'Compling Content',
        'Domain Hosting',
        'Dynamic Site',
        'E-commerce Functionality',
        'Feedback Functionality',
        'Pages (Upto 10)',
        'Responsive Design',
        'Secure HTTPS',
        'SEO',
        'Sitemap',
        'Smooth Rendering',
        'Social Media Integration',
        'User Registration/Login'
      ]
    },
    {
      name: 'Premium',
      price: 'Rs 82,000',
      originalPrice: 'Rs 100,000',
      stars: 3,
      color: 'bg-yellow-500',
      popular: true,
      features: [
        'Analysis Integration',
        'Blogs/Note Section',
        'Compling Content',
        'Domain Hosting',
        'Dynamic Site',
        'E-commerce Functionality',
        'Feedback Functionality',
        'Pages (Upto 30)',
        'Responsive Design',
        'Secure HTTPS',
        'SEO',
        'Sitemap',
        'Smooth Rendering',
        'Social Media Integration',
        'User Registration/Login'
      ]
    },
    {
      name: 'Plus',
      price: 'Rs 37,310',
      originalPrice: 'Rs 45,500',
      stars: 2,
      color: 'bg-gray-400',
      features: [
        'Analysis Integration',
        'Blogs/Note Section',
        'Compling Content',
        'Domain Hosting',
        'Dynamic Site',
        'E-commerce Functionality',
        'Feedback Functionality',
        'Pages (Upto 20)',
        'Responsive Design',
        'Secure HTTPS',
        'SEO',
        'Sitemap',
        'Smooth Rendering',
        'Social Media Integration',
        'User Registration/Login'
      ]
    }
  ];

  const handleScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Website <span className="text-red-500">Pricing Plans</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the perfect plan for your business needs. Limited time 18% opening offer!
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative bg-gray-900 border-2 ${plan.popular ? 'border-red-500 scale-105' : 'border-gray-700'} hover:border-red-500 transition-all duration-300 rounded-2xl`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-red-500 text-white px-4 py-1 rounded-full">Most Popular</Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <div className="flex items-center justify-center mb-4">
                  <h3 className="text-2xl font-bold text-white mr-2">{plan.name}</h3>
                  <div className="flex">
                    {Array.from({ length: plan.stars }, (_, i) => (
                      <Star key={i} className={`h-5 w-5 ${plan.color} text-white`} fill="currentColor" />
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-3xl font-bold text-white mb-1">{plan.price}</div>
                  <div className="text-sm text-gray-400 line-through">{plan.originalPrice}</div>
                  <Badge variant="outline" className="text-green-400 border-green-400 mt-2 rounded-full">
                    18% Opening Offer
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <Check className="h-4 w-4 text-red-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  onClick={() => handleScroll('contact')}
                  className="w-full bg-red-500 hover:bg-red-600 text-white mt-6 rounded-full"
                >
                  Choose plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
