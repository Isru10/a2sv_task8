'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SingleCard from '@/app/components/SingleCard';
import { useGetJobsQuery } from '@/app/service/jobListing';
import { FaChevronDown } from 'react-icons/fa';


export default function LandingPage() {
  const { 
    data: jobs, 
    isLoading, 
    isSuccess, 
    isError,   
    error      
  } = useGetJobsQuery();
  
  const tagColors = ['teal', 'yellow', 'indigo', 'rose', 'sky'];

  let content;
  if (isLoading) {
    content = <div className="text-center text-gray-500">Loading opportunities...</div>;
  } else if (isSuccess && jobs) {
    content = jobs.map((job) => {
      const formattedTags = job.categories.slice(0, 2).map((category, index) => ({
        label: category,
        type: (index === 0 ? 'filled' : 'outlined') as 'filled' | 'outlined',
        color: tagColors[index % tagColors.length],
      }));
      
      return (
        <Link href={`/SinglePage/${job.id}`} key={job.id}>
          <SingleCard
            title={job.title}
            company={job.orgName}
            location={job.location.join(', ')}
            description={job.description}
            logo={<Image src={job.logoUrl || '/vercel.svg'} alt={`${job.orgName} logo`} width={40} height={40} className="object-contain w-8 h-8"/>}
            tags={formattedTags}
          />
        </Link>
      );
    });
  } else if (isError) {
    console.error(error);
    content = <div className="text-center text-red-500">Failed to load opportunities. Please try again later.</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="container mx-auto max-w-5xl px-4 py-12">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Opportunities</h1>
            <p className="text-sm text-gray-500 mt-1">
              {isSuccess && jobs ? `Showing ${jobs.length} results` : '...'}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Sort by:</span>
            <button className="flex items-center gap-1 font-semibold text-gray-800">Most relevant <FaChevronDown /></button>
          </div>
        </header>

        <main className="flex flex-col gap-6">
          {content}
        </main>
      </div>
    </div>
  );
}