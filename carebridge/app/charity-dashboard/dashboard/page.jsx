'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  return (
    <div className="p-6 min-h-screen bg-gray-100 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Charity Dashboard</h1>
      
      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="p-4 shadow-lg bg-white text-center">
          <h2 className="text-xl font-semibold">Total Donations</h2>
          <p className="text-2xl font-bold text-green-600">$50,000</p>
        </Card>
        <Card className="p-4 shadow-lg bg-white text-center">
          <h2 className="text-xl font-semibold">Active Beneficiaries</h2>
          <p className="text-2xl font-bold text-blue-600">120</p>
        </Card>
        <Card className="p-4 shadow-lg bg-white text-center">
          <h2 className="text-xl font-semibold">Impact Stories</h2>
          <p className="text-2xl font-bold text-purple-600">35</p>
        </Card>
      </div>
      
      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/dashboard">
          <Card className="p-4 shadow-lg bg-white hover:bg-gray-200 cursor-pointer text-center">
            <h2 className="text-lg font-semibold">Dashboard</h2>
          </Card>
        </Link>
        <Link href="/beneficiaries">
          <Card className="p-4 shadow-lg bg-white hover:bg-gray-200 cursor-pointer text-center">
            <h2 className="text-lg font-semibold">Beneficiaries</h2>
          </Card>
        </Link>
        <Link href="/impact-stories">
          <Card className="p-4 shadow-lg bg-white hover:bg-gray-200 cursor-pointer text-center">
            <h2 className="text-lg font-semibold">Impact Stories</h2>
          </Card>
        </Link>
        <Link href="/manage-donations">
          <Card className="p-4 shadow-lg bg-white hover:bg-gray-200 cursor-pointer text-center">
            <h2 className="text-lg font-semibold">Manage Donations</h2>
          </Card>
        </Link>
        <Link href="/settings">
          <Card className="p-4 shadow-lg bg-white hover:bg-gray-200 cursor-pointer text-center">
            <h2 className="text-lg font-semibold">Settings</h2>
          </Card>
        </Link>
      </div>

      {/* Call to Action */}
      <div className="mt-6 text-center">
        <Button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
          Add New Impact Story
        </Button>
      </div>
    </div>
  );
};

export default HomePage;