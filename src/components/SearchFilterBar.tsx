interface SearchFilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
}

export default function SearchFilterBar({ 
  searchTerm, 
  setSearchTerm, 
  filterStatus, 
  setFilterStatus 
}: SearchFilterBarProps) {
  return (
    <div className="search-filter-bar">
      <input
        type="text"
        placeholder="Search accounts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select 
        value={filterStatus} 
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="all">All Accounts</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}