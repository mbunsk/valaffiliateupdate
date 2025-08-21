import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ExternalLink, BarChart3, Clock, TrendingUp } from "lucide-react";

interface LinkClick {
  id: string;
  company: string;
  linkType: string;
  url: string;
  clickCount: number;
  lastClicked: string;
  createdAt: string;
}

interface CompanyStats {
  company: string;
  logoClicks: number;
  buttonClicks: number;
  totalClicks: number;
  logoUrl: string;
  buttonUrl: string;
  lastClicked?: string;
}

interface ProductClick {
  product: string;
  location: string;
  clickCount: number;
  lastClicked: string;
  totalInputs: number;
  uniqueEmails: number;
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<LinkClick[]>([]);
  const [productStats, setProductStats] = useState<ProductClick[]>([]);
  const [loadingStats, setLoadingStats] = useState(false);
  const [activeTab, setActiveTab] = useState<'partners' | 'products'>('products');
  const { toast } = useToast();

  // Check if already logged in
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("/api/admin/link-stats");
      if (response.ok) {
        setIsLoggedIn(true);
        fetchStats();
      }
    } catch (error) {
      // Not logged in, which is fine
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setIsLoggedIn(true);
        setPassword("");
        fetchStats();
        toast({
          title: "Login successful",
          description: "Welcome to the admin dashboard",
        });
      } else {
        toast({
          title: "Login failed",
          description: "Invalid password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to login",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      const [linkResponse, productResponse] = await Promise.all([
        fetch("/api/admin/link-stats"),
        fetch("/api/admin/product-stats")
      ]);
      
      if (linkResponse.ok) {
        const linkData = await linkResponse.json();
        setStats(linkData);
      }
      
      if (productResponse.ok) {
        const productData = await productResponse.json();
        setProductStats(productData);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch stats",
        variant: "destructive",
      });
    } finally {
      setLoadingStats(false);
    }
  };

  // Process stats into company groups
  const companyStats: CompanyStats[] = ["bubble", "beehiiv", "liveplan", "gamma", "miro", "notion", "augment"].map(company => {
    const logoStat = stats.find(s => s.company === company && s.linkType === "logo");
    const buttonStat = stats.find(s => s.company === company && s.linkType === "button");
    
    const logoClicks = logoStat?.clickCount || 0;
    const buttonClicks = buttonStat?.clickCount || 0;
    const totalClicks = logoClicks + buttonClicks;
    
    const lastClickedLogo = logoStat?.lastClicked ? new Date(logoStat.lastClicked) : null;
    const lastClickedButton = buttonStat?.lastClicked ? new Date(buttonStat.lastClicked) : null;
    const lastClicked = [lastClickedLogo, lastClickedButton]
      .filter(Boolean)
      .sort((a, b) => b!.getTime() - a!.getTime())[0];

    return {
      company: company.charAt(0).toUpperCase() + company.slice(1),
      logoClicks,
      buttonClicks,
      totalClicks,
      logoUrl: logoStat?.url || "",
      buttonUrl: buttonStat?.url || "",
      lastClicked: lastClicked?.toLocaleDateString(),
    };
  }).sort((a, b) => b.totalClicks - a.totalClicks);

  const totalClicks = companyStats.reduce((sum, stat) => sum + stat.totalClicks, 0);
  const topCompany = companyStats[0];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">ValidatorAI Analytics Dashboard</h1>
            <p className="text-muted-foreground mt-1">Track product engagement and partner link performance</p>
          </div>
          <Button 
            onClick={fetchStats} 
            disabled={loadingStats}
            variant="outline"
          >
            {loadingStats ? "Refreshing..." : "Refresh Data"}
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg mb-8 w-fit">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'products' 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Product Clicks
          </button>
          <button
            onClick={() => setActiveTab('partners')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'partners' 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Partner Links
          </button>
        </div>

        {/* Product Analytics */}
        {activeTab === 'products' && (
          <>
            {/* Product Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <BarChart3 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Product Clicks</p>
                      <p className="text-2xl font-bold">{productStats.reduce((sum, stat) => sum + stat.clickCount, 0)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Most Popular Product</p>
                      <p className="text-2xl font-bold">{productStats[0]?.product || "None"}</p>
                      <p className="text-xs text-muted-foreground">{productStats[0]?.clickCount || 0} clicks</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total User Inputs</p>
                      <p className="text-2xl font-bold">{productStats.reduce((sum, stat) => sum + stat.totalInputs, 0)}</p>
                      <p className="text-xs text-muted-foreground">form submissions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Product Performance Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Product Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loadingStats ? (
                  <div className="text-center py-8">
                    <p>Loading product analytics...</p>
                  </div>
                ) : productStats.length > 0 ? (
                  <div className="space-y-4">
                    {productStats.map((stat, index) => (
                      <div key={`${stat.product}-${stat.location}`} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <span className="text-sm font-bold text-primary">#{index + 1}</span>
                          </div>
                          <div>
                            <h3 className="font-medium">{stat.product}</h3>
                            <p className="text-sm text-muted-foreground">Location: {stat.location}</p>
                            <p className="text-xs text-muted-foreground">Last clicked: {new Date(stat.lastClicked).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Clicks</p>
                              <p className="font-medium">{stat.clickCount}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Inputs</p>
                              <p className="font-medium">{stat.totalInputs}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Emails</p>
                              <p className="font-medium">{stat.uniqueEmails}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No product clicks tracked yet. Product engagement will appear here once users interact with the research products.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}

        {/* Partner Analytics */}
        {activeTab === 'partners' && (
          <>
            {/* Partner Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Clicks</p>
                  <p className="text-2xl font-bold">{totalClicks}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Top Partner</p>
                  <p className="text-2xl font-bold">{topCompany?.company || "None"}</p>
                  <p className="text-xs text-muted-foreground">{topCompany?.totalClicks} clicks</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Partners</p>
                  <p className="text-2xl font-bold">{companyStats.filter(s => s.totalClicks > 0).length}</p>
                  <p className="text-xs text-muted-foreground">of 6 partners</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Company Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Partner Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {companyStats.map((company, index) => (
                <div 
                  key={company.company}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary to-accent text-white rounded-full font-bold">
                      #{index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{company.company}</h3>
                      {company.lastClicked && (
                        <p className="text-sm text-muted-foreground">Last clicked: {company.lastClicked}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Logo Clicks */}
                    <div className="text-center">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary">Logo</Badge>
                        {company.logoUrl && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => window.open(company.logoUrl, '_blank')}
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                      <p className="text-2xl font-bold text-blue-600">{company.logoClicks}</p>
                      <p className="text-xs text-muted-foreground">clicks</p>
                    </div>

                    {/* Button Clicks */}
                    <div className="text-center">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary">Button</Badge>
                        {company.buttonUrl && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => window.open(company.buttonUrl, '_blank')}
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                      <p className="text-2xl font-bold text-green-600">{company.buttonClicks}</p>
                      <p className="text-xs text-muted-foreground">clicks</p>
                    </div>

                    {/* Total */}
                    <div className="text-center">
                      <Badge className="mb-1">Total</Badge>
                      <p className="text-3xl font-bold text-primary">{company.totalClicks}</p>
                      <p className="text-xs text-muted-foreground">clicks</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalClicks === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No link clicks tracked yet.</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Clicks will appear here once users interact with the partner links.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
          </>
        )}
      </div>
    </div>
  );
}