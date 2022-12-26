const filterList = [
  'all',
  'mine',
  'technology',
  'travel',
  'health',
  'sports',
  'music',
  'business',
  'news',
];

const FilterPost = ({ currentFilter, changeFilter }) => {
  const handleClick = filter => {
    console.log(filter);
    changeFilter(filter);
  };
  return (
    <div className='flex gap-2 flex-wrap mb-4'>
      {filterList.map(filter => {
        return (
          <button
            className={`${
              currentFilter === filter ? 'bg-black text-white' : 'bg-white text-black'
            } border border-black px-4 py-1`}
            key={filter}
            onClick={() => handleClick(filter)}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
};

export default FilterPost;
