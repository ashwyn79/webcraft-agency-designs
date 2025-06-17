
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Lock, Mail } from 'lucide-react';

interface CMSLoginProps {
  onLogin: () => void;
}

const CMSLogin = ({ onLogin }: CMSLoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Default credentials (changeable)
  const validCredentials = {
    email: 'dhruvarajthakuri@gmail.com',
    password: '@shwin2059'
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (email === validCredentials.email && password === validCredentials.password) {
        toast({
          title: "Login Successful",
          description: "Welcome to DevotedZen Web CMS",
        });
        onLogin();
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white border-red-500 border-2">
        <CardHeader className="text-center">
          <img 
            src="/lovable-uploads/c237c354-fb60-431c-acd3-e1182e9cc834.png" 
            alt="DevotedZen Web Logo" 
            className="h-12 w-auto mx-auto mb-4"
          />
          <CardTitle className="text-2xl font-bold text-black">CMS Login</CardTitle>
          <p className="text-gray-600">Access your content management system</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-black">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-red-500"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-black">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-red-500"
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-red-500 hover:bg-red-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CMSLogin;
