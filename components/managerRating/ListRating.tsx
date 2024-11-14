import React, { useEffect, useState } from "react";
import { IRating } from "@/interface/Rating";
import { Spin, Alert } from "antd";
import { getAllRatings } from "@/api/rating/ratingApi";

const RatingsList: React.FC = () => {
    const [ratings, setRatings] = useState<IRating[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    
    useEffect(() => {
        fetchRatings();
    }, []);
    
    const fetchRatings = async () => {
        try {
            setLoading(true);
            const response = await getAllRatings();
            if(response && response.data){
                setRatings(response.data.rating)
            }
            console.log(response.data)
        } catch (error) {
            setError("Có lỗi xảy ra khi tải dữ liệu đánh giá");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <h2>Danh sách Đánh Giá</h2>
            <ul>
                {ratings.map((rating) => (
                    <li key={rating.id}>
                        <p>Đánh giá ID: {rating.rating_id}</p>
                        <p>Người dùng: {rating.user_create.first_name} {rating.user_create.last_name}</p>
                        <p>Bài học: {rating.lesstion_chapter.name_lesstion_chapter}</p>
                        <p>Nội dung đánh giá: {rating.content}</p>
                        <p>Sao: {rating.rating}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RatingsList;
