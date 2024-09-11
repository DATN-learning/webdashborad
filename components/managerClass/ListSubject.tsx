import { ISubject } from "@/interface/Class";
import { getSubjectClass } from "@/redux/classRoom/selectors";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { chooseSubject, getSubjectClassRoomRequest } from "@/redux/classRoom/actions";
import { BiDotsVerticalRounded, BiPlus } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { deleteSubject, updateSubjectApi } from "@/api/class/subjectApi";

interface ListSubjectProps {
  options: { value: number; label: string }[];
}

const ListSubject = ({ options }: ListSubjectProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [listSubject, setListSubject] = React.useState<ISubject[]>([]);
  const listClass = useSelector(getSubjectClass);
  const [activeDropdown, setActiveDropdown] = React.useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = React.useState<ISubject | null>(null);  // Thay đổi thành ISubject
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [nameSubject, setNameSubject] = React.useState("");
  const [logoImage, setLogoImage] = React.useState<File | null>(null);
  const [logoImageUrl, setLogoImageUrl] = React.useState<string>(""); 

  const setUpData = async () => {
    const classRoom = await listClass.listClass.find(
      (item) => item.class === Number(listClass.numberClassRoom)
    );
    setListSubject(classRoom?.subjects || []);
    router.query.name == undefined &&
      router.push({
        pathname: `/managerClass/`,
        query: {
          name:
            classRoom?.subjects && classRoom?.subjects?.length > 0
              ? classRoom?.subjects[0].slug
              : "",
        },
      });
    dispatch(
      chooseSubject({
        id:
          classRoom?.subjects && classRoom?.subjects?.length > 0
            ? classRoom?.subjects[0].id_subject
            : "",
        name:
          classRoom?.subjects && classRoom?.subjects?.length > 0
            ? classRoom?.subjects[0].name_subject
            : "",
        id_relation:
          classRoom?.subjects && classRoom?.subjects?.length > 0
            ? classRoom?.subjects[0].id
            : -1,
      })
    );
  };

  React.useEffect(() => {
    setUpData();
  }, [listClass.numberClassRoom]);

  const handleChooseSubject = (slug: string, id: string, name: string) => {
    router.push({
      pathname: `/managerClass/`,
      query: { name: slug },
    });
    dispatch(
      chooseSubject({
        id,
        name,
        id_relation: listSubject.find((item) => item.slug === slug)?.id || -1,
      })
    );
  };

  const toggleDropdown = (index: number) => {
    setActiveDropdown((prev) => (prev === index ? null : index));
  };

  const handleEditSubject = (subject: ISubject) => {
    setSelectedSubject(subject);
    setNameSubject(subject.name_subject);
    setLogoImageUrl(subject.logo_image); 
    setShowEditModal(true);
    console.log(subject.id_subject)
  };

  const handleDeleteSubject = async (id_subject: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa môn học này?")) {
      try {
        await deleteSubject(id_subject);
        const updatedSubjects = listSubject.filter(
          (subject) => subject.id_subject !== id_subject
        );
        setListSubject(updatedSubjects);
        toast.success("Xóa môn học thành công!");
      } catch (error) {
        toast.error("Xóa môn học thất bại!");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg") {
        setLogoImage(file);
        setLogoImageUrl(URL.createObjectURL(file));
      } else {
        toast.error("File không đúng định dạng");
        e.target.value = "";
      }
    }
  };

  const handleUpdate = async () => {  
    try{
      const res = await updateSubjectApi(selectedSubject?.id_subject as string,nameSubject ,logoImage);
      if (res.status === 200) {
        if (res.data.status) {
          toast.success("Sửa môn học thành công");
          setShowEditModal(false);
          dispatch(getSubjectClassRoomRequest());
        } else {
          toast.error("Sửa môn học thất bại");
        }
      }
    }catch(error){
      console.log(error);
    }
  };

  return (
    <div>
      {listSubject && listSubject.length > 0 ? (
        <div>
          <div className="flex-wrap gap-2 grid grid-cols-3 xl:grid-cols-4 mt-2 border-2 border-gray-200 rounded-lg p-4 relative overflow-y-auto h-[calc(100vh-100px)]">
            {listSubject?.map((item, index) => (
              <div
                key={item.id}
                className={`relative flex flex-col items-center justify-center p-4 border-2 border-gray-200 shadow-lg rounded-lg pb-2 cursor-pointer
                  ${item.slug === router.query.name ? "bg-[#9e80f27f]" : "bg-white"}
                `}
                onClick={() =>
                  handleChooseSubject(item.slug, item.id_subject, item.name_subject)
                }
              >
                <img src={item.logo_image} alt={item.name_subject} />
                <p className="font-bold text-md xl:text-xl">{item.name_subject}</p>
                <div
                  className="absolute top-2 right-2 cursor-pointer"
                  onClick={() => toggleDropdown(index)}
                >
                  <BiDotsVerticalRounded size={24} />
                </div>

                {activeDropdown === index && (
                  <div className="absolute top-8 right-2 bg-white border border-gray-300 rounded shadow-lg z-10">
                    <button
                      className="px-4 py-2 text-left w-full font-bold text-md xl:text-xl hover:bg-gray-100"
                      onClick={() => handleEditSubject(item)}
                    >
                      Sửa môn học
                    </button>
                    <button
                      className="px-4 py-2 text-left w-full font-bold text-md xl:text-xl hover:bg-gray-100"
                      onClick={() => handleDeleteSubject(item.id_subject)}
                    >
                      Xóa môn học
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {showEditModal && selectedSubject && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg w-[400px] relative">
                <div
                  className="absolute top-2 right-2 cursor-pointer"
                  onClick={() => setShowEditModal(false)}
                >
                  <IoClose size={24} />
                </div>
                <h2 className="text-xl font-bold mb-4">Chỉnh sửa môn học</h2>
                <div className="mb-4">
                  <label className="block font-bold mb-2">Tên môn học</label>
                  <input
                    type="text"
                    className="w-full border rounded-lg p-2"
                    value={nameSubject} 
                    onChange={(e) => setNameSubject(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-bold mb-2">Chọn ảnh</label>
                  <input type="file" className="w-full" onChange={handleFileChange} />
                  {logoImageUrl && (
                    <img src={logoImageUrl} alt="logo preview" className="mt-2 w-32 h-32 object-cover" />
                  )}
                </div>
                <button
                  className="bg-blue-500 text-white p-2 rounded-lg w-full"
                  onClick={handleUpdate}
                >
                  Cập nhật
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <span>Chưa có môn học nào</span>
        </div>
      )}
    </div>
  );
};

export default ListSubject;
