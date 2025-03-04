import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function Form() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    expectedTime: '',
    techStack: '',
    amount: '150',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/submit-form`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            projectType: formData.techStack,
            timeline: formData.expectedTime,
            budget: formData.amount,
            description: `Phone: ${formData.phone}`,
          }),
        });

        if (response.ok) {
          // Form is valid and submitted successfully, show success message
          setIsSubmitted(true);
          // Reset form
          setFormData({
            name: '',
            expectedTime: '',
            techStack: '',
            amount: '150',
            phone: ''
          });
        } else {
          throw new Error('Failed to submit form');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrors({ submit: 'Failed to submit form. Please try again.' });
      }
    } else {
      setErrors(newErrors);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-4 sm:p-8 space-y-4">
          <h2 className="text-2xl font-bold text-green-500">Thank You!</h2>
          <p className="text-gray-300">Your form has been submitted successfully. We'll get back to you soon!</p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              navigate('/');
            }}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-4 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaArrowLeft className="text-xl" />
          </button>
          <h1 className="text-2xl font-bold text-white">Get Started</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Expected Completion Time */}
          <div>
            <label htmlFor="expectedTime" className="block text-gray-300 font-semibold mb-2">
              Expected Completion Time
            </label>
            <input
              type="text"
              id="expectedTime"
              name="expectedTime"
              value={formData.expectedTime}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-white placeholder-gray-400"
              placeholder="e.g., 2 weeks, 1 month"
            />
          </div>

          {/* Tech Stack Required */}
          <div>
            <label htmlFor="techStack" className="block text-gray-300 font-semibold mb-2">
              Tech Stack Required
            </label>
            <input
              type="text"
              id="techStack"
              name="techStack"
              value={formData.techStack}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-white placeholder-gray-400"
              placeholder="e.g., React, Node.js, MongoDB"
            />
            <p className="text-gray-400 text-sm mt-1">Note: If you haven't decided on the tech stack yet or are unsure, you can leave this field empty.</p>
          </div>

          {/* Amount Offered */}
          <div>
            <label htmlFor="amount" className="block text-gray-300 font-semibold mb-2">
              Amount Offered (₹)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              min="150"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-white"
            />
            <p className="text-gray-400 text-sm mt-1">Note: The final price may vary based on project complexity and timeline requirements.</p>
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-gray-300 font-semibold mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-white placeholder-gray-400 ${errors.phone ? 'border-red-500' : 'border-gray-600'}`}
              placeholder="Enter your 10-digit phone number"
            />
            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;