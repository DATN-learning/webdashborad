import { getAllUsers, deleteUserByProfileId } from "@/api/auth"; 
import PopupProfile from "@/components/popups/PopupProfile";
import { UserPayload } from "@/models/login";
import React, { useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const ManagerProfile = () => {
  const [open, setOpen] = React.useState(false);
  const [listAllUser, setListAllUser] = React.useState<UserPayload[]>([]);
  const [selectedUser, setSelectedUser] = React.useState<UserPayload | null>(null);
  
  const onClose = () => {
    setOpen(false);
  };

  const getAllUser = async () => {
    try {
      const response = await getAllUsers();
      setListAllUser(response);
    } catch (error) {
      console.error("Error fetching users:", error);
      setListAllUser([]);
    }
  };

  const handleDeleteUser = async (id_profile: string) => {
    try {
      await deleteUserByProfileId(id_profile);
      setListAllUser((prevList) => prevList.filter(user => user.profile?.id_profile !== id_profile));
      alert('User deleted successfully'); 
    } catch (error) {
      console.error("Error deleting user:", error);
      alert('Failed to delete user');
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const handleOpenPopup = (user: UserPayload) => {
    setSelectedUser(user);
    setOpen(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-between px-4 pt-4">
        <span>Welcome Back, Clint</span>
      </div>
      <div className="p-4">
        <div className="p-2 flex md:grid-cols-10 items-center justify-between cursor-pointer gap-2">
          <span>First Name</span>
          <span>Last Name</span>
          <span>Nick Name</span>
          <span className="sm:text-left text-right">Address</span>
          <span className="hidden md:grid">Day of birth</span>
          <span className="hidden sm:grid">Gender</span>
          <span className="hidden sm:grid">Hashtag</span>
          <span className="hidden sm:grid">Level Number</span>
          <span className="hidden sm:grid">Experience point</span>
          <span className="hidden sm:grid">Number star</span>
          <span className="hidden sm:grid">School Name</span>
          <span className="hidden sm:grid">Class Name</span>
        </div>
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto h-[calc(100vh-100px)]">
          <ul>
            {listAllUser.map((user) => (
              <li
                key={user.id}
                className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex md:grid-cols-10 items-center justify-between cursor-pointer gap-2"
              >
                <p>{user.first_name}</p> 
                <p>{user.last_name}</p>
                <p>{user.profile?.nick_name}</p> 
                <p className="sm:text-left text-right">{user.profile?.address}</p> 
                <p className="hidden md:flex">{user.profile?.date_of_birth}</p> 
                <p className="hidden sm:flex">{user.profile?.gender}</p>
                <p className="hidden sm:flex">{user.profile?.hashtag}</p>
                <p className="hidden sm:flex">{user.profile?.level_number}</p>
                <p className="hidden sm:flex">{user.profile?.experience_point}</p>
                <p className="hidden sm:flex">{user.profile?.number_stars}</p> 
                <p className="hidden sm:flex">{user.profile?.school_name}</p> 
                <div className="flex justify-between items-center">
                  <p>{user.profile?.class_name}</p> 
                  <BsThreeDotsVertical 
                    onClick={() => handleOpenPopup(user)} 
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <PopupProfile 
        open={open} 
        onClose={onClose} 
        handleDeleteUser={() => {
          if (selectedUser) {
            handleDeleteUser(selectedUser.profile?.id_profile);
            onClose(); 
          }
        }}
        user={selectedUser} 
      />
    </div>
  );
};

export default ManagerProfile;
