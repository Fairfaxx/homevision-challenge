import { StatusFilter } from '../page';

interface Props {
  selectedFilter: StatusFilter;
  onFilterChange: (filter: StatusFilter) => void;
}

const STATUS_FILTERS: StatusFilter[] = [
  'all',
  'critical',
  'major',
  'minor',
  'resolved',
];

const StatusFilters = ({ selectedFilter, onFilterChange }: Props) => {
  return (
    <div className="sticky top-0 z-20 -mx-4 grid grid-cols-5 gap-1.5 border-b bg-zinc-50/95 px-3 py-2 backdrop-blur sm:flex sm:gap-3 sm:px-4 sm:py-3">
      {STATUS_FILTERS.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`w-full cursor-pointer rounded-md px-2 py-2 text-xs font-medium hover:bg-zinc-100 hover:text-black sm:w-auto sm:shrink-0 sm:px-3 sm:py-2.5 sm:text-sm ${
            selectedFilter === filter
              ? 'bg-black text-white'
              : 'bg-white text-black'
          }`}
        >
          {filter.charAt(0).toUpperCase()}
          {filter.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default StatusFilters;
