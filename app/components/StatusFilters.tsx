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
    <div className="sticky top-0 z-20 -mx-4 flex gap-3 overflow-x-auto border-b bg-zinc-50/95 px-4 py-3 backdrop-blur">
      {STATUS_FILTERS.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`shrink-0 rounded-lg mr-2.5 cursor-pointer rounded-[5px] p-2.5 hover:bg-zinc-100 hover:text-black ${
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
