import { useState, useCallback } from 'react';
import { fetch_all_location } from '../../../../services/operations/adminDashboard';
import { useDispatch, useSelector } from 'react-redux';
function getToken() {
		const token = localStorage.getItem("token");
		if (!token) {
			toast.error("Authentication token missing. Please login.");
			throw new Error("Token missing");
		}
		return token.replace(/^"|"$/g, ""); // remove quotes if stored as string
	}

export const useLocations = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
  const token = getToken();


  // Simulate API calls (replace with actual API endpoints)
  const fetchLocations = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - replace with actual API call
      const mockData = [
        {
          id: 1,
          name: "Sports Complex A",
          address: "123 Sports Street",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400001",
          sports: [
            {
              id: 1,
              name: "Football",
              description: "Full size football ground",
              category: { name: "Outdoor Sports" },
              slotTimings: [
                { dayOfWeek: "MONDAY", startTime: "06:00", endTime: "18:00", price: 500 }
              ]
            }
          ],
          mediaFiles: []
        }
      ];
    const data = await fetch_all_location(token);
    console.log("all location fatched:",data);
      if(data)
      {
        setLocations(data);
      }
    } catch (error) {
      console.error('Error fetching locations:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addLocation = useCallback(async (locationData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful addition
      const newLocation = {
        id: Date.now(),
        ...locationData,
        sports: [],
        mediaFiles: locationData.mediaFiles.map((file, idx) => ({
          id: idx + 1,
          ...file,
          location: locationData.name
        }))
      };
      
      setLocations(prev => [...prev, newLocation]);
      return { success: true };
    } catch (error) {
      console.error('Error adding location:', error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  }, []);

  const updateLocation = useCallback(async (id, updateData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setLocations(prev => 
        prev.map(location => 
          location.id === id 
            ? { ...location, ...updateData }
            : location
        )
      );
      return { success: true };
    } catch (error) {
      console.error('Error updating location:', error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteLocation = useCallback(async (id) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setLocations(prev => prev.filter(location => location.id !== id));
      return { success: true };
    } catch (error) {
      console.error('Error deleting location:', error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    locations,
    loading,
    fetchLocations,
    addLocation,
    updateLocation,
    deleteLocation
  };
};
