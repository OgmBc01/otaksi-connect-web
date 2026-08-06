'use client';

const documentCategories = [
  {
    title: 'Contracts',
    description: 'Client agreements, vendor contracts, and commercial documents.',
  },
  {
    title: 'Company Policies',
    description: 'Internal policies, governance material, and compliance references.',
  },
  {
    title: 'Reports',
    description: 'Operational, financial, and executive reporting documents.',
  },
  {
    title: 'Certificates',
    description: 'Accreditations, registrations, and official certification files.',
  },
  {
    title: 'HR Documents',
    description: 'Employment forms, onboarding packs, and people operations records.',
  },
  {
    title: 'Technical Documentation',
    description: 'Architecture notes, runbooks, SOPs, and implementation guides.',
  },
];

export default function DocumentCategoriesPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Document Categories</h1>
        <p className="mt-1 text-gray-600">Browse the categories used to organize company documents.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {documentCategories.map((category) => (
          <div key={category.title} className="rounded-lg bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">{category.title}</h2>
            <p className="mt-2 text-sm text-gray-600">{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}