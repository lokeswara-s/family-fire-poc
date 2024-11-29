import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import FamilyProgress from '../components/FamilyProgress';
import InvestmentStream from '../components/InvestmentStream';
import { TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
          Your Family's Path to
          <span className="text-indigo-600 block sm:inline"> Financial Freedom</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:text-xl text-gray-500">
          Plan, track, and achieve financial independence together. Set family goals, monitor investments, and create a legacy of financial wellness.
        </p>
        <div className="mt-5 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/individual-goals"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Individual Goals
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            to="/family-goals"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            Family Goals
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Family Progress Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Family Progress</h2>
          <Link to="/family-goals" className="text-indigo-600 hover:text-indigo-700 font-medium">
            View Details
          </Link>
        </div>
        <FamilyProgress />
      </section>

      {/* Investment Streams */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Investment Streams</h2>
          <button className="text-indigo-600 hover:text-indigo-700 font-medium">
            Manage Investments
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InvestmentStream
            title="Stock Portfolio"
            amount={250000}
            growth={12.5}
            icon={<TrendingUp className="h-6 w-6" />}
          />
          <InvestmentStream
            title="Real Estate"
            amount={500000}
            growth={8.3}
            icon={<TrendingUp className="h-6 w-6" />}
          />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;