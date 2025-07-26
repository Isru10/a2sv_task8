import React from 'react';
type SingleCardProps = {
  logo: React.ReactNode;
  title: string;
  company: string;
  location: string;
  description: string;
  tags: { label: string; type: 'filled' | 'outlined'; color: string }[];
};

const getTagClasses = (type: 'filled' | 'outlined', color: string) => {
  if (type === 'filled') {
   
    return `bg-${color}-100 text-${color}-800`;
  }
  return `bg-white text-${color}-700 border border-${color}-400`;
};

const SingleCard = ({ logo, title, company, location, description, tags }: SingleCardProps) => {
  return (

    <div className="bg-white rounded-3xl p-8 shadow-lg w-full">
      

      <div className="flex items-center gap-4">
        <div className="bg-yellow-400 rounded-full p-3 flex items-center justify-center flex-shrink-0">
          {logo}
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {title}
          </h2>
          <p className="text-sm text-gray-500">
            {company} • {location}
          </p>
        </div>
      </div>

      <p className="mt-6 text-gray-700 leading-relaxed line-clamp-3">
        {description}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {tags.map((tag, index) => (
          <React.Fragment key={index}>
            <span className={`text-sm font-medium px-4 py-1.5 rounded-full ${getTagClasses(tag.type, tag.color)}`}>
              {tag.label}
            </span>
            {index === 0 && tags.length > 1 && <div className="w-px h-6 bg-gray-200"></div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SingleCard;