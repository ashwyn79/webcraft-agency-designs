
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .eq('is_approved', true)
          .order('created_at', { ascending: false });

        if (error) throw error;

        console.log('Loaded testimonials from database:', data);
        setTestimonials(data || []);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // Fallback to localStorage if database fails
        const savedTestimonials = localStorage.getItem('testimonials');
        if (savedTestimonials) {
          setTestimonials(JSON.parse(savedTestimonials));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section id="testimonials" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg text-gray-600">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null; // Don't show section if no testimonials
  }

  return (
    <section id="testimonials" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-black">
            What Our <span className="text-red-500">Clients Say</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say about our services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg rounded-2xl">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center mb-4">
                  {Array.from({ length: testimonial.rating || 5 }, (_, i) => (
                    <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 text-sm sm:text-base italic">
                  "{testimonial.testimonial}"
                </p>
                <div className="flex items-center">
                  {testimonial.profile_picture && (
                    <img 
                      src={testimonial.profile_picture} 
                      alt={testimonial.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover mr-3 sm:mr-4"
                    />
                  )}
                  <div>
                    <h4 className="font-semibold text-black text-sm sm:text-base">{testimonial.name}</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">{testimonial.position || testimonial.business}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
