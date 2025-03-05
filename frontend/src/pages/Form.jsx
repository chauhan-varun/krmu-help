import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

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
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
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
          setSubmittedPhone(formData.phone);
          setIsSubmitted(true);
          setFormData({
            name: '',
            expectedTime: '',
            techStack: '',
            amount: '150',
            phone: ''
          });
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to submit form');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrors({ submit: error.message || 'Failed to submit form. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const [submittedPhone, setSubmittedPhone] = useState('');

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-4 sm:p-8 space-y-4">
          <h2 className="text-2xl font-bold text-green-500">Thank You!</h2>
          <p className="text-gray-300">Your form has been submitted successfully. We will reach out to you soon on your provided phone number +91{submittedPhone}.</p>
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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
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
        {errors.submit && (
          <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{errors.submit}</span>
          </div>
        )}
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
            disabled={isLoading}
            className={`w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg transition-colors ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700'}`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </div>
            ) : 'Submit'}
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default Form;