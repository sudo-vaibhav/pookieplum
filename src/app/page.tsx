import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Lock, Sparkles } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Heart className="h-20 w-20 text-pink-500 fill-pink-500" />
              <Heart className="h-10 w-10 text-pink-300 fill-pink-300 absolute -top-2 -right-2" />
              <Sparkles className="h-6 w-6 text-yellow-400 fill-yellow-400 absolute -bottom-1 -left-1" />
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-6">
            PookiePlum
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-600 mb-4">
            The sweetest way to stay connected with your special someone
          </p>
          
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            Private, secure, and adorable messaging designed just for couples. Share your love story with cute themes, couple goals, and intimate conversations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-lg px-8 py-6">
              Start Your Love Story
            </Button>
            <Button size="lg" variant="outline" className="border-pink-300 text-pink-600 hover:bg-pink-50 text-lg px-8 py-6">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-pink-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Made for Love
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to keep your relationship strong and fun
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Private & Secure</h3>
              <p className="text-gray-600">End-to-end encryption ensures your sweet conversations stay between you two</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cute Themes</h3>
              <p className="text-gray-600">Adorable chat themes and stickers designed specifically for couples</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Relationship Goals</h3>
              <p className="text-gray-600">Track anniversaries, set couple goals, and celebrate milestones together</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-pink-600 mb-2">10K+</div>
              <div className="text-gray-600">Happy Couples</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">1M+</div>
              <div className="text-gray-600">Love Messages</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Fall in Love?
          </h2>
          <p className="text-xl text-pink-100 mb-8">
            Join thousands of couples who trust PookiePlum with their love stories
          </p>
          <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100 text-lg px-8 py-6">
            Download PookiePlum
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Heart className="h-8 w-8 text-pink-500 fill-pink-500" />
              <span className="text-2xl font-bold text-white">PookiePlum</span>
            </div>
            
            <div className="flex space-x-6 text-gray-400">
              <a href="#privacy" className="hover:text-pink-400 transition-colors">Privacy</a>
              <a href="#terms" className="hover:text-pink-400 transition-colors">Terms</a>
              <a href="#support" className="hover:text-pink-400 transition-colors">Support</a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PookiePlum. Made with 💕 for couples everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
