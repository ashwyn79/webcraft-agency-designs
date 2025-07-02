
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ProjectRequestFormProps {
  onBack: () => void;
}

const ProjectRequestForm = ({ onBack }: ProjectRequestFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: '',
    websiteType: '',
    budgetRange: '',
    timeline: '',
    features: [] as string[],
    description: '',
    hasContent: false,
    hasLogo: false,
    additionalRequirements: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const businessTypes = [
    'Restaurant', 'Hotel', 'School', 'Healthcare', 'Real Estate', 
    'E-commerce', 'Technology', 'Consulting', 'Legal', 'Other'
  ];

  const websiteTypes = [
    'Business Website', 'E-commerce Store', 'Portfolio', 'Blog', 
    'Booking System', 'Educational Platform', 'Corporate Website'
  ];

  const budgetRanges = [
    'Under $1,000', '$1,000 - $3,000', '$3,000 - $5,000', 
    '$5,000 - $10,000', 'Over $10,000'
  ];

  const timelines = [
    '1-2 weeks', '3-4 weeks', '1-2 months', '2-3 months', 'No rush'
  ];

  const availableFeatures = [
    'Contact Forms', 'Online Booking', 'E-commerce', 'Blog', 
    'Gallery', 'Customer Reviews', 'Social Media Integration', 
    'SEO Optimization', 'Mobile App', 'Multi-language Support'
  ];

  const handleFeatureChange = (feature: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      features: checked 
        ? [...prev.features, feature]
        : prev.features.filter(f => f !== feature)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('project_requests')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          business_name: formData.businessName,
          business_type: formData.businessType,
          website_type: formData.websiteType,
          budget_range: formData.budgetRange,
          timeline: formData.timeline,
          features: formData.features,
          description: formData.description,
          has_content: formData.hasContent,
          has_logo: formData.hasLogo,
          additional_requirements: formData.additionalRequirements
        });

      if (error) throw error;

      toast({
        title: "Project Request Submitted!",
        description: "Thank you for your interest. We'll contact you within 24 hours to discuss your project.",
      });

      // Reset form
      setFormData({
        name: '', email: '', phone: '', businessName: '', businessType: '',
        websiteType: '', budgetRange: '', timeline: '', features: [],
        description: '', hasContent: false, hasLogo: false, additionalRequirements: ''
      });

      onBack();
    } catch (error) {
      console.error('Error submitting project request:', error);
      toast({
        title: "Error",
        description: "Failed to submit your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Button 
            onClick={onBack}
            variant="outline" 
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Contact
          </Button>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Start Your <span className="text-red-500">Project</span>
          </h1>
          <p className="text-xl text-gray-600">
            Tell us about your project requirements and we'll create the perfect website for you.
          </p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">Project Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name
                  </label>
                  <Input
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    placeholder="Your business name"
                  />
                </div>
              </div>

              {/* Business Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Type *
                  </label>
                  <Select value={formData.businessType} onValueChange={(value) => setFormData({...formData, businessType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website Type *
                  </label>
                  <Select value={formData.websiteType} onValueChange={(value) => setFormData({...formData, websiteType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select website type" />
                    </SelectTrigger>
                    <SelectContent>
                      {websiteTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Budget and Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Range *
                  </label>
                  <Select value={formData.budgetRange} onValueChange={(value) => setFormData({...formData, budgetRange: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetRanges.map(range => (
                        <SelectItem key={range} value={range}>{range}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timeline *
                  </label>
                  <Select value={formData.timeline} onValueChange={(value) => setFormData({...formData, timeline: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      {timelines.map(timeline => (
                        <SelectItem key={timeline} value={timeline}>{timeline}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Required Features (select all that apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {availableFeatures.map(feature => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox
                        id={feature}
                        checked={formData.features.includes(feature)}
                        onCheckedChange={(checked) => handleFeatureChange(feature, checked as boolean)}
                      />
                      <label htmlFor={feature} className="text-sm text-gray-700">{feature}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Description
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe your project, goals, and any specific requirements..."
                  rows={4}
                />
              </div>

              {/* Content and Logo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasContent"
                    checked={formData.hasContent}
                    onCheckedChange={(checked) => setFormData({...formData, hasContent: checked as boolean})}
                  />
                  <label htmlFor="hasContent" className="text-sm text-gray-700">
                    I have content (text, images) ready
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasLogo"
                    checked={formData.hasLogo}
                    onCheckedChange={(checked) => setFormData({...formData, hasLogo: checked as boolean})}
                  />
                  <label htmlFor="hasLogo" className="text-sm text-gray-700">
                    I have a logo/branding materials
                  </label>
                </div>
              </div>

              {/* Additional Requirements */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Requirements or Questions
                </label>
                <Textarea
                  value={formData.additionalRequirements}
                  onChange={(e) => setFormData({...formData, additionalRequirements: e.target.value})}
                  placeholder="Any other specific requirements, integrations, or questions..."
                  rows={3}
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                disabled={isSubmitting}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-full transition-all duration-300 hover:scale-105"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Project Request'}
                <Send className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectRequestForm;
