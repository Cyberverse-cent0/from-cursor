"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Video, Phone, CheckCircle } from "lucide-react";

export function BookingSystem() {
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    {
      id: "clinical",
      title: "Clinical Psychology",
      description: "Individual psychotherapy and counseling",
      duration: "50 minutes",
      price: "KES 3,500"
    },
    {
      id: "consulting",
      title: "Organizational Consulting",
      description: "Corporate and institutional consulting",
      duration: "60 minutes",
      price: "KES 7,500"
    },
    {
      id: "research",
      title: "Research Consultation",
      description: "Research design and methodology support",
      duration: "45 minutes",
      price: "KES 5,000"
    },
    {
      id: "education",
      title: "Educational Programs",
      description: "Training and workshop consultation",
      duration: "30 minutes",
      price: "Free consultation"
    }
  ];

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate booking submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <Card className="p-8 text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
        <p className="text-muted-foreground mb-4">
          Thank you for booking a consultation. We'll send you a confirmation email shortly with the meeting details.
        </p>
        <div className="space-y-2 text-sm bg-gray-50 p-4 rounded-lg">
          <p><strong>Service:</strong> {services.find(s => s.id === selectedService)?.title}</p>
          <p><strong>Date:</strong> {selectedDate}</p>
          <p><strong>Time:</strong> {selectedTime}</p>
          <p><strong>Name:</strong> {formData.name}</p>
        </div>
        <Button 
          onClick={() => window.location.href = "/"}
          className="mt-4"
        >
          Return to Homepage
        </Button>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Book a Consultation</h2>
        <p className="text-muted-foreground">
          Schedule a session with Dr. Stephen Asatsa for expert psychological guidance and support.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Service Selection */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Select Service</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <Card
                key={service.id}
                className={`p-4 cursor-pointer transition-all ${
                  selectedService === service.id
                    ? "border-blue-500 bg-blue-50"
                    : "hover:border-gray-300"
                }`}
                onClick={() => setSelectedService(service.id)}
              >
                <div className="space-y-2">
                  <h4 className="font-semibold">{service.title}</h4>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{service.price}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Date and Time Selection */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-semibold mb-4">Select Date</h3>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Select Time</h3>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  type="button"
                  variant={selectedTime === time ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTime(time)}
                  className="text-xs"
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="p-3 border rounded-lg"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="p-3 border rounded-lg"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="p-3 border rounded-lg"
              required
            />
            <select
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              className="p-3 border rounded-lg"
            >
              <option value="">Consultation Type</option>
              <option value="in-person">In-Person</option>
              <option value="virtual">Virtual (Video)</option>
              <option value="phone">Phone Call</option>
            </select>
          </div>
          <textarea
            placeholder="Additional notes or specific concerns..."
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            className="w-full p-3 border rounded-lg mt-4"
            rows={3}
          />
        </div>

        {/* Consultation Method */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Consultation Method</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="p-4 text-center cursor-pointer hover:border-blue-500 transition-colors">
              <Video className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <h4 className="font-semibold">Virtual Session</h4>
              <p className="text-sm text-muted-foreground">Video consultation</p>
            </Card>
            <Card className="p-4 text-center cursor-pointer hover:border-blue-500 transition-colors">
              <Phone className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <h4 className="font-semibold">Phone Call</h4>
              <p className="text-sm text-muted-foreground">Telephone consultation</p>
            </Card>
            <Card className="p-4 text-center cursor-pointer hover:border-blue-500 transition-colors">
              <Users className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <h4 className="font-semibold">In-Person</h4>
              <p className="text-sm text-muted-foreground">Face-to-face meeting</p>
            </Card>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <Button
            type="submit"
            disabled={!selectedService || !selectedDate || !selectedTime || isSubmitting}
            size="lg"
            className="px-8"
          >
            {isSubmitting ? "Processing..." : "Confirm Booking"}
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            You will receive a confirmation email with meeting details
          </p>
        </div>
      </form>
    </div>
  );
}
