import React, { useState, useEffect } from "react";
import ItemCard from "../components/ItemCard";
import ItemDetailCard from "../components/ItemDetailCard";
import { FaSearch } from "react-icons/fa";
import { HiOutlineHashtag } from "react-icons/hi";
import { client } from "../data/Client";

function HomePage() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [numItemsToShow, setNumItemsToShow] = useState(6);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    client.get('/Item/GetFound').then((response) => {
      setItems(response.data);
    });
    client.get('/Category/Get').then((response) => {
      var tag_arr = []
      response.data.map((tag) => {
        tag_arr.push(tag.name)
      })
      setTags(tag_arr);
    });
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const loadMoreItems = () => {
    setNumItemsToShow(numItemsToShow + 6);
  };

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="p-4">
      <div className="relative w-3/4 sm:w-1/2 mx-auto mt-5">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search items..."
          className="p-2 mb-4 border border-gray-200 rounded w-full pl-10"
        />
        <FaSearch className="absolute top-3 left-3 text-gray-400" />
      </div>
      <div className="flex flex-wrap cursor-pointer justify-center items-center mb-5">
        {tags.map((tag, index) => (
          <div
            key={index}
            onClick={() => handleTagClick(tag)}
            className={`inline-flex justify-center items-center gap-1 bg-gray-100 text-sm font-semibold text-gray-700 rounded-full px-4 py-1 max-w-full truncate mr-2 mt-2 ${
              selectedTags.includes(tag) ? "bg-blue-400 " : "bg-gray-100"
            }`}
          >
            <HiOutlineHashtag className="w-4 h-4" />
            {tag}
          </div>
        ))}
      </div>

      {items.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center mx-auto">
            {items.slice(0, numItemsToShow).map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onItemCardClick={handleItemClick}
              />
            ))}
          </div>
          {isModalOpen && selectedItem && (
            <ItemDetailCard item={selectedItem} onClose={closeModal} />
          )}

          {items.length > numItemsToShow && (
            <div className="flex justify-center">
              <button
                onClick={loadMoreItems}
                className="mt-4 bg-blue-500 text-white px-6 py-2 rounded font-medium"
              >
                Load More
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center">No items found.</div>
      )}
    </div>
  );
}

export default HomePage;
