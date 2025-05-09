import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, get, update} from 'firebase/database';
import { db } from '../firebase';
import { getAuth } from "firebase/auth";

export default function JoinCommunity() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [isMember, setIsMember] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        if (!user) return;

        const join = async () => {
            const commRef = ref(db, `communities/${id}`);
            const snapshot = await get(commRef);

            if (!snapshot.exists()) {
                alert("Community not found.");
                navigate("/my-communities");
                return;
            }

            const community = snapshot.val();

            const checkMember = community.users && community.users.includes(user.uid);
            if (checkMember) {
                setIsMember(true);
                setLoading(false);
                return;
            }

            const updatedUsers = [...(community.users || []), user.uid];
            await update(commRef, { users: updatedUsers });

            setLoading(false);
            navigate(`/community/${id}`);
            }
        join();
        }, [user]
    );

    if (loading) return <p>Joining community...</p>;
    if (isMember) return <p>You are already a member. Redirecting...</p>;
    
    return <p>Successfully joined! Redirecting...</p>;
}