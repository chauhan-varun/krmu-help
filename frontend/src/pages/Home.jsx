import { useNavigate } from 'react-router-dom';
import { FaRocket, FaBook, FaEnvelope, FaCheck, FaLightbulb } from 'react-icons/fa';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8 max-w-4xl bg-gray-900 min-h-screen text-white">
      <main className="space-y-4 sm:space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-2 sm:space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white flex items-center justify-center gap-2 flex-wrap">
            <FaRocket className="text-blue-400" />
            Affordable Website Development
          </h1>
          <p className="text-lg sm:text-xl text-gray-300">
            Starting at just <span className="font-bold text-blue-400">₹150</span>, get a
            <span className="font-bold"> fully responsive website</span> for your
            <span className="font-bold"> mini project, startup, or any idea!</span> Plus, get
            <span className="font-bold"> guidance on web development</span> from start to finish.
          </p>
        </section>

        {/* What You Get Section */}
        <section className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg border border-gray-700">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">What You Get:</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              'Custom Website Development – Tailored to your needs',
              'Fully Responsive Design – Works on mobile, tablets & desktops',
              'Modern Tech Stack: HTML, CSS, JavaScript, Node.js, Express, React, MongoDB',
              'Fast & Secure Websites – Optimized for speed and security',
              'User Authentication – Signup/Login system if required',
              'Database Integration – Store and manage data easily',
              'Admin Dashboard – Manage content & users (on request)',
              'SEO Friendly – Get better search rankings',
              'Deployment Assistance – Get your site live hassle-free'
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Guidance Section */}
        <section className="bg-gray-800 p-4 sm:p-6 rounded-lg border border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <FaBook className="text-blue-600 text-xl sm:text-2xl" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">Get Guidance for Web Development for FREE</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FaLightbulb className="text-yellow-500" />
              <p className="text-lg">
                <span className="font-bold">Confused about where to start?</span> I will personally
                <span className="font-bold"> help you learn how to build a website</span>, including:
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              {[
                'Which Tech Stack to Choose – Frontend, Backend, Database',
                'How to Develop & Deploy – Step-by-step guidance',
                'Best Practices & Tips – Writing clean & efficient code',
                'Project Setup & Hosting – Get your website live'
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Links Section */}
        <section className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <a
            href="https://x.com/varunchauhanx"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 sm:px-6 py-3 rounded-lg font-bold text-base sm:text-lg transition-colors border border-gray-700 hover:border-gray-600 w-full sm:w-auto"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            DM on X
          </a>
          <a
            href="https://github.com/chauhan-varun"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-bold text-lg transition-colors border border-gray-700 hover:border-gray-600"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            GitHub
          </a>
        </section>

        {/* CTA Section */}
        <section className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-xl text-blue-400">
            <FaEnvelope />
            <span className="font-bold">Get  Started now</span> by building your first project from scratch!
          </div>
          <button
            onClick={() => navigate('/form')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
          </button>
        </section>
      </main>
    </div>
  );
}

export default Home;