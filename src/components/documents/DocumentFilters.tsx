'use client';

interface DocumentFiltersState {
  category: string;
  search: string;
}

interface DocumentFiltersProps {
  filters: DocumentFiltersState;
  onChange: (filters: DocumentFiltersState) => void;
}

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'contracts', label: 'Contracts' },
  { value: 'policies', label: 'Company Policies' },
  { value: 'reports', label: 'Reports' },
  { value: 'certificates', label: 'Certificates' },
  { value: 'hr-docs', label: 'HR Documents' },
  { value: 'technical', label: 'Technical Documentation' },
];

export default function DocumentFilters({ filters, onChange }: DocumentFiltersProps) {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_220px]">
        <input
          type="search"
          value={filters.search}
          onChange={(event) => onChange({ ...filters, search: event.target.value })}
          placeholder="Search documents"
          className="w-full rounded-lg border px-3 py-2"
        />
        <select
          value={filters.category}
          onChange={(event) => onChange({ ...filters, category: event.target.value })}
          className="w-full rounded-lg border px-3 py-2"
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}