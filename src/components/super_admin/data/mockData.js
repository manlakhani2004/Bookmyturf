export const stats = [
  { label: 'Total Bookings', value: '1,234', icon: 'Calendar', change: '+12%', color: 'bg-blue-500' },
  { label: 'Active Users', value: '856', icon: 'Users', change: '+8%', color: 'bg-green-500' },
  { label: 'Revenue', value: '$45,678', icon: 'DollarSign', change: '+23%', color: 'bg-purple-500' },
  { label: 'Avg. Duration', value: '2.5h', icon: 'Clock', change: '+5%', color: 'bg-orange-500' }
];

export const recentBookings = [
  { id: 1, user: 'John Doe', sport: 'Football', turf: 'Arena A', time: '10:00 AM', status: 'Confirmed' },
  { id: 2, user: 'Jane Smith', sport: 'Cricket', turf: 'Ground B', time: '2:00 PM', status: 'Pending' },
  { id: 3, user: 'Mike Johnson', sport: 'Badminton', turf: 'Court C', time: '4:00 PM', status: 'Confirmed' },
  { id: 4, user: 'Sarah Wilson', sport: 'Tennis', turf: 'Court D', time: '6:00 PM', status: 'Completed' },
  { id: 5, user: 'Tom Brown', sport: 'Football', turf: 'Arena A', time: '8:00 PM', status: 'Confirmed' }
];

export const allBookings = [
  { id: 1, user: 'John Doe', sport: 'Football', turf: 'Arena A', date: '2024-12-02', time: '10:00 AM', duration: '2h', amount: '$50', status: 'Confirmed' },
  { id: 2, user: 'Jane Smith', sport: 'Cricket', turf: 'Ground B', date: '2024-12-02', time: '2:00 PM', duration: '3h', amount: '$75', status: 'Pending' },
  { id: 3, user: 'Mike Johnson', sport: 'Badminton', turf: 'Court C', date: '2024-12-01', time: '4:00 PM', duration: '1h', amount: '$30', status: 'Confirmed' },
  { id: 4, user: 'Sarah Wilson', sport: 'Tennis', turf: 'Court D', date: '2024-12-01', time: '6:00 PM', duration: '2h', amount: '$45', status: 'Completed' },
  { id: 5, user: 'Tom Brown', sport: 'Football', turf: 'Arena A', date: '2024-11-30', time: '8:00 PM', duration: '2h', amount: '$50', status: 'Completed' },
  { id: 6, user: 'Lisa Anderson', sport: 'Basketball', turf: 'Court E', date: '2024-11-30', time: '5:00 PM', duration: '2h', amount: '$40', status: 'Completed' },
  { id: 7, user: 'David Lee', sport: 'Cricket', turf: 'Ground B', date: '2024-11-29', time: '3:00 PM', duration: '3h', amount: '$75', status: 'Cancelled' },
  { id: 8, user: 'Emily Chen', sport: 'Football', turf: 'Arena A', date: '2024-12-03', time: '7:00 PM', duration: '2h', amount: '$50', status: 'Confirmed' }
];

export const getStatusColor = (status) => {
  switch(status) {
    case 'Confirmed': return 'bg-green-500/20 text-green-400';
    case 'Pending': return 'bg-yellow-500/20 text-yellow-400';
    case 'Completed': return 'bg-blue-500/20 text-blue-400';
    case 'Cancelled': return 'bg-red-500/20 text-red-400';
    default: return 'bg-gray-500/20 text-gray-400';
  }
};
