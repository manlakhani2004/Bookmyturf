// import React from "react";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

const LocationCategory = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Cricket', createdAt: new Date('2024-01-15') },
    { id: 2, name: 'Football', createdAt: new Date('2024-01-16') },
    { id: 3, name: 'Badminton', createdAt: new Date('2024-01-17') }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState('');

  const handleAddCategory = (e) => {
    e.preventDefault();
    
    if (!categoryName.trim()) {
      setError('Category name is required');
      return;
    }

    const exists = categories.some(
      cat => cat.name.toLowerCase() === categoryName.trim().toLowerCase()
    );

    if (exists) {
      setError('Category already exists');
      return;
    }

    const newCategory = {
      id: Date.now(),
      name: categoryName.trim(),
      createdAt: new Date()
    };

    setCategories([newCategory, ...categories]);
    setCategoryName('');
    setError('');
    setShowForm(false);
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Sports Categories</h1>
            <p className="text-gray-400">Manage your sports categories</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {showForm ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              )}
            </svg>
            {showForm ? 'Cancel' : 'Add Category'}
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 32 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">Create New Category</h2>
                <form onSubmit={handleAddCategory}>
                  <div className="mb-6">
                    <label className="block text-gray-300 font-semibold mb-2">
                      Category Name
                    </label>
                    <input
                      type="text"
                      value={categoryName}
                      onChange={(e) => {
                        setCategoryName(e.target.value);
                        setError('');
                      }}
                      placeholder="e.g., Tennis, Basketball, Swimming"
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-2 flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {error}
                      </motion.p>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition"
                    >
                      Save Category
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setCategoryName('');
                        setError('');
                      }}
                      className="px-6 py-3 bg-gray-700 text-gray-300 rounded-lg font-semibold hover:bg-gray-600 transition"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              All Categories ({categories.length})
            </h2>
          </div>

          {categories.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No Categories Yet</h3>
              <p className="text-gray-500">Click "Add Category" to create your first category</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-700">
              <AnimatePresence>
                {categories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-6 hover:bg-gray-750 transition group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {category.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                          <p className="text-sm text-gray-400">
                            Created {category.createdAt.toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteCategory(category.id)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition opacity-0 group-hover:opacity-100"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center text-gray-500 text-sm"
        >
          Total categories: {categories.length}
        </motion.div>
      </div>
    </div>
  );
};

export default LocationCategory;

// const LocationCategory = () => {
//   // Extract locationId from URL path
//   const locationId = window.location.pathname.split('/').pop();
  
//   const [categories, setCategories] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [categoryName, setCategoryName] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [submitLoading, setSubmitLoading] = useState(false);

//   // Fetch existing categories on mount
//   useEffect(() => {
//     fetchCategories();
//   }, [locationId]);

//   const fetchCategories = async () => {
//     try {
//       setLoading(true);
//       // Replace with your actual GET endpoint
//       const response = await fetch(`http://localhost:8080/api/locations/${locationId}/categories`);
//       if (response.ok) {
//         const data = await response.json();
//         setCategories(data.Data || []);
//       }
//     } catch (err) {
//       console.error('Failed to fetch categories:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddCategory = async () => {
//     if (!categoryName.trim()) {
//       setError('Category name is required');
//       return;
//     }

//     const exists = categories.some(
//       cat => cat.name.toLowerCase() === categoryName.trim().toLowerCase()
//     );

//     if (exists) {
//       setError('Category already exists');
//       return;
//     }

//     try {
//       setSubmitLoading(true);
      
//       // Prepare payload
//       const payload = {
//         locationId: parseInt(locationId),
//         sportCategories: [categoryName.trim()]
//       };

//       // Send POST request
//       const response = await fetch('http://localhost:8080/api/locations/sports/categories', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload)
//       });

//       if (response.ok) {
//         const result = await response.json();
        
//         // Add new category to list
//         const newCategory = {
//           id: Date.now(),
//           name: categoryName.trim(),
//           createdAt: new Date()
//         };
        
//         setCategories([newCategory, ...categories]);
//         setCategoryName('');
//         setError('');
//         setShowForm(false);
//       } else {
//         const errorData = await response.json();
//         setError(errorData.Message || 'Failed to add category');
//       }
//     } catch (err) {
//       setError('Network error. Please try again.');
//       console.error('Error adding category:', err);
//     } finally {
//       setSubmitLoading(false);
//     }
//   };

//   const handleDeleteCategory = (id) => {
//     setCategories(categories.filter(cat => cat.id !== id));
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !submitLoading) {
//       handleAddCategory();
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//           className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
//         />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
//       <div className="max-w-4xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="flex items-center justify-between mb-8"
//         >
//           <div>
//             <h1 className="text-4xl font-bold text-white mb-2">Sports Categories</h1>
//             <p className="text-gray-400">Location ID: {locationId}</p>
//           </div>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => setShowForm(!showForm)}
//             className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition flex items-center gap-2"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               {showForm ? (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               ) : (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//               )}
//             </svg>
//             {showForm ? 'Cancel' : 'Add Category'}
//           </motion.button>
//         </motion.div>

//         <AnimatePresence>
//           {showForm && (
//             <motion.div
//               initial={{ opacity: 0, height: 0, marginBottom: 0 }}
//               animate={{ opacity: 1, height: 'auto', marginBottom: 32 }}
//               exit={{ opacity: 0, height: 0, marginBottom: 0 }}
//               transition={{ duration: 0.3 }}
//               className="overflow-hidden"
//             >
//               <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
//                 <h2 className="text-2xl font-bold text-white mb-6">Create New Category</h2>
//                 <div>
//                   <div className="mb-6">
//                     <label className="block text-gray-300 font-semibold mb-2">
//                       Category Name
//                     </label>
//                     <input
//                       type="text"
//                       value={categoryName}
//                       onChange={(e) => {
//                         setCategoryName(e.target.value);
//                         setError('');
//                       }}
//                       onKeyPress={handleKeyPress}
//                       placeholder="e.g., Tennis, Basketball, Swimming"
//                       disabled={submitLoading}
//                       className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-50"
//                     />
//                     {error && (
//                       <motion.p
//                         initial={{ opacity: 0, y: -10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="text-red-400 text-sm mt-2 flex items-center gap-1"
//                       >
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                         {error}
//                       </motion.p>
//                     )}
//                   </div>
//                   <div className="flex gap-3">
//                     <motion.button
//                       whileHover={{ scale: submitLoading ? 1 : 1.02 }}
//                       whileTap={{ scale: submitLoading ? 1 : 0.98 }}
//                       onClick={handleAddCategory}
//                       disabled={submitLoading}
//                       className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                     >
//                       {submitLoading ? (
//                         <>
//                           <motion.div
//                             animate={{ rotate: 360 }}
//                             transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                             className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
//                           />
//                           Saving...
//                         </>
//                       ) : (
//                         'Save Category'
//                       )}
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => {
//                         setShowForm(false);
//                         setCategoryName('');
//                         setError('');
//                       }}
//                       disabled={submitLoading}
//                       className="px-6 py-3 bg-gray-700 text-gray-300 rounded-lg font-semibold hover:bg-gray-600 transition disabled:opacity-50"
//                     >
//                       Cancel
//                     </motion.button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden"
//         >
//           <div className="p-6 border-b border-gray-700">
//             <h2 className="text-2xl font-bold text-white flex items-center gap-2">
//               <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
//               </svg>
//               All Categories ({categories.length})
//             </h2>
//           </div>

//           {categories.length === 0 ? (
//             <div className="p-12 text-center">
//               <div className="text-6xl mb-4">📋</div>
//               <h3 className="text-xl font-semibold text-gray-400 mb-2">No Categories Yet</h3>
//               <p className="text-gray-500">Click "Add Category" to create your first category</p>
//             </div>
//           ) : (
//             <div className="divide-y divide-gray-700">
//               <AnimatePresence>
//                 {categories.map((category, index) => (
//                   <motion.div
//                     key={category.id}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: 20 }}
//                     transition={{ delay: index * 0.05 }}
//                     className="p-6 hover:bg-gray-750 transition group"
//                   >
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-4">
//                         <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
//                           {category.name.charAt(0).toUpperCase()}
//                         </div>
//                         <div>
//                           <h3 className="text-lg font-semibold text-white">{category.name}</h3>
//                           <p className="text-sm text-gray-400">
//                             Created {new Date(category.createdAt).toLocaleDateString('en-US', { 
//                               month: 'short', 
//                               day: 'numeric', 
//                               year: 'numeric' 
//                             })}
//                           </p>
//                         </div>
//                       </div>
//                       <motion.button
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                         onClick={() => handleDeleteCategory(category.id)}
//                         className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition opacity-0 group-hover:opacity-100"
//                       >
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                         </svg>
//                       </motion.button>
//                     </div>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </div>
//           )}
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.4 }}
//           className="mt-6 text-center text-gray-500 text-sm"
//         >
//           Total categories: {categories.length}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default LocationCategory;