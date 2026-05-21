"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle, BookOpen, Users, Award } from "lucide-react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const topics = [
    { id: "research", label: "Research Updates", icon: BookOpen, description: "Latest findings and publications" },
    { id: "workshops", label: "Workshops & Training", icon: Users, description: "Professional development opportunities" },
    { id: "awards", label: "Awards & Recognition", icon: Award, description: "Professional achievements and honors" }
  ];

  const handleTopicToggle = (topicId: string) => {
    setSelectedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate newsletter subscription
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubscribed(true);
  };

  if (isSubscribed) {
    return (
      <Card className="p-8 text-center max-w-2xl mx-auto bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Successfully Subscribed!</h3>
        <p className="text-muted-foreground mb-4">
          Welcome to our community! Check your email for a confirmation message and exclusive resources.
        </p>
        <div className="text-sm text-green-700 bg-green-100 p-3 rounded-lg">
          <p className="font-medium">What's next?</p>
          <ul className="text-left mt-2 space-y-1">
            <li>• Confirm your email address</li>
            <li>• Download our free research guide</li>
            <li>• Receive weekly insights and updates</li>
          </ul>
        </div>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Join our community to receive the latest research insights, professional development opportunities, and exclusive content from Dr. Stephen Asatsa.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Newsletter Benefits */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">What You'll Receive</h3>
            <div className="space-y-4">
              {topics.map((topic) => {
                const Icon = topic.icon;
                return (
                  <div
                    key={topic.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedTopics.includes(topic.id)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleTopicToggle(topic.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        selectedTopics.includes(topic.id) ? "bg-blue-100" : "bg-gray-100"
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          selectedTopics.includes(topic.id) ? "text-blue-600" : "text-gray-600"
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{topic.label}</h4>
                        <p className="text-sm text-muted-foreground">{topic.description}</p>
                      </div>
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        selectedTopics.includes(topic.id)
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}>
                        {selectedTopics.includes(topic.id) && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <h3 className="text-xl font-semibold mb-4">Exclusive Subscriber Benefits</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Free Research Guide</p>
                  <p className="text-xs text-muted-foreground">PDF download on cultural psychology</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Early Access</p>
                  <p className="text-xs text-muted-foreground">First notification of workshops</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Award className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">Expert Insights</p>
                  <p className="text-xs text-muted-foreground">Weekly psychology tips</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium">No Spam</p>
                  <p className="text-xs text-muted-foreground">Unsubscribe anytime</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Signup Form */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Join Our Community</h3>
              <p className="text-sm text-muted-foreground">
                {selectedTopics.length > 0 
                  ? `Selected ${selectedTopics.length} topic${selectedTopics.length > 1 ? 's' : ''}`
                  : "Select topics below"
                }
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>

              <div className="text-xs text-muted-foreground">
                <p>By subscribing, you agree to receive our weekly newsletter and occasional promotional emails. You can unsubscribe at any time.</p>
              </div>

              <Button
                type="submit"
                disabled={!email || isSubmitting}
                size="lg"
                className="w-full"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe Now"}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Join 1,000+ professionals</p>
                <div className="flex -space-x-2 justify-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white" />
                  <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white" />
                  <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white" />
                  <div className="w-8 h-8 bg-orange-500 rounded-full border-2 border-white" />
                  <div className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-xs font-medium">+5</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
