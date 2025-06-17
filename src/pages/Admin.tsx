import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, MessageCircle, FileText, Upload, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import CMSLogin from '@/components/CMSLogin';

const Admin = () => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [portfolioItems, setPortfolioItems] = useState([]);

  const [categories] = useState([
    'Educational',
    'Hospitality',
    'Restaurant',
    'Small Business',
    'E-commerce',
    'Healthcare',
    'Real Estate',
    'Technology'
  ]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      business: 'Restaurant',
      message: 'I need a website for my restaurant',
      date: '2024-01-15',
      type: 'contact'
    }
  ]);

  const [quotes, setQuotes] = useState([
    {
      id: 1,
      name: 'Jane Smith',
      email: 'jane@example.com',
      business: 'Hotel',
      message: 'Looking for a booking system for our hotel',
      date: '2024-01-16',
      type: 'quote'
    }
  ]);

  const [newPortfolio, setNewPortfolio] = useState({
    title: '',
    category: '',
    image: '',
    description: '',
    tags: ''
  });

  const [editingPortfolio, setEditingPortfolio] = useState(null);

  // Content management state
  const [siteContent, setSiteContent] = useState({
    companyEmail: 'contact@devotedzen.com',
    phoneNumber: '9848923375',
    address: 'Kohalpur -2, Manakamana Chowk, Bankle, Nepal',
    heroTitle: 'DevotedZen Web',
    heroDescription: 'We create stunning websites for schools, hotels, restaurants, and small businesses. Transform your digital presence with our expert web design and development services.',
    aboutTitle: 'About DevotedZen Web',
    aboutDescription: 'We are passionate web designers and developers dedicated to creating exceptional digital experiences for businesses of all sizes.',
    servicesTitle: 'Our Services',
    servicesDescription: 'We offer comprehensive web solutions tailored to your business needs.',
    portfolioTitle: 'Our Portfolio',
    portfolioDescription: 'Discover some of our recent projects and see how we\'ve helped businesses across different industries establish their online presence.',
    pricingTitle: 'Website Pricing Plans',
    pricingDescription: 'Choose the perfect plan for your business needs. Limited time 18% opening offer!',
    contactTitle: 'Get In Touch',
    contactDescription: 'Ready to start your project? Contact us today for a free consultation.'
  });

  useEffect(() => {
    // Load data from localStorage
    const savedPortfolio = localStorage.getItem('portfolioItems');
    const savedContent = localStorage.getItem('siteContent');
    
    if (savedPortfolio) {
      setPortfolioItems(JSON.parse(savedPortfolio));
    }
    
    if (savedContent) {
      setSiteContent(JSON.parse(savedContent));
    }
  }, []);

  if (!isLoggedIn) {
    return <CMSLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setNewPortfolio({ ...newPortfolio, image: imageUrl });
        toast({
          title: "Image Uploaded",
          description: "Image has been uploaded successfully.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPortfolio = () => {
    if (newPortfolio.title && newPortfolio.category) {
      const portfolio = {
        id: Date.now(),
        ...newPortfolio,
        tags: newPortfolio.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };
      const updatedPortfolio = [...portfolioItems, portfolio];
      setPortfolioItems(updatedPortfolio);
      localStorage.setItem('portfolioItems', JSON.stringify(updatedPortfolio));
      setNewPortfolio({ title: '', category: '', image: '', description: '', tags: '' });
      toast({
        title: "Portfolio Added",
        description: "New portfolio item has been added successfully.",
      });
    }
  };

  const handleEditPortfolio = (item) => {
    setEditingPortfolio(item);
    setNewPortfolio({
      title: item.title,
      category: item.category,
      image: item.image,
      description: item.description,
      tags: item.tags ? item.tags.join(', ') : ''
    });
  };

  const handleUpdatePortfolio = () => {
    if (editingPortfolio) {
      const updatedPortfolio = {
        ...editingPortfolio,
        ...newPortfolio,
        tags: newPortfolio.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };
      const updatedItems = portfolioItems.map(item => 
        item.id === editingPortfolio.id ? updatedPortfolio : item
      );
      setPortfolioItems(updatedItems);
      localStorage.setItem('portfolioItems', JSON.stringify(updatedItems));
      setEditingPortfolio(null);
      setNewPortfolio({ title: '', category: '', image: '', description: '', tags: '' });
      toast({
        title: "Portfolio Updated",
        description: "Portfolio item has been updated successfully.",
      });
    }
  };

  const handleDeletePortfolio = (id) => {
    const updatedItems = portfolioItems.filter(item => item.id !== id);
    setPortfolioItems(updatedItems);
    localStorage.setItem('portfolioItems', JSON.stringify(updatedItems));
    toast({
      title: "Portfolio Deleted",
      description: "Portfolio item has been deleted successfully.",
    });
  };

  const handleDeleteMessage = (id, type) => {
    if (type === 'contact') {
      setMessages(messages.filter(msg => msg.id !== id));
    } else {
      setQuotes(quotes.filter(quote => quote.id !== id));
    }
    toast({
      title: "Message Deleted",
      description: "Message has been deleted successfully.",
    });
  };

  const handleSaveContent = () => {
    localStorage.setItem('siteContent', JSON.stringify(siteContent));
    toast({
      title: "Content Saved",
      description: "Website content has been updated successfully.",
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">DevotedZen Web CMS</h1>
            <p className="text-gray-600 text-sm sm:text-base">Manage your website content and portfolio</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="self-start sm:self-auto">
            Logout
          </Button>
        </div>

        <Tabs defaultValue="portfolio" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
            <TabsTrigger value="portfolio" className="text-xs sm:text-sm py-2">Portfolio</TabsTrigger>
            <TabsTrigger value="content" className="text-xs sm:text-sm py-2">Content</TabsTrigger>
            <TabsTrigger value="messages" className="text-xs sm:text-sm py-2">Messages</TabsTrigger>
            <TabsTrigger value="quotes" className="text-xs sm:text-sm py-2">Quotes</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                  {editingPortfolio ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <Input
                    placeholder="Project Title"
                    value={newPortfolio.title}
                    onChange={(e) => setNewPortfolio({ ...newPortfolio, title: e.target.value })}
                  />
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={newPortfolio.category}
                    onChange={(e) => setNewPortfolio({ ...newPortfolio, category: e.target.value })}
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Upload Image</label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
                        <Upload className="h-4 w-4" />
                        Upload Image
                      </div>
                    </label>
                    {newPortfolio.image && (
                      <div className="flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-500">Image uploaded</span>
                      </div>
                    )}
                  </div>
                  {newPortfolio.image && (
                    <img src={newPortfolio.image} alt="Preview" className="w-24 h-18 sm:w-32 sm:h-24 object-cover rounded-md" />
                  )}
                </div>
                
                <Textarea
                  placeholder="Project Description"
                  value={newPortfolio.description}
                  onChange={(e) => setNewPortfolio({ ...newPortfolio, description: e.target.value })}
                  rows={3}
                />
                <Input
                  placeholder="Tags (comma separated)"
                  value={newPortfolio.tags}
                  onChange={(e) => setNewPortfolio({ ...newPortfolio, tags: e.target.value })}
                />
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button 
                    onClick={editingPortfolio ? handleUpdatePortfolio : handleAddPortfolio}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    {editingPortfolio ? 'Update' : 'Add'} Portfolio Item
                  </Button>
                  {editingPortfolio && (
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setEditingPortfolio(null);
                        setNewPortfolio({ title: '', category: '', image: '', description: '', tags: '' });
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {portfolioItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-36 sm:h-48 object-cover" />
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" onClick={() => handleEditPortfolio(item)}>
                          <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeletePortfolio(item.id)}>
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    </div>
                    <h3 className="font-bold text-sm sm:text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm mb-2 line-clamp-2">{item.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {item.tags && item.tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                  Website Content Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Company Email</label>
                    <Input 
                      value={siteContent.companyEmail}
                      onChange={(e) => setSiteContent({...siteContent, companyEmail: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <Input 
                      value={siteContent.phoneNumber}
                      onChange={(e) => setSiteContent({...siteContent, phoneNumber: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Address</label>
                  <Textarea 
                    value={siteContent.address}
                    onChange={(e) => setSiteContent({...siteContent, address: e.target.value})}
                    rows={2}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Hero Section Title</label>
                  <Input 
                    value={siteContent.heroTitle}
                    onChange={(e) => setSiteContent({...siteContent, heroTitle: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Hero Section Description</label>
                  <Textarea 
                    value={siteContent.heroDescription}
                    onChange={(e) => setSiteContent({...siteContent, heroDescription: e.target.value})}
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">About Section Title</label>
                  <Input 
                    value={siteContent.aboutTitle}
                    onChange={(e) => setSiteContent({...siteContent, aboutTitle: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">About Section Description</label>
                  <Textarea 
                    value={siteContent.aboutDescription}
                    onChange={(e) => setSiteContent({...siteContent, aboutDescription: e.target.value})}
                    rows={3}
                  />
                </div>
                <Button onClick={handleSaveContent} className="bg-red-500 hover:bg-red-600">
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  Contact Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <Card key={message.id}>
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                          <div>
                            <h4 className="font-semibold text-sm sm:text-base">{message.name}</h4>
                            <p className="text-xs sm:text-sm text-gray-600">{message.email}</p>
                            <Badge variant="outline" className="text-xs mt-1">{message.business}</Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm text-gray-500">{message.date}</span>
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteMessage(message.id, 'contact')}>
                              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-gray-700 text-xs sm:text-sm">{message.message}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quotes" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                  Quote Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quotes.map((quote) => (
                    <Card key={quote.id}>
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                          <div>
                            <h4 className="font-semibold text-sm sm:text-base">{quote.name}</h4>
                            <p className="text-xs sm:text-sm text-gray-600">{quote.email}</p>
                            <Badge variant="outline" className="text-xs mt-1">{quote.business}</Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm text-gray-500">{quote.date}</span>
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteMessage(quote.id, 'quote')}>
                              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-gray-700 text-xs sm:text-sm">{quote.message}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
